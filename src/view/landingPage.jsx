import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Bot,
  X,
  Menu,
  Target,
  Sparkles,
  Quote,
  Landmark,
  ShoppingBag,
  Briefcase,
  Calendar,
  Eye,
  ArrowRight,
  Check,
  Laptop,
  Radio,
  Users,
} from "lucide-react";
import elementKeahlian from "../assets/icon-pres.png";
import logoTujuan from "../assets/target-arrow.png";
import logoOtak from "../assets/thinking-high.png";
import "./style.css";
import { newsPhotos, facilityPhotos } from "../data/media";
import iconChar from "../assets/chart-bar.png";
import PakAsik from "../assets/pak_asik.webp";
import posterSikep from "../../Assets websekolah New/Folder Poster Juara (Landing SECTION)/Lomba Sketsa Rancangan Layangan Sikep Tingkat Nasional yang diselenggarakan oleh Himadipsi ISI SURAKARTA 1.png";
import posterVoli from "../../Assets websekolah New/Folder Poster Juara (Landing SECTION)/Voli Smakensa meraih Juara 1 pada kegiatan Gebyar Olahraga Siswa SMK seKabupaten Bondowoso 1.png";
import posterKarate from "../../Assets websekolah New/Folder Poster Juara (Landing SECTION)/Juara 2 Karate KEJURPROV FORKI Jawa Timur 2026 di Malang.(1) 1.png";
import posterPaskibra from "../../Assets websekolah New/Folder Poster Juara (Landing SECTION)/Telah lolos Seleksi Paskibra Kabupaten Bondowoso 1.png";
import posterGerak from "../../Assets websekolah New/Folder Poster Juara (Landing SECTION)/Juara Harapan II Katagori Putri Lomba Gerak Jalan Pelajar 1.png";
import posterOrasi from "../../Assets websekolah New/Folder Poster Juara (Landing SECTION)/Juara 1 Lomba Orasi Dalam Rangka Harlah PMII Ke-66 1.png";
import posterAsri from "../../Assets websekolah New/Folder Poster Juara (Landing SECTION)/Juara 1 Lomba Kebersihan Sekolah Program ASRI 1.png";
const achievementPosters = [posterSikep, posterVoli, posterKarate, posterPaskibra, posterGerak, posterOrasi, posterAsri];
import iconTrophy from "../assets/trophy.png";
import panggungPrestasiIcon from "../../Assets websekolah New/Icon Panggung_Prestasi.png";
import bgHero from "../assets/hero-1800.jpg";
import bgHeroMobile from "../assets/hero-960.jpg";
import posterSikepFull from "../assets/prestasi-dkv-layangan-sikep.jpg";
import logoSmakensa from "../assets/logo.png";
import logoLumosh from "../assets/mitra/lumosh.png";
import logoDpkp from "../assets/mitra/dpkp-bondowoso.png";
import logoHummatech from "../assets/mitra/hummatech.png";
import logoAccurate from "../assets/mitra/accurate.png";
import logoTelkom from "../assets/mitra/telkom-indonesia.png";
import logoMetroTv from "../assets/mitra/metro-tv-jatim.png";
import fotoPspt from "../assets/jurusan/psptv.jpeg";
import fotoMp from "../assets/jurusan/mp.jpeg";
import fotoLp from "../assets/jurusan/lp.jpeg";
import fotoDkv from "../assets/jurusan/dkv.jpeg";
import fotoBd from "../assets/jurusan/bd.jpeg";
import fotoAkl from "../assets/jurusan/akl.jpeg";
import fotoTkj from "../assets/jurusan/tkj.jpeg";
import fotoRpl from "../assets/jurusan/rpl.jpeg";
import iconAward from "../assets/award.png";
import usurCircle from "../assets/user-circle.png";
import iconSparkles from "../assets/sparkles-2.png";

const MAJOR_VISUALS = {
  rpl: {
    accent: "#7c3aed",
    accentLight: "#c4b5fd",
    glow: "#3b2e63",
    cardBg: "#ede9fe",
    caption: ["Rekayasa", "Perangkat", "Lunak"],
    cardLines: ["Rekayasa", "Perangkat Lunak"],
  },
  akl: {
    accent: "#166534",
    accentLight: "#4ade80",
    glow: "#173821",
    cardBg: "#dcfce7",
    caption: ["Akuntansi dan", "Keuangan", "Lembaga"],
    cardLines: ["Akuntansi dan", "Keuangan Lembaga"],
  },
  lp: {
    accent: "#22c55e",
    accentLight: "#86efac",
    glow: "#1e4632",
    cardBg: "#e8fbf0",
    caption: ["Layanan", "Perbankan"],
    cardLines: ["Layanan", "Perbankan"],
  },
  tkj: {
    accent: "#6b7280",
    accentLight: "#d1d5db",
    glow: "#374151",
    cardBg: "#e5e7eb",
    caption: ["Teknik Komputer", "dan Jaringan"],
    cardLines: ["Teknik Komputer", "dan Jaringan"],
  },
  dkv: {
    accent: "#d97706",
    accentLight: "#fcd34d",
    glow: "#4a3a1a",
    cardBg: "#fdf0d2",
    caption: ["Desain", "Komunikasi", "Visual"],
    cardLines: ["Desain Komunikasi", "Visual"],
  },
  bd: {
    accent: "#e11d48",
    accentLight: "#fda4af",
    glow: "#4a2030",
    cardBg: "#fde4ea",
    caption: ["Bisnis", "Digital"],
    cardLines: ["Bisnis", "Digital"],
  },
  mp: {
    accent: "#ca8a04",
    accentLight: "#fde047",
    glow: "#4a3f14",
    cardBg: "#fef9c3",
    caption: ["Manajemen", "Perkantoran"],
    cardLines: ["Manajemen", "Perkantoran"],
  },
  psptv: {
    accent: "#4f46e5",
    accentLight: "#a5b4fc",
    glow: "#2a2f6b",
    cardBg: "#e1e6ff",
    caption: ["Produksi Siaran", "& Program", "Televisi"],
    cardLines: ["Produksi Siaran", "& Program Televisi"],
  },
};

// Foto tiap jurusan (kartu besar di kiri + kartu kecil di bawah).
// "position" = titik fokus supaya wajah/objek utama tidak terpotong saat foto
// landscape dipotong menjadi kartu portrait.
const MAJOR_PHOTOS = {
  psptv: {
    src: fotoPspt,
    position: "60% 50%",
    alt: "Siswa PSPT belajar menggunakan kamera",
  },
  mp: {
    src: fotoMp,
    position: "62% 50%",
    alt: "Siswa Manajemen Perkantoran mengerjakan tugas di depan komputer",
  },
  lp: {
    src: fotoLp,
    position: "43% 50%",
    alt: "Siswa Layanan Perbankan praktik customer service",
  },
  dkv: {
    src: fotoDkv,
    position: "45% 50%",
    alt: "Siswa DKV mengerjakan desain di laboratorium",
  },
  bd: {
    src: fotoBd,
    position: "40% 50%",
    alt: "Siswa Bisnis Digital praktik mengelola toko",
  },
  akl: {
    src: fotoAkl,
    position: "38% 50%",
    alt: "Siswa Akuntansi dan Keuangan Lembaga menghitung dengan kalkulator",
  },
  tkj: {
    src: fotoTkj,
    position: "58% 50%",
    alt: "Siswa TKJ praktik penyambungan fiber optik",
  },
  rpl: {
    src: fotoRpl,
    position: "45% 50%",
    alt: "Siswa RPL menulis kode program di laboratorium komputer",
  },
};

function MajorFeatureScene({ id }) {
  const photo = MAJOR_PHOTOS[id];
  return (
    <img
      className="keahlian-illustration keahlian-photo"
      src={photo.src}
      alt={photo.alt}
      style={{ objectPosition: photo.position }}
      draggable="false"
    />
  );
}

function MajorCardScene({ id }) {
  const photo = MAJOR_PHOTOS[id];
  return (
    <img
      className="keahlian-illustration keahlian-photo"
      src={photo.src}
      alt=""
      loading="lazy"
      style={{ objectPosition: photo.position }}
      draggable="false"
    />
  );
}

