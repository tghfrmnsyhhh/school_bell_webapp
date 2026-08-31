package scheduler

import (
	"backend/database"
	"backend/models"
	"fmt"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/gopxl/beep"
	"github.com/gopxl/beep/mp3"
	"github.com/gopxl/beep/speaker"
)

var (
	lastTriggeredMinute string
	currentCtrl         *beep.Ctrl // Variable global untuk kontrol audio
	audioMutex          sync.Mutex // Mutex untuk keamanan konkurensi (thread-safe)
)

func StartScheduler() {
	ticker := time.NewTicker(1 * time.Second)
	go func() {
		fmt.Println("⏰ Scheduler Bel Sekolah SIMPEL telah aktif...")
		for range ticker.C {
			checkAndTriggerBell()
		}
	}()
}

func checkAndTriggerBell() {
	loc, err := time.LoadLocation("Asia/Jakarta")
	if err != nil {
		loc = time.Local
	}

	now := time.Now().In(loc)
	currentFormatTime := now.Format("15:04")

	daysIndo := map[string]string{
		"Monday": "Senin", "Tuesday": "Selasa", "Wednesday": "Rabu",
		"Thursday": "Kamis", "Friday": "Jumat", "Saturday": "Sabtu", "Sunday": "Minggu",
	}
	currentDayIndo := daysIndo[now.Weekday().String()]

	// 1. Cek mode aktif
	var setting models.AppSetting
	if err := database.DB.First(&setting, "`key` = ?", "active_mode").Error; err != nil {
		return
	}

	// 2. Cek status pause bel
	var statusSetting models.AppSetting
	if err := database.DB.First(&statusSetting, "`key` = ?", "bell_status").Error; err == nil {
		if statusSetting.Value == "paused" {
			return
		}
	}

	// 3. Cari jadwal bel di database
	var matchedSchedule models.Schedule
	err = database.DB.Where("mode = ? AND day = ? AND time = ?", setting.Value, currentDayIndo, currentFormatTime).First(&matchedSchedule).Error

	if err == nil {
		if currentFormatTime == lastTriggeredMinute {
			return
		}

		lastTriggeredMinute = currentFormatTime

		fmt.Printf("\n📢 [BEL BERBUNYI] Memutar: %s | Jenis: %s | Keterangan: %s\n", matchedSchedule.AudioFile, matchedSchedule.BellType, matchedSchedule.Message)

		go playAudio(matchedSchedule.AudioFile, matchedSchedule.BellType)
	}
}

func playAudio(fileName string, bellType string) {
	audioPath := filepath.Join("audio", fileName)

	if _, err := os.Stat(audioPath); os.IsNotExist(err) {
		fmt.Printf("❌ ERROR: File %s TIDAK DITEMUKAN di folder backend/audio/\n", fileName)
		return
	}

	f, err := os.Open(audioPath)
	if err != nil {
		fmt.Println("❌ ERROR saat membuka file:", err)
		return
	}

	streamer, format, err := mp3.Decode(f)
	if err != nil {
		fmt.Println("❌ ERROR saat decode MP3:", err)
		f.Close()
		return
	}

	_ = speaker.Init(format.SampleRate, format.SampleRate.N(time.Second/10))

	var finalStreamer beep.Streamer
	if bellType == "masuk" || bellType == "istirahat" || bellType == "pulang" {
		fmt.Println("🔁 Mengaktifkan mode looping untuk jenis bel:", bellType)
		finalStreamer = beep.Loop(2, streamer)
	} else {
		finalStreamer = streamer
	}

	// Hentikan audio sebelumnya jika masih ada yang berjalan
	StopAudio()

	audioMutex.Lock()
	// Gunakan beep.Ctrl untuk membungkus streamer agar bisa di-pause/stop sewaktu-waktu
	currentCtrl = &beep.Ctrl{Streamer: finalStreamer, Paused: false}
	audioMutex.Unlock()

	fmt.Println("🎵 Speaker mulai memutar suara...")
	done := make(chan bool)

	speaker.Play(beep.Seq(currentCtrl, beep.Callback(func() {
		done <- true
	})))

	<-done
	streamer.Close()
	f.Close()

	audioMutex.Lock()
	currentCtrl = nil
	audioMutex.Unlock()

	fmt.Println("✅ Audio selesai diputar total / dihentikan, file closed.")
}

// 🚨 FUNGSI BARU: Dipanggil oleh API Endpoint Stop Audio
func StopAudio() {
	audioMutex.Lock()
	defer audioMutex.Unlock()

	if currentCtrl != nil {
		speaker.Lock()
		currentCtrl.Paused = true // Mematikan audio yang sedang diputar secara instan
		speaker.Unlock()
		currentCtrl = nil
		fmt.Println("🛑 Audio bel berhasil dihentikan secara paksa!")
	}
}
