// Pemeriksaan browser lokal, tanpa paket tambahan. Jalankan: node tools/verify.cjs
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const browserPath = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p => fs.existsSync(p));
if (!browserPath) throw new Error('Chrome atau Edge tidak ditemukan.');
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'jhic-preview-'));
const browser = spawn(browserPath, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const pending = new Map();
const errors = [];
let sequence = 0, ws, session;
function send(method, params = {}, sessionId = session) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 15000);
    pending.set(id, { resolve, reject, timer });
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
function assert(ok, message) { if (!ok) throw new Error(message); }
(async () => {
  const endpoint = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Browser tidak siap')), 20000);
    let output = '';
    browser.stderr.on('data', chunk => { output += chunk; const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/); if (match) { clearTimeout(timer); resolve(match[1]); } });
    browser.on('error', reject);
  });
  ws = new WebSocket(endpoint);
  await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }); });
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
    if (pending.has(message.id)) { const item = pending.get(message.id); pending.delete(message.id); clearTimeout(item.timer); message.error ? item.reject(new Error(message.error.message)) : item.resolve(message.result); }
  });
  const target = await send('Target.createTarget', { url: 'about:blank' });
  session = (await send('Target.attachToTarget', { targetId: target.targetId, flatten: true })).sessionId;
  await send('Page.enable');
  await send('Runtime.enable');
