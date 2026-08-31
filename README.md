<div align="center">

# 🔔 School Bell Web Application

### *System Management & Automation for School Bells*

[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/)
[![Go](https://img.shields.io/badge/Backend-Golang-00ADD8?style=for-the-badge\&logo=go\&logoColor=white)](https://go.dev/)
[![Vite](https://img.shields.io/badge/Build_Tool-Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Status-Active_Development-emerald?style=for-the-badge)](#)

<p>
  Aplikasi manajemen dan otomatisasi bel sekolah berbasis web full-stack.
  Dirancang dengan kontrol waktu yang presisi, fleksibilitas mode kegiatan sekolah,
  serta antarmuka yang responsif dan mudah digunakan.
</p>

</div>

---

## 📑 Daftar Isi

* [✨ Fitur Unggulan](#-fitur-unggulan)
* [🛠️ Arsitektur & Tech Stack](#️-arsitektur--tech-stack)
* [📁 Struktur Folder](#-struktur-folder)
* [🚀 Prasyarat & Instalasi](#-prasyarat--instalasi)
* [🔌 Dokumentasi API](#-dokumentasi-api)
* [🧑‍💻 Pengembang](#-pengembang)

---

## ✨ Fitur Unggulan

| Fitur                           | Deskripsi                                                                                                                              |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| 🎛️ **Multi-Mode Bel**          | Mendukung perpindahan mode jadwal secara instan seperti `REGULER`, `RAMADAN`, `UJIAN_X`, `UJIAN_XI`, dan `UJIAN_XII`.                  |
| ⏸️ **Global Bell Status**       | Menyediakan kontrol **Active / Pause** untuk menghentikan seluruh pengoperasian bel otomatis tanpa menghapus jadwal yang telah dibuat. |
| 🛑 **Audio Override & Stop**    | Tombol kontrol cepat untuk menghentikan suara bel yang sedang diputar.                                                                 |
| 📅 **Pengaturan Per Hari**      | Pengelolaan jadwal bel berdasarkan hari, mulai dari Senin hingga Minggu.                                                               |
| ⏰ **Real-Time Clock & Sync**    | Menampilkan jam digital secara real-time dan melakukan sinkronisasi data dengan backend secara berkala.                                |
| 📝 **CRUD Schedule Management** | Menyediakan fitur untuk menambah, melihat, mengubah, dan menghapus jadwal bel dengan form interaktif.                                  |
| 📱 **Responsive Interface**     | Antarmuka dirancang agar dapat digunakan dengan nyaman pada berbagai ukuran layar.                                                     |

---

## 🛠️ Arsitektur & Tech Stack

### 🎨 Frontend

| Teknologi           | Penggunaan                                        |
| :------------------ | :------------------------------------------------ |
| **React.js**        | Framework/library utama untuk membangun antarmuka |
| **Vite**            | Development server dan build tool                 |
| **JavaScript ES6+** | Bahasa pemrograman                                |
| **CSS**             | Styling dan responsive layout                     |
| **LocalStorage**    | Penyimpanan data tertentu pada sisi client        |
| **Custom Hooks**    | Pengelolaan state dan reusable logic              |

### ⚙️ Backend

| Teknologi                      | Penggunaan                                              |
| :----------------------------- | :------------------------------------------------------ |
| **Go (Golang)**                | Bahasa pemrograman backend                              |
| **REST API**                   | Komunikasi antara frontend dan backend                  |
| **JSON**                       | Format pertukaran data                                  |
| **Go Scheduler / Time Ticker** | Menjalankan bel berdasarkan waktu yang telah ditentukan |
| **JSON / SQLite**              | Media penyimpanan data                                  |

### 🔄 Arsitektur Sistem

```text
┌─────────────────────────┐
│       React Frontend    │
│                         │
│  Dashboard              │
│  Mode Selector          │
│  Schedule Management    │
│  Bell Controls          │
└────────────┬────────────┘
             │
             │ REST API / JSON
             ▼
┌─────────────────────────┐
│       Go Backend        │
│                         │
│  API Handlers           │
│  Business Logic         │
│  Scheduler Engine       │
│  Bell Controller        │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      Data Storage       │
│                         │
│     JSON / SQLite       │
└─────────────────────────┘
```

---

## 📁 Struktur Folder

```text
school_bell_webapp/
│
├── 📁 backend/
│   ├── 📁 audio/              # Asset suara bel (.mp3)
│   ├── 📁 database/           # Konfigurasi & handler database
│   ├── 📁 handlers/           # Controller & business logic API
│   ├── 📁 models/             # Struct & data models
│   ├── 📁 scheduler/          # Engine otomatisasi jadwal bel
│   └── main.go                # Entry point backend
│
├── 📁 frontend/
│   ├── 📁 public/             # Public assets
│   ├── 📁 assets/             # Gambar, logo, dan asset UI
│   └── 📁 src/
│       ├── 📁 components/     # Reusable UI components
│       ├── 📁 services/       # Integrasi REST API
│       ├── 📁 utils/          # Helper & utility functions
│       ├── App.jsx            # Main application component
│       └── main.jsx           # Entry point React
│
├── nyalain_bel.bat            # Windows startup script
└── README.md                  # Project documentation
```

---

## 🚀 Prasyarat & Instalasi

### 📌 Prasyarat Sistem

Pastikan perangkat telah memiliki software berikut:

* **Node.js** — v16.x atau terbaru
* **Go (Golang)** — v1.18 atau terbaru
* **Git** — Git CLI
* **npm** — biasanya sudah tersedia bersama Node.js

### 1️⃣ Clone Repository

```bash
git clone https://github.com/tghfrmnsyhhh/school_bell_webapp.git
cd school_bell_webapp
```

### 2️⃣ Menjalankan Backend

Masuk ke direktori backend:

```bash
cd backend
go run main.go
```

Backend akan berjalan secara default pada:

```text
http://localhost:8080
```

> Pastikan port yang digunakan sesuai dengan konfigurasi backend pada project.

### 3️⃣ Menjalankan Frontend

Buka terminal baru dan masuk ke direktori frontend:

```bash
cd frontend
```

Install dependency:

```bash
npm install
```

Kemudian jalankan development server:

```bash
npm run dev
```

Frontend biasanya dapat diakses melalui:

```text
http://localhost:5173
```

### ⚡ Menjalankan Menggunakan Windows Script

Project juga menyediakan file:

```text
nyalain_bel.bat
```

File tersebut dapat digunakan untuk membantu menjalankan aplikasi pada lingkungan Windows.

---

## 🔌 Dokumentasi API

Base URL:

```text
http://localhost:8080
```

### ⚙️ Settings

| Method | Endpoint        | Deskripsi                                                  |
| :----: | :-------------- | :--------------------------------------------------------- |
|  `GET` | `/api/settings` | Mengambil mode aktif dan status bel (`active` / `paused`). |
| `POST` | `/api/settings` | Mengubah mode atau status bel.                             |

### 📅 Schedules

|  Method  | Endpoint             | Deskripsi                            |
| :------: | :------------------- | :----------------------------------- |
|   `GET`  | `/api/schedules`     | Mengambil seluruh daftar jadwal bel. |
|  `POST`  | `/api/schedules`     | Menambahkan jadwal bel baru.         |
|   `PUT`  | `/api/schedules/:id` | Memperbarui jadwal berdasarkan ID.   |
| `DELETE` | `/api/schedules/:id` | Menghapus jadwal berdasarkan ID.     |

### 🔊 Bell Control

| Method | Endpoint         | Deskripsi                                   |
| :----: | :--------------- | :------------------------------------------ |
| `POST` | `/api/stop-bell` | Menghentikan audio bel yang sedang diputar. |

### 📌 Contoh Request

#### Mengambil Jadwal

```http
GET /api/schedules
```

#### Menambahkan Jadwal

```http
POST /api/schedules
Content-Type: application/json
```

Contoh body:

```json
{
  "day": "Monday",
  "time": "07:00",
  "mode": "REGULER"
}
```

> Struktur request dapat disesuaikan dengan model dan handler yang digunakan pada backend.

---

## 🔄 Alur Kerja Sistem

```text
User
 │
 ▼
React Dashboard
 │
 ├─── Mengatur Mode Bel
 │
 ├─── Mengatur Jadwal
 │
 └─── Mengontrol Status Bel
 │
 ▼
REST API
 │
 ▼
Go Backend
 │
 ├─── Membaca Jadwal
 │
 ├─── Mengecek Waktu
 │
 ├─── Mengecek Status Bel
 │
 └─── Menjalankan Scheduler
 │
 ▼
🔔 School Bell
```

---

## 🎯 Tujuan Project

School Bell Web Application dikembangkan untuk membantu sekolah dalam mengelola sistem bel secara **terpusat, otomatis, dan fleksibel**.

Sistem ini memungkinkan administrator untuk mengatur jadwal bel berdasarkan kebutuhan kegiatan sekolah tanpa harus melakukan pengaturan manual setiap harinya.

---

## 🧑‍💻 Pengembang

<div align="center">

### Teguh Firmansyah

**Frontend Developer | React.js | JavaScript | Web Enthusiast**

Developed with ❤️ for educational technology.

</div>

---

## 📄 License

Project ini dikembangkan untuk kebutuhan **internal/edukasi dan pengembangan sistem sekolah di SMK Perguruan CIKINI**.
