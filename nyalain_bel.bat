@echo off
title STARTING SIMPEL BELL AUTOMATION

:: 1. Jalankan Backend Go di background
cd /d D:\bel\backend
start /b go run main.go

:: 2. Jalankan Frontend Vite di background
cd /d D:\bel\frontend
start /b npm run dev

echo Menunggu server Frontend & Backend siap...
:: Jeda 5 detik agar Vite & Go siap menerima koneksi
timeout /t 5 /nobreak > nul

:: 3. Buka browser otomatis ke alamat frontend
echo Membuka SIMPEL Bell di browser...
start http://localhost:5173

echo 🔔 Bel Sekolah sudah aktif!