/* ── Animated Counter (counts from 0 to target) ── */
function AnimatedCounter({ target, suffix = "", separator = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  const formatted = separator
    ? count.toLocaleString("id-ID")
    : count.toString();

  return <span ref={ref}>{formatted}{suffix}</span>;
}

/* ── Typewriter Effect ── */
function TypeWriter({ text, speed = 18, delay = 300 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(timer);
      }, speed);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, text, speed, delay]);

  return (
    <span ref={ref} className="typewriter-text">
      {displayed.split("\n").map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
      {displayed.length < text.length && <span className="typewriter-cursor">|</span>}
    </span>
  );
}

function LandingPage() {
  const MAJORS_DATA = [
    {
      id: "rpl",
      code: "RPL",
      name: "Rekayasa Perangkat Lunak",
      title: "APA ITU REKAYASA PERANGKAT LUNAK?",
      color: "border-purple-600 text-purple-600",
      bgColor: "bg-purple-600",
      lightBg: "bg-purple-50",
      accentColor: "#9333ea",
      description:
        "Rekayasa Perangkat Lunak atau yang biasa disingkat RPL adalah jurusan yang mempelajari dan mendalami pengembangan perangkat lunak, mulai dari pembuatan, pemeliharaan, manajemen organisasi pengembangan perangkat lunak, dan manajemen kualitas.",
      icon: Laptop,
    },
    {
      id: "akl",
      code: "AKL",
      name: "Akuntansi dan Keuangan Lembaga",
      title: "APA ITU AKUNTANSI & KEUANGAN LEMBAGA?",
      color: "border-emerald-600 text-emerald-600",
      bgColor: "bg-emerald-600",
      lightBg: "bg-emerald-50",
      accentColor: "#059669",
      description:
        "Akuntansi dan Keuangan Lembaga (AKL) mempelajari tentang pencatatan keuangan, penyusunan laporan keuangan, perpajakan, audit, serta pengoperasian aplikasi komputer akuntansi modern sesuai standar keahlian industri perbankan & keuangan.",
      icon: Landmark,
    },
    {
      id: "lp",
      code: "LP",
      name: "Layanan Perbankan",
      title: "APA ITU LAYANAN PERBANKAN?",
      color: "border-green-600 text-green-600",
      bgColor: "bg-green-600",
      lightBg: "bg-green-50",
      accentColor: "#16a34a",
      description:
        "Layanan Perbankan membekali siswa dengan keterampilan transaksi keuangan, customer service perbankan, administrasi kredit, serta tata kelola operasional bank konvensional maupun syariah dengan laboratorium Bank Mini modern.",
      icon: Briefcase,
    },
    {
      id: "tkj",
      code: "TKJ",
      name: "Teknik Komputer dan Jaringan",
      title: "APA ITU TEKNIK KOMPUTER DAN JARINGAN?",
      color: "border-blue-600 text-blue-600",
      bgColor: "bg-blue-600",
      lightBg: "bg-blue-50",
      accentColor: "#a9aaac",
      description:
        "Teknik Komputer dan Jaringan (TKJ) fokus pada perakitan komputer, instalasi jaringan komputer LAN/WAN/Fiber Optik, konfigurasi server Linux/Windows, serta keamanan jaringan siber berstandar industri Telkom.",
      icon: Laptop,
    },
    {
      id: "bd",
      code: "BD",
      name: "Bisnis Digital",
      title: "APA ITU BISNIS DIGITAL?",
      color: "border-amber-600 text-amber-600",
      bgColor: "bg-amber-600",
      lightBg: "bg-amber-50",
      accentColor: "#d97706",
      description:
        "Bisnis Digital mempersiapkan talenta wirausaha digital yang menguasai e-commerce, digital marketing, SEO, social media management, pemasaran omni-channel, serta analisis data bisnis berbasis pasar global.",
      icon: ShoppingBag,
    },
    {
      id: "dkv",
      code: "DKV",
      name: "Desain Komunikasi Visual",
      title: "APA ITU DESAIN KOMUNIKASI VISUAL?",
      color: "border-rose-600 text-rose-600",
      bgColor: "bg-rose-600",
      lightBg: "bg-rose-50",
      accentColor: "#e11d48",
      description:
        "Desain Komunikasi Visual (DKV) mengajarkan desain grafis, ilustrasi digital, videografi, fotografi, branding produk, UI/UX design, dan animasi multimedia untuk memenuhi kebutuhan industri kreatif modern.",
      icon: Sparkles,
    },
    {
      id: "mp",
      code: "MP",
      name: "Manajemen Perkantoran",
      title: "APA ITU MANAJEMEN PERKANTORAN?",
      color: "border-cyan-600 text-cyan-600",
      bgColor: "bg-cyan-600",
      lightBg: "bg-cyan-50",
      accentColor: "#0891b2",
      description:
        "Manajemen Perkantoran menggembleng keahlian korespondensi bisnis, kearsipan digital, protokol perkantoran, public speaking, serta administrasi bisnis terpadu berbasis aplikasi perkantoran modern.",
      icon: Users,
    },
    {
      id: "psptv",
      code: "PSPTV",
      name: "Produksi Siaran & Program Televisi",
      title: "APA ITU PRODUKSI SIARAN TELEVISI?",
      color: "border-indigo-600 text-indigo-600",
      bgColor: "bg-indigo-600",
      lightBg: "bg-indigo-50",
      accentColor: "#4f46e5",
      description:
        "Produksi Siaran dan Program Televisi (PSPT) melatih pembuatan konten broadcasting, tata kamera, tata suara, pengolahan editing video studio, live streaming, dan penyutradaraan media televisi terkemuka.",
      icon: Radio,
    },
  ];

  // Achievements Carousel Data
  const ACHIEVEMENTS_DATA = [
    { id: 1, studentName: "ABIYYU ATHAULLAH DHIAULHAQ", studentClass: "Siswa Kelas XI - Desain Komunikasi Visual 1",
      subtitle: 'Lomba Sketsa Rancangan Layangan "Sikep" tingkat nasional oleh Himadipsi ISI Surakarta',
      title: "Lomba Sketsa Rancangan Layangan Sikep Tingkat Nasional yang diselenggarakan oleh Himadipsi ISI SURAKARTA",
      date: "23 Jul 2026", year: "2026", category: "Non-akademik", rank: "Meraih Juara 3", image: posterSikepFull },
    { id: 2, studentName: "TIM VOLI SMAKENSA", studentClass: "SMKN 1 Bondowoso",
      subtitle: "Gebyar Olahraga Siswa SMK se-Kabupaten Bondowoso",
      title: "Voli Smakensa Meraih Juara 1 pada Gebyar Olahraga Siswa SMK se-Kabupaten Bondowoso",
      year: "2026", category: "Olahraga", rank: "Meraih Juara 1", image: posterVoli },
    { id: 3, studentName: "PRESTASI SMAKENSA", studentClass: "SMKN 1 Bondowoso",
      subtitle: "KEJURPROV FORKI Jawa Timur 2026 di Malang",
      title: "Juara 2 Karate KEJURPROV FORKI Jawa Timur 2026 di Malang",
      year: "2026", category: "Olahraga", rank: "Meraih Juara 2", image: posterKarate },
  ];

  // Facilities Data
  const FACILITIES_DATA = [
    {
      id: 1,
      title: "Perpustakaan",
      desc: "Kami hadir sebagai pusat sumber belajar (resource center) dan jantung literasi bagi seluruh civitas akademika.",
      image: facilityPhotos.perpustakaan,
    },
    {
      id: 2,
      title: "Gedung Sasana Kridha Wiyata",
      desc: "Lapangan indoor Gedung Sasana Kridha Wiyata merupakan fasilitas serbaguna untuk olahraga dan kegiatan besar sekolah.",
      image: facilityPhotos.gedung,
    },
    {
      id: 3,
      title: "Bank Mini",
      desc: "Bank Mini hadir sebagai sarana laboratorium praktik bagi siswa/mahasiswa untuk mengenali transaksi operasional perbankan.",
      image: facilityPhotos.bank,
    },
    {
      id: 4,
      title: "Koperasi Sekolah",
      desc: "Koperasi Sekolah hadir sebagai unit pelayanan wirausaha sekaligus sarana pemenuhan kebutuhan perlengkapan siswa.",
      image: facilityPhotos.koperasi,
    },
    {
      id: 5,
      title: "Ruang TEFA",
      desc: "Ruangan Teaching Factory (TEFA) dirancang khusus untuk menghadirkan suasana dan standar kerja nyata dunia industri.",
      image: facilityPhotos.tefa,
    },
    {
      id: 6,
      title: "Digital Learning Hub",
      desc: "Dirancang sebagai ruang komunal masa depan, Ruangan Digital Learning Hub mendukung inovasi teknologi & kolaborasi.",
      image: facilityPhotos.digital,
    },
    {
      id: 7,
      title: "Masjid Nailul Huda",
      desc: "Masjid Nailul Huda hadir sebagai pusat kegiatan keagamaan sekaligus pembinaan karakter & keimanan seluruh siswa.",
      image: facilityPhotos.masjid,
    },
    {
      id: 8,
      title: "Lab Komputer",
      desc: "Laboratorium Komputer kami dilengkapi spesifikasi tinggi modern untuk mendukung pembelajaran pemrograman & DKV.",
      image: facilityPhotos.lab,
    },
  ];

  // Industry Partners
  const PARTNERS_DATA = [
    { name: "LUMOSH", sub: "Cyber Artistry", logo: logoLumosh, width: 72 },
    {
      name: "DPKP KABUPATEN BONDOWOSO",
      sub: "Dinas Pertanian",
      logo: logoDpkp,
      width: 245,
    },
    {
      name: "Hummatech",
      sub: "Technology Partner",
      logo: logoHummatech,
      width: 79,
    },
    {
      name: "accurate",
      sub: "Software Akuntansi",
      logo: logoAccurate,
      width: 76,
    },
    {
      name: "Telkom Indonesia",
      sub: "Telecommunication",
      logo: logoTelkom,
      width: 124,
    },
    {
      name: "METRO TV JAWA TIMUR",
      sub: "Broadcasting Partner",
      logo: logoMetroTv,
      width: 258,
    },
  ];

  const LAYANAN_DIGITAL = [
  { id: "bkk",  label: "BKK",  desc: "Bursa Kerja Khusus",      href: "#", Icon: Briefcase },
  { id: "spmb", label: "SPMB", desc: "Penerimaan Murid Baru",   href: "#", Icon: Users },
  { id: "blud", label: "BLUD", desc: "Produk & Layanan Sekolah", href: "#", Icon: ShoppingBag },
];

  // Navigation & UI state
  const [activeSection, setActiveSection] = useState("beranda");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
const [mobileLayananOpen, setMobileLayananOpen] = useState(false);
const layananRef = useRef(null);

  // Carousel State
  const [currentAchievement, setCurrentAchievement] = useState(0);

  // Jurusan (Keahlian & Masa Depan) - index jurusan yang sedang tampil
  const [activeMajor, setActiveMajor] = useState(0);
  // Foto jurusan sebelumnya, dipakai untuk transisi fade smooth saat ganti foto
  const [prevMajorData, setPrevMajorData] = useState(null);
  const prevMajorTimeoutRef = useRef(null);
  // Contact Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [article, setArticle] = useState(null);
  const articleDialog = useRef(null);
  const chatBody = useRef(null);
  const chatLauncher = useRef(null);
  const menuButton = useRef(null);

  // Chatbot Assistant State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Halo! Selamat datang di Website Official SMKN 1 Bondowoso (SMAKENSA). Ada yang bisa saya bantu terkait info Pendaftaran, Jurusan, atau Fasilitas?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const ids = ["beranda", "visi-misi", "jurusan", "prestasi", "berita", "kontak"];
      const current = ids.filter(id => document.getElementById(id)?.getBoundingClientRect().top <= 150).at(-1);
      if (current) setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
  if (!layananOpen) return;
  const onPointerDown = (e) => {
    if (layananRef.current && !layananRef.current.contains(e.target)) setLayananOpen(false);
  };
  const onKey = (e) => { if (e.key === "Escape") setLayananOpen(false); };
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("keydown", onKey);
  return () => {
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("keydown", onKey);
  };
}, [layananOpen]);
  useEffect(() => {
    const onKey = event => {
      if (event.key === "Escape") {
        if (mobileMenuOpen) { setMobileMenuOpen(false); menuButton.current?.focus(); }
        if (isChatOpen) { setIsChatOpen(false); requestAnimationFrame(() => chatLauncher.current?.focus()); }
      }
    };
    const onResize = () => { if (window.innerWidth > 900) setMobileMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [mobileMenuOpen, isChatOpen]);
  useEffect(() => {
    if (chatBody.current) chatBody.current.scrollTop = chatBody.current.scrollHeight;
  }, [chatMessages, isChatOpen]);
  useEffect(() => {
    if (article) articleDialog.current?.showModal();
  }, [article]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    const elements = document.querySelectorAll(".reveal-up");
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
  const openNews = event => {
    const button = event.target.closest(".btn-read-more, .btn-read-sm");
    if (!button) return;
    const card = button.closest(".featured-news-card, .sub-news-card");
    setArticle({
      title: card.querySelector("h3, h4").textContent,
      image: card.querySelector("img").src,
      excerpt: card.querySelector(".featured-news-excerpt, .sub-news-excerpt")?.textContent || ""
    });
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  };

  // Next / Prev Achievement Slider
  const handleNextAchievement = () => {
    setCurrentAchievement((prev) => (prev + 1) % ACHIEVEMENTS_DATA.length);
  };
  const handlePrevAchievement = () => {
    setCurrentAchievement(
      (prev) =>
        (prev - 1 + ACHIEVEMENTS_DATA.length) % ACHIEVEMENTS_DATA.length,
    );
  };

  // Auto-advance Panggung Prestasi (fade otomatis ke prestasi lainnya)
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentAchievement((prev) => (prev + 1) % ACHIEVEMENTS_DATA.length);
    }, 5000);
    return () => clearInterval(autoSlide);
  }, []);

  // Submit Contact Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.message.trim()) return;
    const subject = encodeURIComponent("Pesan dari " + formState.name.trim());
    const body = encodeURIComponent("Nama: " + formState.name.trim() + "\nEmail: " + formState.email.trim() + "\n\n" + formState.message.trim());
    window.location.href = "mailto:info@smkn1bondowoso.sch.id?subject=" + subject + "&body=" + body;
    setFormSubmitted(true);
  };

  // Chatbot responses logic
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const newMessages = [...chatMessages, { sender: "user", text: userText }];
    setChatMessages(newMessages);
    setChatInput("");

    // Generate automated Bot response
    setTimeout(() => {
      let botResponse =
        "Terima kasih atas pertanyaan Anda. Untuk informasi lebih rinci, Anda dapat menghubungi sekretariat SMKN 1 Bondowoso di (0332) 431201 atau email ke info@smkn1bondowoso.sch.id.";

      const lower = userText.toLowerCase();
      if (
        lower.includes("jurusan") ||
        lower.includes("prodi") ||
        lower.includes("rpl") ||
        lower.includes("keahlian")
      ) {
        botResponse =
          'SMKN 1 Bondowoso memiliki 8 Program Keahlian unggulan: RPL, AKL, LP, TKJ, BD, DKV, MP, dan PSPT. Anda dapat melihat detail tiap jurusan pada bagian "Jurusan" di halaman ini!';
      } else if (
        lower.includes("lokasi") ||
        lower.includes("alamat") ||
        lower.includes("dimana")
      ) {
        botResponse =
          "SMKN 1 Bondowoso berlokasi di Jalan HOS. Cokroaminoto No. 110, Kademangan, Kabupaten Bondowoso, Jawa Timur.";
      } else if (
        lower.includes("kepala sekolah") ||
        lower.includes("prakata") ||
        lower.includes("pimpinan")
      ) {
        botResponse =
          "Kepala SMKN 1 Bondowoso saat ini adalah Bapak Asyik Sulaiman, S.Pd, M.Pd.";
      } else if (
        lower.includes("daftar") ||
        lower.includes("ppdb") || lower.includes("spmb") ||
        lower.includes("masuk")
      ) {
        botResponse =
          "Pendaftaran siswa baru (PPDB) dibuka sesuai jadwal dinas pendidikan Jawa Timur. Silakan pantau berkala situs ini atau hubungi Panitia PPDB SMKN 1 Bondowoso.";
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse },
      ]);
    }, 600);
  };

  const activeAch = ACHIEVEMENTS_DATA[currentAchievement];

  // Jurusan aktif + 3 jurusan berikutnya (berputar kembali ke awal)
  const activeMajorData = MAJORS_DATA[activeMajor];
  const activeVisual = MAJOR_VISUALS[activeMajorData.id];
  const nextMajorIndexes = [1, 2, 3].map(
    (offset) => (activeMajor + offset) % MAJORS_DATA.length,
  );
  const handleNextMajor = () => {
    if (prevMajorTimeoutRef.current) clearTimeout(prevMajorTimeoutRef.current);
    setPrevMajorData(activeMajorData);
    setActiveMajor((prev) => (prev + 1) % MAJORS_DATA.length);
    prevMajorTimeoutRef.current = setTimeout(() => setPrevMajorData(null), 700);
  };

  useEffect(() => {
    return () => {
      if (prevMajorTimeoutRef.current) clearTimeout(prevMajorTimeoutRef.current);
    };
  }, []);
  return (
    <>
      <div className="app-root">
        <a href="#beranda" className="skip-link">Lewati ke konten utama</a>
        {/* HEADER NAVBAR */}
        <header className={`navbar ${isScrolled || mobileMenuOpen ? "scrolled menu-open" : "transparent"}`}>
          <div className="navbar-container">
            <button
              aria-label="SMAKENSA — kembali ke beranda"
              onClick={() => scrollToSection("beranda")}
              className="navbar-brand"
            >
              <img
                src={logoSmakensa}
                alt="Logo SMAKENSA"
                className="brand-logo-img"
              />
              <span className="brand-title">SMAKENSA</span>
            </button>

            <nav className="desktop-nav" aria-label="Navigasi utama">
              <button
                onClick={() => scrollToSection("beranda")}
                className={`nav-link ${activeSection === "beranda" ? "active" : ""}`}
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection("visi-misi")}
                className={`nav-link ${activeSection === "visi-misi" ? "active" : ""}`}
              >
                Visi & Misi
              </button>
              <button
                onClick={() => scrollToSection("jurusan")}
                className={`nav-link ${activeSection === "jurusan" ? "active" : ""}`}
              >
                Jurusan
              </button>
              <button
                onClick={() => scrollToSection("prestasi")}
                className={`nav-link ${activeSection === "prestasi" ? "active" : ""}`}
              >
                Prestasi
              </button>
              <button
                onClick={() => scrollToSection("berita")}
                className={`nav-link ${activeSection === "berita" ? "active" : ""}`}
              >
                Berita
              </button>

              <div className={`nav-dropdown ${layananOpen ? "open" : ""}`} ref={layananRef}>
                <button
                  type="button"
                  className={`nav-link nav-dropdown-toggle ${layananOpen ? "active" : ""}`}
                  onClick={() => setLayananOpen((v) => !v)}
                  aria-expanded={layananOpen}
                  aria-controls="menu-layanan-digital"
                >
                  Layanan Digital
                  <ChevronDown className="nav-dropdown-chevron" aria-hidden="true" />
                </button>
                <ul id="menu-layanan-digital" className="nav-dropdown-menu">
                  {LAYANAN_DIGITAL.map(({ id, label, desc, href, Icon }) => (
                    <li key={id}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-dropdown-item"
                        onClick={() => setLayananOpen(false)}
                      >
                        <span className="nav-dropdown-icon"><Icon aria-hidden="true" /></span>
                        <span className="nav-dropdown-text">
                          <strong>{label}</strong>
                          <small>{desc}</small>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="desktop-contact-wrapper">
              <button
                onClick={() => scrollToSection("kontak")}
                className="btn-contact-nav"
              >
                Kontak
              </button>
            </div>

            <div className="mobile-menu-toggle">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mobile-toggle-btn"
                ref={menuButton}
                aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? (
                  <X className="icon-toggle" />
                ) : (
                  <Menu className="icon-toggle" />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav id="mobile-navigation" className="mobile-drawer" aria-label="Navigasi seluler">
              <button
                onClick={() => scrollToSection("beranda")}
                className="mobile-nav-link"
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection("visi-misi")}
                className="mobile-nav-link"
              >
                Visi & Misi
              </button>
              <button
                onClick={() => scrollToSection("jurusan")}
                className="mobile-nav-link"
              >
                Jurusan
              </button>
              <button
                onClick={() => scrollToSection("prestasi")}
                className="mobile-nav-link"
              >
                Prestasi
              </button>
              <button
                onClick={() => scrollToSection("berita")}
                className="mobile-nav-link"
              >
                Berita
              </button>
              <button
                onClick={() => scrollToSection("kontak")}
                className="mobile-btn-contact"
              >
                Kontak
              </button>
            </nav>
          )}
        </header>

        <main>
        {/* HERO SECTION */}
        <section id="beranda" className="hero-section" tabIndex={-1}>
          <div className="hero-bg-overlay">
            <picture className="hero-picture">
              <source media="(max-width: 600px)" srcSet={bgHeroMobile} />
            <img
              fetchPriority="high"
              width="1800"
              height="1180"
              src={bgHero}
              alt="SMKN 1 Bondowoso Student Ceremony"
              className="hero-bg-image"
            />
            </picture>
            <div className="hero-gradient-overlay"></div>
          </div>

          <div className="hero-content-wrapper">
            <div className="hero-text-block">
              <div className="hero-badge-box">
                <span className="hero-badge">SMKN 1 Bondowoso</span>
              </div>

              <h1 className="hero-heading">
                Dedikasi Terbaik untuk
                <br className="hero-br" /> Masa{" "}
                <span className="text-orange">Depan</span>
              </h1>

              <p className="hero-subtitle">
                Di balik lulusan yang siap kerja dan berkarakter, ada tenaga
                pendidik profesional dan berdedikasi SMKN 1 Bondowoso.
              </p>

              <div className="hero-buttons">
                <button
                  onClick={() => scrollToSection("visi-misi")}
                  className="btn-hero-outline"
                >
                  Tentang Sekolah
                </button>
                <button
                  onClick={() => scrollToSection("jurusan")}
                  className="btn-hero-primary"
                >
                  Lihat Program Keahlian <ArrowRight className="icon-sm" />
                </button>
              </div>
            </div>
          </div>

          <div className="hero-stats-wrapper">
            <div className="hero-stats-card">
              <div className="stat-item">
                <p className="stat-number">
                  <AnimatedCounter target={1850} suffix="" separator="." duration={2000} /><span className="stat-plus">+</span>
                </p>
                <p className="stat-label">Siswa aktif</p>
              </div>
              <div className="stat-item border-left">
                <p className="stat-number">
                  <AnimatedCounter target={124} suffix="" duration={2000} /><span className="stat-plus">+</span>
                </p>
                <p className="stat-label">Guru & Staf</p>
              </div>
              <div className="stat-item border-left">
                <p className="stat-number"><AnimatedCounter target={8} duration={1500} /></p>
                <p className="stat-label">Program Keahlian</p>
              </div>
              <div className="stat-item border-left">
                <p className="stat-number">
                  <AnimatedCounter target={85} duration={2000} /><span className="stat-plus">+</span>
                </p>
                <p className="stat-label">Mitra Industri</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRAKATA KEPALA SEKOLAH */}
        <section id="prakata" className="prakata-section">
          <div className="section-container">
            <div className="prakata-grid">
              <div className="prakata-content reveal-up">
                <div className="prakata-header">
                  <div>
                    <h2 className="section-title">
                      <span
                        className="text-orange underline-highlight"
                        id="apa"
                      >
                        <span className="prakata-heading-prefix">Prakata</span>{" "}Kepala Sekolah
                        <span className="underline-bar"></span>
                      </span>
                    </h2>
                  </div>
                  <div className="quote-icon-box">
                    <Quote className="icon-quote" />
                  </div>
                </div>
                <div className="quote-card">
                  <p className="quote-main-text">
                    Pendidikan bukan hanya gedung megah, bukan hanya papan tulis dan bangku tapi kobar semangat, nyala kreativitas, dan detak jantung yang haus pengetahuan.
                  </p>
                  <div className="divider-line"></div>
                  <p className="quote-sub-text">
                    <TypeWriter text="Selamat datang di SMK Negeri 1 Bondowoso. Kami berkomitmen untuk terus meningkatkan kualitas pendidikan vokasi yang relevan, adaptif, dan berorientasi pada kebutuhan dunia usaha dan industri. Mari bersama kita ciptakan ruang belajar yang merdeka agar setiap tunas kejeniusan dapat tumbuh dan berkembang secara optimal.

