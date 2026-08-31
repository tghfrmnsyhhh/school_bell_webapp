package database

import (
	"backend/models"
	"fmt"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	username := "root"
	password := "rplmantap123"
	host := "127.0.0.1"
	port := "3306"
	databaseName := "simpel_bell" // Pastikan schema ini sudah kamu "Create Schema" di MySQL Workbench

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, port, databaseName)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal koneksi ke database: ", err)
	}

	fmt.Println("💾 Koneksi Database Berhasil!")

	db.AutoMigrate(&models.Schedule{}, &models.AppSetting{})

	var setting models.AppSetting
	if err := db.First(&setting, "`key` = ?", "active_mode").Error; err != nil {
		db.Create(&models.AppSetting{Key: "active_mode", Value: "reguler"})
		fmt.Println("🚀 Inisialisasi default mode bel: 'reguler'")
	}

	DB = db
}
