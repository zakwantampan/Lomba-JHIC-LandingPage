import os
from flask import Flask, render_template, request, jsonify
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.llms.gemini import Gemini
from llama_index.embeddings.gemini import GeminiEmbedding
from llama_index.embeddings.huggingface import HuggingFaceEmbedding


app = Flask(__name__)

# API Key AQ
GEMINI_KEY = "AQ.Ab8RN6IdgicPO0jg9P10Siq2TlIwqKfJNQ-g1h-356L6f8vBLA"
os.environ["GOOGLE_API_KEY"] = GEMINI_KEY

Settings.llm = Gemini(model="models/gemini-3.6-flash", api_key=GEMINI_KEY)
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
print("Memulai server... Sedang membaca dokumen sekolah...")
try:
    dokumen = SimpleDirectoryReader('data').load_data()
    indeks = VectorStoreIndex.from_documents(dokumen)
    mesin_penjawab = indeks.as_query_engine()
    print("AI siap menjawab.")
except Exception as e:
    print(f"Gagal memuat dokumen. Error: {e}")
    mesin_penjawab = None

@app.route('/')
def halaman_utama():
    return render_template('index.html')

@app.route('/tanya-bot', methods=['POST'])
def proses_tanya():
    if mesin_penjawab is None:
        return jsonify({"jawaban": "Sistem AI belum siap, dokumen gagal dimuat."})
         
    data_masuk = request.json
    pertanyaan = data_masuk.get('pertanyaan', '')
    
    try:
        jawaban_ai = mesin_penjawab.query(pertanyaan)
        return jsonify({"jawaban": str(jawaban_ai)})
    except Exception as e:
        print(f"Error =================================={e}=======================================")
        return jsonify({"jawaban": f"Terjadi kesalahan saat mencari jawaban."})
        

if __name__ == '__main__':
    app.run(debug=True)