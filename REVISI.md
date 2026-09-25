# Revisi halaman SMAKENSA

Acuan visual: Home-Desktop.png (1280 × 9396).
Kode awal disimpan di .review/original. File prototype dan aset asli tetap tersedia.

## Menjalankan proyek
- npm install (hanya jika dependensi belum terpasang)
- npm run dev
- npm run build
- npm run preview
- npm run lint
- npm run test:ui (server dev harus berjalan di http://127.0.0.1:5173; memerlukan Chrome/Edge dan Node yang mendukung WebSocket global)

## Penggantian foto
1. Letakkan gambar di public/images.
2. Buka src/data/media.js.
3. Ganti nilai null dengan URL foto, misalnya mgmp: "/images/berita-mgmp.jpg".
4. Lima foto berita dan delapan foto fasilitas akan otomatis menggantikan placeholder lokal.

| Kelompok | Kunci |
| --- | --- |
| Berita | mgmp, bk, asri, osis, kemenkeu |
| Fasilitas | perpustakaan, gedung, bank, koperasi, tefa, digital, masjid, lab |

Gunakan foto landscape sekitar 1200 × 700 piksel dalam format WebP/JPEG untuk berita dan fasilitas. Jangan mengubah berkas dalam dist; direktori tersebut adalah hasil build.

## Perubahan
- Proporsi hero, statistik, prakata, visi–misi–tujuan, jurusan, prestasi, berita, fasilitas, mitra, kontak, dan footer mengikuti prototype dengan penyesuaian untuk layar kecil.
- Font Plus Jakarta Sans lokal, poster asli, logo footer sekolah, dan hero JPEG ringan untuk desktop/ponsel.
- Menghapus offset layout tetap, kartu berita selebar 1200px, tinggi konten tetap yang memotong teks, dan duplikasi fasilitas.
- Grid responsif, menu seluler hingga 900px, statistik 2 × 2 pada ponsel, kartu jurusan dapat digeser di ponsel.
- Label formulir, fokus keyboard, tombol ikon bernama, dialog berita dengan Escape, navigasi mengikuti posisi scroll, serta dukungan reduced motion.
- Memperbaiki import pak_asik.webp agar kapitalisasi sesuai nama file untuk hosting Linux.
- Metadata judul/deskripsi dan bahasa dokumen Indonesia.

## Batas fungsi yang perlu diketahui
- Foto berita/fasilitas menyusul sesuai keputusan pemilik proyek.
- Form kontak membuka draf pada aplikasi email melalui mailto. Situs belum memiliki backend pengiriman; tidak menampilkan klaim pesan sudah terkirim.
- Tombol berita membuka ringkasan yang tersedia. Isi artikel lengkap dan halaman berita tersendiri belum diberikan.
- Asisten menggunakan jawaban otomatis berbasis kata kunci, bukan layanan AI.
- URL sosial media, halaman struktur organisasi, kebijakan privasi, dan syarat belum tersedia. Label tetap ditampilkan tanpa tautan kosong yang menyesatkan.
- Teks profil, statistik, berita, dan kontak mengikuti konten proyek/prototype; belum tersambung CMS.

## Pemeriksaan
Build produksi dan ESLint diperiksa. Browser diperiksa pada lebar 320, 375, 390, 600, 768, 900, 1024, 1280, 1440, dan 1920 piksel, termasuk menu, anchor, semua jurusan, carousel prestasi, dialog berita, chatbot, validasi form, dan pemuatan aset lokal.
Screenshot hasil pemeriksaan ada di .review/previews. Pengujian browser memakai Chromium lokal; perangkat fisik/Safari belum diuji.
