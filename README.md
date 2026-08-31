```yaml
# ==============================================================================
# SCHOOL BELL WEB APPLICATION (CONFIG & DOCUMENTATION)
# ==============================================================================

PROJECT_INFO:
  name: "School Bell Web Application"
  version: "1.0.0"
  developer: "Teguh Firmansyah"
  github: "[https://github.com/tghfrmnsyhhh](https://github.com/tghfrmnsyhhh)"
  role: "Frontend Developer | React.js | Go Enthusiast"
  status: "PRODUCTION_READY"

# ------------------------------------------------------------------------------
# TECH STACK & ENGINE ARCHITECTURE
# ------------------------------------------------------------------------------
STACK:
  frontend:
    framework: "React.js (Vite)"
    language: "JavaScript (ES6+)"
    ui_styling: "Modern CSS / Flexbox & Grid"
    state_sync: "React Hooks + LocalStorage Persistence"
  backend:
    language: "Go (Golang)"
    architecture: "RESTful JSON API Engine"
    scheduler: "Native Go Time Ticker / Cron Module"
    audio_player: "Native System Audio Executor"

# ------------------------------------------------------------------------------
# CORE SYSTEM FEATURES
# ------------------------------------------------------------------------------
FEATURES:
  - 🎛️ MULTI_MODE      : [REGULER, RAMADAN, UJIAN_X, UJIAN_XI, UJIAN_XII]
  - ⏸️ GLOBAL_PAUSE    : Hentikan eksekusi bel otomatis tanpa menghapus data
  - 🛑 AUDIO_OVERRIDE  : Stop suara bel yang sedang berputar secara instant
  - 📅 DAY_TAB_SYNC    : Manajemen & pemisahan jadwal bel dari Senin - Minggu
  - ⏰ REALTIME_CLOCK   : Digital clock presisi tinggi + auto-refresh backend (15s)

# ------------------------------------------------------------------------------
# DIRECTORY TREE
# ------------------------------------------------------------------------------
REPOSITORY_TREE: |
  school_bell_webapp/
  ├── backend/
  │   ├── audio/           # Asset suara bel (.mp3)
  │   ├── database/        # Handler penyimpanan data
  │   ├── handlers/        # Logic controller API
  │   ├── models/          # Struct schema data Go
  │   ├── scheduler/       # Cron engine pemutar bel
  │   └── main.go          # Entrypoint server backend
  ├── frontend/
  │   ├── public/assets/   # Asset gambar & logo
  │   └── src/
  │       ├── components/  # Header, ModeSelector, Table, Form
  │       ├── services/    # Integration layer API (Axios)
  │       ├── utils/       # Helper functions
  │       ├── App.jsx      # Core UI Application Component
  │       └── main.jsx     # Entrypoint React Vite
  ├── nyalain_bel.bat      # One-click Windows starter script
  └── README.md            # Dokumentasi project

# ------------------------------------------------------------------------------
# INITIALIZATION & RUN GUIDE
# ------------------------------------------------------------------------------
GETTING_STARTED:
  step_1_clone:
    cmd: "git clone [https://github.com/tghfrmnsyhhh/school_bell_webapp.git](https://github.com/tghfrmnsyhhh/school_bell_webapp.git)"
    path: "cd school_bell_webapp"

  step_2_start_backend:
    path: "cd backend"
    cmd: "go run main.go"
    output_port: "http://localhost:8080"

  step_3_start_frontend:
    path: "cd frontend"
    cmd_install: "npm install"
    cmd_run: "npm run dev"
    output_port: "http://localhost:5173"

# ------------------------------------------------------------------------------
# 🔌 REST API ENDPOINTS SPECIFICATION
# ------------------------------------------------------------------------------
API_ENDPOINTS:
  - GET    /api/settings     # Ambil mode aktif & status bel
  - POST   /api/settings     # Update mode aktif / toggle pause bel
  - GET    /api/schedules    # Ambil daftar seluruh jadwal
  - POST   /api/schedules    # Tambah jadwal bel baru
  - PUT    /api/schedules/:id # Edit jadwal bel berdasarkan ID
  - DELETE /api/schedules/:id # Hapus jadwal bel berdasarkan ID
  - POST   /api/stop-bell    # Hentikan pemutaran audio bel

# ==============================================================================
# END OF CONFIG FILE — Built with ❤️ by Teguh Firmansyah
# ==============================================================================