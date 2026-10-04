import os
from flask import Flask, render_template, request, jsonify
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.llms.gemini import Gemini
from llama_index.embeddings.gemini import GeminiEmbedding
from llama_index.embeddings.huggingface import HuggingFaceEmbedding


app = Flask(__name__)

# Key lokal diprioritaskan agar mudah diganti tanpa mengubah kode.
key_path = os.path.join(app.root_path, "gemini-key.local.txt")
GEMINI_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
if os.path.isfile(key_path):
    with open(key_path, encoding="utf-8-sig") as key_file:
        GEMINI_KEY = key_file.read().strip()
os.environ["GOOGLE_API_KEY"] = GEMINI_KEY

print("Memulai server... Menyiapkan AI dan dokumen sekolah...")
try:
    if not GEMINI_KEY:
        raise RuntimeError("Isi gemini-key.local.txt dengan API key Gemini terlebih dahulu.")
    Settings.llm = Gemini(model="models/gemini-3.6-flash", api_key=GEMINI_KEY)
    Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
    dokumen = SimpleDirectoryReader(os.path.join(app.root_path, 'data')).load_data()
    indeks = VectorStoreIndex.from_documents(dokumen)
    mesin_penjawab = indeks.as_query_engine()
    print("AI siap menjawab.")
except Exception as e:
    print("Gagal menyiapkan AI. Error:", str(e).replace(GEMINI_KEY, "[REDACTED]") if GEMINI_KEY else str(e))
    mesin_penjawab = None

@app.route('/')
def halaman_utama():
    return render_template('index.html')

@app.route('/tanya-bot', methods=['POST'])
def proses_tanya():
    if mesin_penjawab is None:
        return jsonify({"jawaban": "Sistem AI belum siap. Periksa kredensial Gemini, koneksi internet, dan dokumen sekolah pada terminal server."})
         
    data_masuk = request.json
    pertanyaan = data_masuk.get('pertanyaan', '')
    
    try:
        jawaban_ai = mesin_penjawab.query(pertanyaan)
        return jsonify({"jawaban": str(jawaban_ai)})
    except Exception as e:
        print("Error AI:", str(e).replace(GEMINI_KEY, "[REDACTED]") if GEMINI_KEY else str(e))
        return jsonify({"jawaban": f"Terjadi kesalahan saat mencari jawaban."})
        

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000, debug=False)