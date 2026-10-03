// Letakkan foto di public/images/, lalu ganti null dengan "/images/nama-foto.jpg".
const newsFiles = { 
  mgmp: "/images/MGMP.webp", 
  bk: "/images/Atasi Antrean Keterlambatan, SMKN 1 Bondowoso Luncurkan Sistem BK Terintegrasi.webp", 
  asri: "/images/SMK Negeri 1 Bondowoso Meraih Juara 1 Lomba Kebersihan Lingkungan Sekolah.webp", 
  osis: "/images/Debat Calon Ketua Wakil Ketua OSIS SMKN 1 Bondowoso Periode 2025 2026.webp", 
  kemenkeu: "/images/Kemenkeu Mengajar 10 Tanamkan Literasi Keuangan di SMKN 1 Bondowoso.webp" 
};
const facilityFiles = { 
  perpustakaan: "/images/Perpustakaan.webp", 
  gedung: "/images/Gedung Sasana Kridha Wiyata.webp", 
  bank: "/images/BANK MINI.webp", 
  koperasi: "/images/Koperasi Sekolah.webp", 
  tefa: "/images/Ruang TEFA.webp", 
  digital: "/images/Digital Learning Hub.webp", 
  masjid: "/images/Masjid Nailul Huda.webp", 
  lab: "/images/Laboratorium Komputer.webp" 
};
function placeholder(label) {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="460" viewBox="0 0 800 460"><rect width="800" height="460" fill="#e7e4df"/><rect x="24" y="24" width="752" height="412" rx="18" fill="none" stroke="#c8c0b5" stroke-dasharray="8 8"/><g transform="translate(369 152)" fill="none" stroke="#a89b88" stroke-width="4"><rect width="62" height="48" rx="6"/><circle cx="44" cy="15" r="5"/><path d="m4 40 17-17 14 14 8-8 16 14"/></g><text x="400" y="258" text-anchor="middle" fill="#6b6256" font-family="Arial,sans-serif" font-size="24">' + label + '</text><text x="400" y="295" text-anchor="middle" fill="#847a6c" font-family="Arial,sans-serif" font-size="18">Foto menyusul</text></svg>';
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
const newsLabels = { mgmp: "Pertemuan MGMP", bk: "Sistem BK Terintegrasi", asri: "Prestasi Kebersihan Sekolah", osis: "Debat OSIS", kemenkeu: "Kemenkeu Mengajar" };
const facilityLabels = { perpustakaan: "Perpustakaan", gedung: "Gedung Sasana Kridha Wiyata", bank: "Bank Mini", koperasi: "Koperasi Sekolah", tefa: "Ruang TEFA", digital: "Digital Learning Hub", masjid: "Masjid Nailul Huda", lab: "Laboratorium Komputer" };
export const newsPhotos = Object.fromEntries(Object.entries(newsFiles).map(([key, value]) => [key, value || placeholder(newsLabels[key])]));
export const facilityPhotos = Object.fromEntries(Object.entries(facilityFiles).map(([key, value]) => [key, value || placeholder(facilityLabels[key])]));

