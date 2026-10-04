// Fungsi untuk memunculkan gelembung chat di layar
function tambahPesanKeLayar(pesan, pengirim, gunakanEfekKetik = false) {
    const chatBox = document.getElementById("chat-box");
    const elemenPesan = document.createElement("div");
    
    elemenPesan.classList.add("message");
    
    if (pengirim === "user") {
        elemenPesan.classList.add("user-message");
        elemenPesan.innerText = pesan;
        chatBox.appendChild(elemenPesan);
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        elemenPesan.classList.add("bot-message");
        chatBox.appendChild(elemenPesan);
        
        if (gunakanEfekKetik) {
            // Bersihkan tanda bintang (**) dari Markdown
            const pesanBersih = pesan.replace(/\*\*/g, ""); 
            let i = 0;
            
            // Animasi ngetik per karakter (kecepatan 15 milidetik)
            const interval = setInterval(() => {
                if (i < pesanBersih.length) {
                    elemenPesan.innerHTML += pesanBersih.charAt(i);
                    // Scroll otomatis mengikuti ketikan
                    chatBox.scrollTop = chatBox.scrollHeight;
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 15); 
        } else {
            elemenPesan.innerText = pesan;
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }
}

// Fungsi utama mengirim pesan ke Python
async function kirimPesan() {
    const inputTeks = document.getElementById("user-input");
    const pertanyaan = inputTeks.value.trim();
    
    if (pertanyaan === "") return; 

    // Munculkan pesan user tanpa efek ngetik
    tambahPesanKeLayar(pertanyaan, "user", false);
    inputTeks.value = ""; 

    // Tampilkan indikator kotak transparan berjalan
    const chatBox = document.getElementById("chat-box");
    const loadingId = "loading-" + Date.now();
    const loadingPesan = document.createElement("div");
    loadingPesan.classList.add("message", "bot-message");
    loadingPesan.id = loadingId;
    
    // Masukkan HTML kotak-kotak dari CSS tadi
    loadingPesan.innerHTML = `
        <div class="loading-container">
            <div class="loading-box"></div>
            <div class="loading-box"></div>
            <div class="loading-box"></div>
        </div>
    `;
    
    chatBox.appendChild(loadingPesan);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch('/tanya-bot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pertanyaan: pertanyaan })
        });

        const data = await response.json();
        
        // Hapus animasi kotak berjalan
        document.getElementById(loadingId).remove();
        
        // Tampilkan jawaban AI dengan efek ngetik (true)
        tambahPesanKeLayar(data.jawaban, "bot", true);

    } catch (error) {
        document.getElementById(loadingId).remove();
        tambahPesanKeLayar("Maaf, terjadi kesalahan koneksi.", "bot", true);
    }
}

function tekanEnter(event) {
    if (event.key === "Enter") {
        kirimPesan();
    }
}