Dengan dukungan tenaga pendidik yang profesional, fasilitas berstandar industri, dan semangat kolaborasi bersama seluruh stakeholder SMKN 1 Bondowoso siap mencetak generasi penerus bangsa yang kompeten, berkarakter, dan berdaya saing global." speed={4} delay={300} />
                  </p>
                </div>

                <div className="principal-signature">
                  <h4 className="principal-name">Asyik Sulaiman, S.Pd, M.Pd</h4>
                  <p className="principal-title">
                    Kepala Sekolah SMKN 1 Bondowoso
                  </p>
                </div>
              </div>

              <div className="prakata-photo-col">
                <img
                  loading="lazy"
                      src={PakAsik}
                  alt="Asyik Sulaiman, S.Pd, M.Pd - Kepala SMKN 1 Bondowoso"
                  className="principal-photo"
                />
              </div>
            </div>
          </div>
        </section>

        {/* VISI DAN MISI SECTION */}
        <section id="visi-misi" className="visi-misi-section">
          <div className="blob-yellow-1"></div>
          {/* <div className="blob-yellow-2"></div> */}
          <div className="semua-bulat-visi">
            <div className="bulat1"></div>
            <div className="bulat2"></div>
          </div>

          <div className="semua-bulat-visi-2">
            <div className="bulat3"></div>
            <div className="bulat4"></div>
          </div>

          <div className="section-container">
            <div className="visi-misi-header">
              <span className="sub-header-orange">
                Tentang SMKN 1 Bondowoso
              </span>
              <h2 className="section-title">
                Visi dan <span className="text-orange">Misi</span>
              </h2>
            </div>

            <div className="visi-misi-grid">
              <div className="visi-card">
                <div>
                  <h3 className="card-title-lg">Visi</h3>
                  <p className="card-text">
                    Terwujudnya SMK Negeri 1 Bondowoso sebagai pusat pendidikan
                    vokasi yang Menyala Mendunia; unggul dalam prestasi dan
                    inovasi, serta menghasilkan lulusan yang kompetitif di
                    tingkat nasional maupun internasional.
                  </p>
                </div>
                <img src={logoOtak} className="icon-otak reveal-up" alt="" />
              </div>

              <div className="misi-card">
                <div className="misi-header-row">
                  <h3 className="card-title-lg">Misi</h3>
                  <span className="misi-star-badge">★</span>
                </div>
                <ul className="misi-list">
                  <li className="misi-item">
                    <span className="bullet-yellow"></span>
                    <span>
                      Meningkatkan Keimanan dan Ketaqwaan kepada Tuhan YME
                      sebagai fondasi karakter murid.
                    </span>
                  </li>
                  <li className="misi-item">
                    <span className="bullet-yellow"></span>
                    <span>
                      Membangun Semangat Berprestasi dan Berinovasi (Menyala)
                      melalui pembelajaran berbasis proyek (PBL) yang inovatif.
                    </span>
                  </li>
                  <li className="misi-item">
                    <span className="bullet-yellow"></span>
                    <span>
                      Mencetak Lulusan Siap Kerja yang berdaya saing global dan
                      selaras (link & match) dengan standar DUDI.
                    </span>
                  </li>
                  <li className="misi-item">
                    <span className="bullet-yellow"></span>
                    <span>
                      Menumbuhkan Jiwa Kewirausahaan guna melahirkan
                      wirausahawan muda yang tangguh dan adaptif.
                    </span>
                  </li>
                  <li className="misi-item">
                    <span className="bullet-yellow"></span>
                    <span>
                      Mempersiapkan Murid Melanjutkan Studi melalui penguatan
                      literasi, numerasi, dan teknologi terapan.
                    </span>
                  </li>
                  <li className="misi-item">
                    <span className="bullet-yellow"></span>
                    <span>
                      Memperluas Kemitraan Strategis (Mendunia) dengan institusi
                      pendidikan, lembaga sertifikasi, dan industri
                      multinasional.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="tujuan-card reveal-up">
              <div className="tujuan-header">
                <h3 className="card-title-lg">Tujuan</h3>
                <div className="target-icon-circle">
                  <img src={logoTujuan} className="icon-target" alt="" />
                </div>
              </div>
              <ul className="tujuan-grid">
                <li className="tujuan-item">
                  <span className="bullet-yellow-sm"></span>
                  <span>
                    <strong>Karakter Mulia:</strong> Mewujudkan lulusan yang
                    beriman, disiplin, berintegritas, dan berbudaya kerja
                    industri.
                  </span>
                </li>
                <li className="tujuan-item">
                  <span className="bullet-yellow-sm"></span>
                  <span>
                    <strong>Prestasi & Inovasi:</strong> Menghasilkan minimal 15
                    prestasi tingkat nasional dan 2 rekognisi internasional per
                    tahun.
                  </span>
                </li>
                <li className="tujuan-item">
                  <span className="bullet-yellow-sm"></span>
                  <span>
                    <strong>Kesiapan Bekerja:</strong> Menyelaraskan 100%
                    kurikulum dengan DUDI dan menyerap minimal 55% lulusan di
                    dunia kerja.
                  </span>
                </li>
                <li className="tujuan-item">
                  <span className="bullet-yellow-sm"></span>
                  <span>
                    <strong>Jiwa Wirausaha:</strong> Melahirkan minimal 20%
                    lulusan sebagai technopreneur muda mandiri melalui Teaching
                    Factory.
                  </span>
                </li>
                <li className="tujuan-item">
                  <span className="bullet-yellow-sm"></span>
                  <span>
                    <strong>Studi Lanjut:</strong> Mengantarkan minimal 25%
                    lulusan melanjutkan ke Perguruan Tinggi Negeri atau Vokasi.
                  </span>
                </li>
                <li className="tujuan-item">
                  <span className="bullet-yellow-sm"></span>
                  <span>
                    <strong>Kemitraan Global:</strong> Membangun kerja sama
                    aktif dengan minimal 10 DUDI multinasional dan instansi luar
                    negeri.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* JURUSAN SECTION */}
        <section id="jurusan" className="keahlian-section">
          <img src={elementKeahlian} alt="" className="element-ahli" />

          <div className="keahlian-top-strip">
            <div className="keahlian-dot keahlian-dot-1"></div>
            <div className="keahlian-dot keahlian-dot-2"></div>
          </div>

          <div className="keahlian-wrap reveal-up">
            <div className="keahlian-hero-header">
              <img src={iconChar} alt="" className="icon-char" />
              <div className="keahlian-eyebrow">
                <span>Keahlian & Masa Depan</span>
              </div>
              <h2 className="keahlian-hero-title">Keahlian & Masa Depan</h2>
            </div>

            <div
              className="keahlian-layout-grid"
              style={{
                "--kh-accent": activeVisual.accent,
                "--kh-accent-light": activeVisual.accentLight,
              }}
            >
              <div className="keahlian-feature-photo">
                <div className="keahlian-feature-clip">
                  {prevMajorData && (
                    <div className="keahlian-scene keahlian-scene-out" key={`prev-${prevMajorData.id}`}>
                      <MajorFeatureScene id={prevMajorData.id} />
                    </div>
                  )}
                  <div className="keahlian-scene keahlian-scene-in" key={activeMajorData.id}>
                    <MajorFeatureScene id={activeMajorData.id} />
                    <div className="keahlian-feature-caption">
                      {activeVisual.caption.map((line) => (
                        <span key={line} className="keahlian-caption-line">
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="keahlian-emblem">
                    <img src={logoSmakensa} alt="Logo SMAKENSA" />
                  </div>

                  {/* <div className="keahlian-pager">
                    {MAJORS_DATA.map((major, idx) => (
                      <button
                        key={major.id}
                        type="button"
                        className={`keahlian-pager-dot ${idx === activeMajor ? "active" : ""}`}
                        onClick={() => setActiveMajor(idx)}
                        aria-label={`Tampilkan jurusan ${major.name}`}
                      />
                    ))}
                  </div> */}
                </div>

                <button
                  type="button"
                  className="keahlian-arrow-btn"
                  onClick={handleNextMajor}
                  aria-label="Lihat jurusan berikutnya"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="#fff"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="keahlian-feature-text keahlian-scene-pop" key={activeMajorData.id}>
                <h2>
                  <span className="keahlian-black">APA ITU</span>{" "}
                  <span className="keahlian-purple">
                    {activeMajorData.title.replace(/^APA ITU\s+/, "")}
                  </span>
                </h2>
                <p>{activeMajorData.description}</p>
                <div className="keahlian-divider"></div>
              </div>

              <div className="keahlian-program-cards">
                {nextMajorIndexes.map((idx, pos) => {
                  const major = MAJORS_DATA[idx];
                  const visual = MAJOR_VISUALS[major.id];
                  return (
                    <button
                      key={major.id}
                      type="button"
                      className="keahlian-card"
                      style={{
                        background: visual.cardBg,
                        animationDelay: `${pos * 70}ms`,
                        "--kh-card-line": visual.accentLight,
                      }}
                      onClick={() => setActiveMajor(idx)}
                      aria-label={`Lihat jurusan ${major.name}`}
                    >
                      <MajorCardScene id={major.id} />
                      <div
                        className="keahlian-badge"
                        style={{ background: visual.accent }}
                      >
                        {major.code}
                      </div>
                      <div className="keahlian-card-title">
                        {visual.cardLines.map((line, i) => (
                          <React.Fragment key={line}>
                            {i > 0 && <br />}
                            {line}
                          </React.Fragment>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* PRESTASI SECTION */}
        <section id="prestasi" className="prestasi-section">
          <div className="prestasi-bg-marquee" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, colIndex) => (
              <div
                key={`bgcol-${colIndex}`}
                className={`prestasi-bg-col ${
                  colIndex % 2 === 0
                    ? "prestasi-bg-col-up"
                    : "prestasi-bg-col-down"
                }`}
              >
                {Array.from({ length: 14 }).map((_, imgIndex) => (
                  <img
                    key={`bgcol-${colIndex}-img-${imgIndex}`}
                    src={achievementPosters[(colIndex + imgIndex) % achievementPosters.length]}
                    alt=""
                    className="prestasi-bg-poster"
                    loading="lazy"
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="bulat-semua-ach-1">
            <div className="bulat-ach-1"></div>
            <div className="bulat-ach-2"></div>
          </div>
          <div className="bulat-semua-ach-2">
            <div className="bulat-ach-3"></div>
            <div className="bulat-ach-4"></div>
          </div>
          <div className="prestasi-header-bar reveal-up">
              <img src={panggungPrestasiIcon} alt="Panggung Prestasi" className="prestasi-header-img" />
            </div>

          <div
            className="section-container"
            style={{ position: "relative", zIndex: 10 }}
          >

            <div className="achievement-card" aria-roledescription="karusel" aria-label="Prestasi siswa">
              <div className="achievement-grid achievement-fade-in" key={currentAchievement}>
                <div className="achievement-img-col">
                  <img
                    src={activeAch.image}
                    alt={activeAch.title}
                    className="achievement-poster"
                  />
                  <div className="achievement-poster-overlay">
                    <p className="achievement-rank-text">{activeAch.rank}</p>
                    <p className="achievement-class-text">
                      {activeAch.studentClass}
                    </p>
                  </div>
                </div>

                <div className="achievement-text-col" aria-live="polite" aria-atomic="true">
                  <div className="student-tag">
                    <img src={usurCircle} alt="" className="icon-user" />{" "}
                    {activeAch.studentName}
                  </div>

                  <div className="subtitle-row">
                    <img
                      src={iconAward}
                      alt=""
                      className="icon-sm"
                      id="icon-tropi"
                    />
                    <span>{activeAch.subtitle}</span>
                  </div>

                  <h3 className="achievement-title-text">{activeAch.title}</h3>

                  <div className="achievement-meta-row">
                    <div className="meta-date">
                      <Calendar className="icon-sm" />
                      <span>{activeAch.date || activeAch.year}</span>
                    </div>
                    <span className="badge-year">{activeAch.year}</span>
                    <span className="badge-category">{activeAch.category}</span>
                  </div>

                  <img
                    src={iconSparkles}
                    alt=""
                    className="achievement-sparkle"
                  />
                </div>
              </div>

              <div className="slider-controls">
                <button onClick={handlePrevAchievement} className="slider-btn" aria-label="Prestasi sebelumnya">
                  <ChevronLeft className="icon-sm" />
                </button>
                <button onClick={handleNextAchievement} className="slider-btn" aria-label="Prestasi berikutnya">
                  <ChevronRight className="icon-sm" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BERITA SECTION */}
        <section id="berita" className="berita-section">
          <div className="berita-decor-circle" aria-hidden="true"></div>
          <div
            className="section-container"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div className="berita-top-bar">
              <div>
                <h2 className="section-title" id="kabar">
                  Kabar & <br /> Berita{" "}
                  <span className="text-orange">Vokasi</span>
                </h2>
              </div>
              <button
                onClick={() => scrollToSection("semua-berita")}
                className="btn-all-news"
              >
                Lihat Semua Berita <ArrowRight className="icon-sm" />
              </button>
            </div>

            <div className="berita-layout-grid" onClick={openNews}>
              <div className="news-main-col">
                <div className="featured-news-card">
                  <div className="featured-img-box">
                    <img
                      loading="lazy"
                      src={newsPhotos.mgmp}
                      alt="Peace Corps USA Event"
                      className="featured-img"
                    />
                    <span className="category-tag-badge">Kegiatan Sekolah</span>
                  </div>
                  <div className="featured-news-body">
                    <div className="meta-stats-row">
                      <span className="meta-stat-item">
                        <Calendar className="icon-orange-sm" /> 23 Jul 2026
                      </span>
                      <span>•</span>
                      <span className="meta-stat-item">
                        <Eye className="icon-orange-sm" /> 192 Views
                      </span>
                    </div>
                    <h3 className="featured-news-title">
                      Semangat Berkolaborasi, MGMP Bahasa Inggris SMK Kabupaten
                      Bondowoso Hadirkan Relawan Peace Corps asal USA
                    </h3>
                    <p className="featured-news-excerpt">
                      Pertemuan MGMP Bahasa Inggris SMK Kabupaten Bondowoso
                      menjadi wadah penguatan kompetensi guru melalui diseminasi
                      materi Deep Learning oleh Lina Kurniawati, S.Pd. serta
                      sesi pertukaran budaya (Cultural Exchange)...
                    </p>
                    <div className="featured-news-footer">
                      <span className="author-text">
                        Penulis:{" "}
                        <strong style={{ color: "#1e293b" }}>SuperAdmin</strong>
                      </span>
                      <button className="btn-read-more">
                        Baca selengkapnya <ArrowRight className="icon-sm" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="sub-news-grid" id="semua-berita">
                  <div className="sub-news-card">
                    <div className="sub-news-img-box">
                      <img
                        loading="lazy"
                      src={newsPhotos.bk}
                        alt="Sistem BK Terintegrasi"
                        className="sub-news-img"
                      />
                      <span className="sub-news-tag">Kegiatan Sekolah</span>
                    </div>
                    <div className="sub-news-date">
                      <span>01 Aug 2026</span> • <span>192 Views</span>
                    </div>
                    <h4 className="sub-news-title">
                      Atasi Antrean Keterlambatan, SMKN 1 Bondowoso Luncurkan
                      Sistem BK Terintegrasi
                    </h4>
                    <p className="sub-news-excerpt">SMKN 1 Bondowoso meluncurkan Sistem Terintegrasi Bimbingan Konseling berbasis Face Recognition untuk mempercepat presensi siswa.</p>
                    <div className="sub-news-footer">
                      <span style={{ fontSize: "10px", color: "#64748b" }}>
                        SuperAdmin
                      </span>
                      <button className="btn-read-sm">
                        Baca <ArrowRight className="icon-sm" />
                      </button>
                    </div>
                  </div>

                  <div className="sub-news-card">
                    <div className="sub-news-img-box">
                      <img
                        loading="lazy"
                      src={newsPhotos.asri}
                        alt="Juara Kebersihan Sekolah"
                        className="sub-news-img"
                      />
                      <span className="sub-news-tag">Prestasi</span>
                    </div>
                    <div className="sub-news-date">
                      <span>23 Jul 2026</span> • <span>192 Views</span>
                    </div>
                    <h4 className="sub-news-title">
                      SMK Negeri 1 Bondowoso Meraih Juara 1 Lomba Kebersihan
                      Lingkungan Sekolah
                    </h4>
                    <p className="sub-news-excerpt">SMKN 1 Bondowoso sukses meraih Juara 1 Lomba Kebersihan Lingkungan Sekolah dalam program ASRI.</p>
                    <div className="sub-news-footer">
                      <span style={{ fontSize: "10px", color: "#64748b" }}>
                        WriterSmakensa
                      </span>
                      <button className="btn-read-sm">
                        Baca <ArrowRight className="icon-sm" />
                      </button>
                    </div>
                  </div>

                  <div className="sub-news-card">
                    <div className="sub-news-img-box">
                      <img
                        loading="lazy"
                      src={newsPhotos.osis}
                        alt="Debat OSIS"
                        className="sub-news-img"
                      />
                      <span className="sub-news-tag">Kegiatan Sekolah</span>
                    </div>
                    <div className="sub-news-date">
                      <span>23 Jul 2026</span> • <span>192 Views</span>
                    </div>
                    <h4 className="sub-news-title">
                      Debat Calon Ketua Wakil Ketua OSIS SMKN 1 Bondowoso
                      Periode 2025/2026
                    </h4>
                    <p className="sub-news-excerpt">SMKN 1 Bondowoso melaksanakan kegiatan Debat Calon Ketua dan Wakil Ketua OSIS Periode 2025/2026.</p>
                    <div className="sub-news-footer">
                      <span style={{ fontSize: "10px", color: "#64748b" }}>
                        SuperAdmin
                      </span>
                      <button className="btn-read-sm">
                        Baca <ArrowRight className="icon-sm" />
                      </button>
                    </div>
                  </div>

                  <div className="sub-news-card">
                    <div className="sub-news-img-box">
                      <img
                        loading="lazy"
                      src={newsPhotos.kemenkeu}
                        alt="Kemenkeu Mengajar"
                        className="sub-news-img"
                      />
                      <span className="sub-news-tag">Kegiatan Sekolah</span>
                    </div>
                    <div className="sub-news-date">
                      <span>10 Nov 2025</span> • <span>192 Views</span>
                    </div>
                    <h4 className="sub-news-title">
                      Kemenkeu Mengajar 10 Tanamkan Literasi Keuangan di SMKN 1
                      Bondowoso
                    </h4>
                    <p className="sub-news-excerpt">Kementerian Keuangan Republik Indonesia melaksanakan kegiatan Kemenkeu Mengajar ke-10 Tahun 2025.</p>
                    <div className="sub-news-footer">
                      <span style={{ fontSize: "10px", color: "#64748b" }}>
                        SuperAdmin
                      </span>
                      <button className="btn-read-sm">
                        Baca <ArrowRight className="icon-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="news-sidebar-col">
                <h3 className="sidebar-title">TRENDING / POPULER</h3>

                <div className="trending-list">
                  <div className="trending-item">
                    <span className="trending-num">01</span>
                    <div>
                      <h5 className="trending-item-title">
                        Atasi Antrean Keterlambatan, SMKN 1 Bondowoso Luncurkan
                        Sistem BK Terintegrasi
                      </h5>
                      <p className="trending-date">01 Aug 2026</p>
                    </div>
                  </div>

                  <div className="trending-item">
                    <span className="trending-num">02</span>
                    <div>
                      <h5 className="trending-item-title">
                        Debat Calon Ketua Wakil Ketua OSIS SMKN 1 Bondowoso
                        Periode 2025/2026
                      </h5>
                      <p className="trending-date">01 Aug 2026</p>
                    </div>
                  </div>

                  <div className="trending-item">
                    <span className="trending-num gold">03</span>
                    <div>
                      <h5 className="trending-item-title gold">
                        Kemenkeu Mengajar 10 Tanamkan Literasi Keuangan di SMKN
                        1 Bondowoso
                      </h5>
                      <p className="trending-date">01 Aug 2026</p>
                    </div>
                  </div>

                  <div className="trending-item">
                    <span className="trending-num">04</span>
                    <div>
                      <h5 className="trending-item-title">
                        Guru Tamu DKV SMKN 1 Bondowoso Hadirkan Dosen ITS
                        Surabaya
                      </h5>
                      <p className="trending-date">01 Aug 2026</p>
                    </div>
                  </div>

                  <div className="trending-item">
                    <span className="trending-num">05</span>
                    <div>
                      <h5 className="trending-item-title">
                        SMK Negeri 1 Bondowoso Meraih Juara 1 Lomba Kebersihan
                        Lingkungan Sekolah
                      </h5>
                      <p className="trending-date">01 Aug 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FASILITAS SECTION */}
        <section id="fasilitas" className="fasilitas-section">
          <div className="section-container">
            <div className="fasilitas-header reveal-up">
              <p className="fasilitas-subtitle">Fasilitas SMKN 1 Bondowoso</p>
              <h2 className="fasilitas-title">
                Lingkungan <span className="text-orange">Berkualitas.</span>
              </h2>
              <p className="fasilitas-desc">
                Kami percaya bahwa lingkungan belajar yang representatif adalah
                kunci dari proses transfer ilmu yang efektif dan menyenangkan.
              </p>
            </div>

            <div className="fasilitas-marquee-wrap reveal-up">
              <div className="fasilitas-row">
                <div className="fasilitas-track fasilitas-track-right">
                  {[...FACILITIES_DATA.slice(0, 4), ...FACILITIES_DATA.slice(0, 4)].map((facility, idx) => (
                    <div
                      key={`top-${facility.id}-${idx}`}
                      className="facility-card"
                    >
                      <div>
                        <div className="facility-img-box">
                          <img
                            loading="lazy"
                      src={facility.image}
                            alt={facility.title}
                            className="facility-img"
                          />
                        </div>
                        <div className="facility-card-body">
                          <h3 className="facility-card-title">
                            {facility.title}
                          </h3>
                          <p className="facility-card-desc">{facility.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fasilitas-row">
                <div className="fasilitas-track fasilitas-track-left">
                  {[...FACILITIES_DATA.slice(4, 8), ...FACILITIES_DATA.slice(4, 8)].map((facility, idx) => (
                    <div
                      key={`bottom-${facility.id}-${idx}`}
                      className="facility-card"
                    >
                      <div>
                        <div className="facility-img-box">
                          <img
                            loading="lazy"
                      src={facility.image}
                            alt={facility.title}
                            className="facility-img"
                          />
                        </div>
                        <div className="facility-card-body">
                          <h3 className="facility-card-title">
                            {facility.title}
                          </h3>
                          <p className="facility-card-desc">{facility.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MITRA SECTION */}
        <section className="partners-section">
          <div className="section-container partners-container reveal-up">
            <div>
              <p className="partners-sub">MITRA SMKN 1 BONDOWOSO</p>
              <h2 className="partners-title">
                <span className="text-orange">Kemitraan Strategis</span> & Dunia
                Industri.
              </h2>
            </div>

            <div className="partners-logo-grid">
              {PARTNERS_DATA.map((partner, idx) => (
                <div key={idx} className="partner-item">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="partner-logo"
                    style={{ maxWidth: partner.width, width: "100%" }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KONTAK SECTION */}
        <section id="kontak" className="kontak-section">
          <div className="section-container">
            <div className="kontak-grid">
              <div className="kontak-info-col">
                <div>
                  <p className="kontak-sub">INFORMASI KONTAK</p>
                  <h2 className="kontak-title">
                    Jalin <span className="text-orange">Koneksi.</span>
                  </h2>
                  <p className="kontak-desc">
                    Kami terbuka untuk kolaborasi dengan industri (DUDI),
                    kunjungan studi banding, pendaftaran siswa baru, maupun
                    pertanyaan umum.
                  </p>
                </div>

                <div className="info-cards-list">
                  <div className="info-card">
                    <div className="info-icon-box">
                      <MapPin className="icon-info" />
                    </div>
                    <div>
                      <span className="info-label">Lokasi Utama</span>
                      <p className="info-val-text">
                        Jalan HOS. Cokroaminoto No. 110, Kademangan, Kabupaten
                        Bondowoso, Provinsi Jawa Timur – Indonesia
                      </p>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon-box">
                      <Phone className="icon-info" />
                    </div>
                    <div>
                      <span className="info-label">Telepon Kantor</span>
                      <p className="info-val-text"><a href="tel:+62332431201">(0332) 431201</a></p>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon-box">
                      <Mail className="icon-info" />
                    </div>
                    <div>
                      <span className="info-label">Email Resmi</span>
                      <p className="info-val-text">
                        <a href="mailto:info@smkn1bondowoso.sch.id">info@smkn1bondowoso.sch.id</a>
                      </p>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon-box">
                      <Clock className="icon-info" />
                    </div>
                    <div>
                      <span className="info-label">Jam Operasional</span>
                      <p className="info-val-text">
                        Senin – Jumat (07.00 – 15.30 WIB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="kontak-form-col reveal-up">
                <h3 className="form-header-title">
                  Kirim Pesan & Korespondensi
                </h3>
                <p className="form-header-desc">
                  Isi formulir di bawah untuk menyiapkan pesan melalui aplikasi email Anda.
                </p>

                  <form onSubmit={handleSubmitForm} className="form-inputs">
                    <div className="form-row-2col">
                      <div>
                        <label htmlFor="contact-name" className="input-label">NAMA LENGKAP</label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          autoComplete="name"
                          required
                          placeholder="Nama Anda...."
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="input-label">ALAMAT EMAIL</label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          autoComplete="email"
                          required
                          placeholder="Nama@gmail.com"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              email: e.target.value,
                            })
                          }
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="input-label">PESAN / PERTANYAAN</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                        className="textarea-field"
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-submit-form">
                      LANJUTKAN KE EMAIL
                    </button>
                  </form>
                {formSubmitted && <p className="form-success-box" role="status">Draf pesan dibuka melalui aplikasi email. Pesan belum terkirim sampai Anda menekan Kirim di aplikasi tersebut. Jika aplikasi tidak terbuka, hubungi info@smkn1bondowoso.sch.id. Isian formulir tetap tersimpan di halaman ini.</p>}
              </div>
            </div>
          </div>
        </section>

        </main>
        {/* FOOTER */}
        <footer className="footer-wrapper">
          <div className="section-container footer-content">
            <div className="footer-top-brand">
              <img src={logoSmakensa} alt="Logo SMKN 1 Bondowoso" className="footer-logo-img" />
              <h2 className="footer-title">SMKN 1 BONDOWOSO</h2>
              <p className="footer-sub">
                Sekolah Menengah Kejuruan · Bondowoso
              </p>
            </div>

            <div className="footer-links-grid">
              <div className="footer-col">
                <h4 className="footer-col-title">NAVIGASI</h4>
                <ul className="footer-ul">
                  <li>
                    <button
                      onClick={() => scrollToSection("beranda")}
                      className="footer-btn-link"
                    >
                      Beranda
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("prakata")}
                      className="footer-btn-link"
                    >
                      Tentang Kami
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("jurusan")}
                      className="footer-btn-link"
                    >
                      Jurusan
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("prestasi")}
                      className="footer-btn-link"
                    >
                      Prestasi
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("berita")}
                      className="footer-btn-link"
                    >
                      Berita
                    </button>
                  </li>
                </ul>
              </div>

              <div className="footer-col">
                <h4 className="footer-col-title">KONTAK</h4>
                <p style={{ lineHeight: "1.5" }}>
                  Jalan HOS. Cokroaminoto No.110, Kademangan, Kabupaten
                  Bondowoso, Provinsi Jawa Timur – Indonesia
                </p>
                <p><a href="tel:+62332431201">(0332) 431201</a></p>
                <p><a href="mailto:info@smkn1bondowoso.sch.id">info@smkn1bondowoso.sch.id</a></p>
              </div>

              <div className="footer-col">
                <h4 className="footer-col-title">SOSIAL MEDIA</h4>
                <ul className="footer-ul">
                  <li>
                    <span>Instagram</span>
                  </li>
                  <li>
                    <span>Facebook</span>
                  </li>
                  <li>
                    <span>Youtube</span>
                  </li>
                </ul>
              </div>

              <div className="footer-col">
                <h4 className="footer-col-title">PROGRAM KEAHLIAN</h4>
                <ul className="footer-ul">
                  <li>Akuntansi</li>
                  <li>Bisnis Digital</li>
                  <li>Desain Komunikasi Visual</li>
                  <li>Layanan Perbankan</li>
                  <li>Manajemen Perkantoran</li>
                  <li>Produksi Siaran Program Televisi</li>
                  <li>Rekayasa Perangkat Lunak</li>
                  <li>Teknik Komputer Dan Jaringan</li>
                </ul>
              </div>

              <div className="footer-col">
                <h4 className="footer-col-title">LAINNYA</h4>
                <ul className="footer-ul">
                  <li>
                    <a href="#berita">Event Terkini</a>
                  </li>
                  <li>
                    <a href="#prestasi">Dokumentasi</a>
                  </li>
                  <li>
                    <span>Struktur Organisasi</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom-bar">
              <p>© 2026 TimHumas – SMKN 1 Bondowoso. Hak cipta dilindungi.</p>
              <div className="footer-legal-links">
                <span>Kebijakan Privasi</span>
                <span>|</span>
                <span>Syarat & Ketentuan</span>
              </div>
            </div>
          </div>
        </footer>

        <dialog ref={articleDialog} className="article-dialog" aria-labelledby="article-title" onClose={() => setArticle(null)}>
          <button className="dialog-close" onClick={() => articleDialog.current.close()}>Tutup</button>
          {article && <>
            <img src={article.image} alt="" />
            <h2 id="article-title">{article.title}</h2>
            <p>{article.excerpt}</p>
            <p className="dialog-source">Ringkasan berita. Artikel lengkap belum tersedia pada proyek ini.</p>
          </>}
        </dialog>
        {/* CHATBOT ASSISTANT */}
        <div className="chatbot-fixed-wrapper">
          {!isChatOpen ? (
            <button
              onClick={() => setIsChatOpen(true)}
              className="chatbot-launcher"
              aria-label="Buka asisten SMAKENSA"
              ref={chatLauncher}
            >
              <Bot className="bot-icon-lg" />
              <span className="online-dot"></span>
            </button>
          ) : (
            <section className="chatbot-window" aria-label="Asisten informasi SMAKENSA">
              <div className="chatbot-header">
                <div className="chatbot-header-left">
                  <div className="bot-avatar">
                    <Bot className="bot-icon-sm" />
                  </div>
                  <div>
                    <h4 className="bot-header-title">Asisten SMAKENSA</h4>
                    <p className="bot-status-text">
                      Jawaban otomatis
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { setIsChatOpen(false); requestAnimationFrame(() => chatLauncher.current?.focus()); }}
                  className="btn-close-chat"
                  aria-label="Tutup asisten"
                >
                  <X className="icon-sm" />
                </button>
              </div>

              <div className="chatbot-messages-body" ref={chatBody} role="log" aria-live="polite" aria-relevant="additions" aria-label="Percakapan">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`chat-msg-row ${msg.sender === "user" ? "user" : "bot"}`}
                  >
                    <div
                      className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="chatbot-input-form">
                <input
                  type="text"
                  aria-label="Pertanyaan untuk asisten"
                  autoFocus
                  placeholder="Tanyakan seputar SMAKENSA..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="chat-input"
                />
                <button type="submit" className="btn-send-chat" aria-label="Kirim pertanyaan">
                  <Send className="icon-sm" />
                </button>
              </form>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
export default LandingPage;