﻿
  await send('Page.navigate', { url: process.env.PREVIEW_URL || 'http://127.0.0.1:5173/' });
  for (let i=0;i<100;i++) { if(await evaluate('!!document.querySelector(".hero-heading")')) break; await pause(100); }
  await evaluate('document.fonts.ready');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  assert(await evaluate('document.querySelectorAll("h1").length === 1 && document.documentElement.lang === "id"'), 'Struktur dokumen');
  assert(await evaluate('document.fonts.check(\'16px "Plus Jakarta Sans"\')'), 'Font lokal');
  const previews=path.join(root,'.review','previews'); fs.mkdirSync(previews,{recursive:true});
  for(const width of [1920,1440,1280,1024,900,768,600,390,375,320]){
    await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
    await evaluate('(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,10))}scrollTo(0,0)})()');
    await pause(150);
    const metrics=await evaluate('({width:innerWidth,scroll:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,bad:[...document.querySelectorAll(".quote-card,.visi-card,.misi-card,.tujuan-card,.achievement-card,.featured-news-card,.sub-news-card,.info-card,.kontak-form-col,.footer-col")].filter(e=>e.scrollWidth>e.clientWidth+2||(!e.matches(".visi-card,.achievement-card") && e.scrollHeight>e.clientHeight+2)).map(e=>e.className)})');
    assert(metrics.scroll<=width,'Overflow halaman '+width+': '+JSON.stringify(metrics));
    assert(!metrics.bad.length,'Konten terpotong '+width+': '+metrics.bad);
    if([1280,390].includes(width)){
      const full=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:metrics.height,scale:1}});
      fs.writeFileSync(path.join(previews,'page-'+width+'.png'),Buffer.from(full.data,'base64'));
      for(const selector of ['.hero-section','.prakata-section','.visi-misi-section','.keahlian-section','.prestasi-section','.berita-section','.kontak-section','.footer-wrapper']){
        const bounds=await evaluate('(()=>{const r=document.querySelector('+JSON.stringify(selector)+').getBoundingClientRect();return {x:0,y:r.top+scrollY,width:innerWidth,height:Math.min(r.height,1800),scale:1}})()');
        const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:bounds});
        fs.writeFileSync(path.join(previews,selector.slice(1)+'-'+width+'.png'),Buffer.from(shot.data,'base64'));
      }
    }
    console.log('PASS viewport '+width+'px, height '+metrics.height+', no page/card overflow');
  }
  assert(await evaluate('[...document.images].every(i=>i.complete && i.naturalWidth>0)'), 'Ada gambar gagal dimuat');
  assert(await evaluate('document.querySelectorAll(".facility-card").length===8'), 'Fasilitas diduplikasi');
  await evaluate('document.querySelector(".mobile-toggle-btn").click()'); await pause(50);
  assert(await evaluate('document.querySelector(".mobile-toggle-btn").getAttribute("aria-expanded")==="true" && !!document.querySelector(".mobile-drawer")'), 'Menu tidak terbuka');
  await evaluate('document.querySelectorAll(".mobile-nav-link")[2].click()'); await pause(100);
  assert(await evaluate('!document.querySelector(".mobile-drawer") && Math.abs(document.querySelector("#jurusan").getBoundingClientRect().top-100)<5'), 'Menu/anchor tidak bekerja');
  const majors=[];
  for(let i=0;i<8;i++){majors.push(await evaluate('document.querySelector(".keahlian-feature-text h2").textContent'));await evaluate('document.querySelector(".keahlian-arrow-btn").click()');await pause(30);}
  assert(new Set(majors).size===8,'Jurusan tidak lengkap');
  assert((await evaluate('document.querySelector(".keahlian-feature-text h2").textContent'))===majors[0],'Jurusan tidak berputar');
  await evaluate('document.querySelector(".keahlian-card").click()'); await pause(30);
  assert((await evaluate('document.querySelector(".keahlian-feature-text h2").textContent'))!==majors[0],'Kartu jurusan tidak bekerja');
  const first=await evaluate('document.querySelector(".achievement-title-text").textContent');
  await evaluate('document.querySelector(\'[aria-label="Prestasi berikutnya"]\').click()'); await pause(50);
  assert((await evaluate('document.querySelector(".achievement-title-text").textContent'))!==first,'Slider prestasi tidak bekerja');
  await evaluate('document.querySelector(\'[aria-label="Prestasi sebelumnya"]\').click()'); await pause(50);
  assert((await evaluate('document.querySelector(".achievement-title-text").textContent'))===first,'Slider sebelumnya');
  for(const index of [0,1,2,3,4]){
    await evaluate('document.querySelectorAll(".btn-read-more,.btn-read-sm")['+index+'].click()'); await pause(50);
    assert(await evaluate('document.querySelector(".article-dialog").open && document.querySelector("#article-title").textContent.length>0'),'Ringkasan berita');
    await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    await pause(50);
    assert(await evaluate('!document.querySelector(".article-dialog").open'),'Dialog Escape');
  }
  await evaluate('document.querySelector(".chatbot-launcher").click()'); await pause(50);
  assert(await evaluate('document.activeElement.classList.contains("chat-input")'),'Fokus asisten');
  await send('Input.insertText',{text:'Apa saja jurusan?'});
  await evaluate('document.querySelector(".chatbot-input-form").requestSubmit()'); await pause(800);
  assert(await evaluate('document.querySelectorAll(".chat-msg-row").length===3 && document.querySelector(".chatbot-messages-body").textContent.includes("8 Program")'),'Respons asisten');
  await send('Emulation.setDeviceMetricsOverride',{width:320,height:480,deviceScaleFactor:1,mobile:true});
  assert(await evaluate('(()=>{const r=document.querySelector(".chatbot-window").getBoundingClientRect(); return r.top>=0 && r.right<=innerWidth && r.bottom<=innerHeight})()'),'Chat meluap pada layar pendek');
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27}); await pause(50);
  assert(await evaluate('document.activeElement.classList.contains("chatbot-launcher")'),'Fokus kembali ke peluncur');
  assert(await evaluate('!document.querySelector(".form-inputs").checkValidity()'),'Validasi formulir kosong');
  assert(await evaluate('[...document.querySelectorAll(".form-inputs input,.form-inputs textarea")].every(e=>!!document.querySelector(\'label[for="\'+e.id+\'"]\'))'),'Label form');
  assert(!errors.length,'JavaScript errors: '+JSON.stringify(errors));
  console.log('PASS 8 jurusan, carousel prestasi, 5 dialog berita, menu seluler, anchor, chatbot, form validation, local images.');
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{
  if(ws&&ws.readyState===WebSocket.OPEN){try{await send('Browser.close',{},null)}catch{} ws.close()}
  browser.kill();
});

