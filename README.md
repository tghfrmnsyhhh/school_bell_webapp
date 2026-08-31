div align="center">

# 🔔 School Bell Web Application
### *System Management & Automation for School Bells*

[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Go](https://img.shields.io/badge/Backend-Golang-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org/)
[![Vite](https://img.shields.io/badge/Build_Tool-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-Active_Development-emerald?style=for-the-badge)](#)

<p align="center">
  Aplikasi manajemen dan otomatisasi bel sekolah berbasis web full-stack. Dirancang dengan kontrol waktu presisi, fleksibilitas mode kegiatan sekolah, dan antarmuka responsif.
</p>

---

</div>

## 📑 Daftar Isi

- [Fitur Unggulan](#-fitur-unggulan)
- [Arsitektur & Tech Stack](#-arsitektur--tech-stack)
- [Struktur Folder](#-struktur-folder)
- [Prasyarat & Instalasi](#-prasyarat--instalasi)
- [Dokumentasi API](#-dokumentasi-api)
- [Pengembang](#-pengembang)

---

## ✨ Fitur Unggulan

| Fitur | Deskripsi |
| :--- | :--- |
| 🎛 **Multi-Mode Bel** | Mendukung perpindahan mode jadwal secara instan: `REGULER`, `RAMADAN`, `UJIAN_X`, `UJIAN_XI`, dan `UJIAN_XII`. |
| ⏸ **Global Bell Status** | Fitur **Pause/Active** untuk menghentikan seluruh pengoperasian bel otomatis sewaktu-waktu tanpa menghapus jadwal. |
| 🛑 **Audio Override & Stop** | Tombol kontrol cepat untuk menghentikan suara bel yang sedang berputar di area sekolah. |
| 📅 **Pengaturan Per Hari** | Visualisasi dan manajemen jadwal bel terpisah dari Hari Senin hingga Minggu. |
| ⏰ **Real-time Clock & Sync** | Sinkronisasi jam digital presisi tinggi dan otomatis memperbarui data dari backend secara berkala. |
| 📝 **CRUD Schedule Management** | Pengisian form jadwal interaktif dengan fitur auto-scroll untuk pengeditan data. |

---

## 🛠 Arsitektur & Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Modern Clean CSS & Responsive Grid
- **Utilities**: JavaScript ES6+, Custom Hooks, LocalStorage Persistence

### Backend
- **Language**: Go (Golang)
- **API Standard**: RESTful JSON API
- **Scheduler**: Native Go Cron / Time Ticker Engine
- **Storage**: JSON File / SQLite Database Engine

---

## 📁 Struktur Folder

```text
bel/
├── 📁 backend/             # Source code server Go
│   ├── 📁 audio/           # Asset file suara (.mp3)
│   ├── 📁 database/        # Konfigurasi & handler data
│   ├── 📁 handlers/        # Business logic & controller API
│   ├── 📁 models/          # Struct & schema data
│   ├── 📁 scheduler/       # Engine otomatisasi waktu bel
│   └── main.go             # Entrypoint server Go
├── 📁 frontend/            # Source code UI React
│   ├── 📁 public/ & assets/# Asset gambar & logo
│   └── 📁 src/
│       ├── 📁 components/  # Header, ModeSelector, ScheduleTable, dsb.
│       ├── 📁 services/    # Integration layer API
│       ├── 📁 utils/       # Helper functions
│       ├── App.jsx         # Main App Component
│       └── main.jsx        # Entrypoint React
├── nyalain_bel.bat         # One-click startup script (Windows)
└── README.md               # Dokumentasi project
🚀 Prasyarat & Instalasi📌 Prasyarat SistemSebelum menjalankan project ini, pastikan komputer Anda telah terinstall:Node.js (v16.x atau terbaru)Go (Golang) (v1.18 atau terbaru)Git CLI🛠 Panduan Instalasi & Penggunaan1. Clone RepositoryBashgit clone [https://github.com/tghfrmnsyhhh/school_bell_webapp.git](https://github.com/tghfrmnsyhhh/school_bell_webapp.git)
cd school_bell_webapp
2. Jalankan Backend (Go)Bashcd backend
go run main.go
Server backend akan berjalan secara default di http://localhost:8080 (atau port yang terkonfigurasi).3. Jalankan Frontend (React)Buka terminal baru di direktori root project:Bashcd frontend
npm install
npm run dev
🔌 Dokumentasi APIMethodEndpointDeskripsiGET/api/settingsMengambil setting mode aktif & status bel (active/paused).POST/api/settingsMengubah setting mode atau status bel.GET/api/schedulesMengambil seluruh daftar jadwal bel.POST/api/schedulesMenambahkan jadwal bel baru.PUT/api/schedules/:idMemperbarui jadwal bel berdasarkan ID.DELETE/api/schedules/:idMenghapus jadwal bel berdasarkan ID.POST/api/stop-bellMenghentikan audio bel yang sedang diputar.🧑‍💻 PengembangDeveloped with ❤️ by Teguh FirmansyahFrontend Developer | React.js | JavaScript | Web Enthusiast