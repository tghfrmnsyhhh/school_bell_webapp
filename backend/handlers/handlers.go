package handlers

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetSettings(c *gin.Context) {
	var setting models.AppSetting
	database.DB.First(&setting, "`key` = ?", "active_mode")
	c.JSON(http.StatusOK, setting)
}

func UpdateSettings(c *gin.Context) {
	var input models.AppSetting
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Model(&models.AppSetting{}).Where("`key` = ?", "active_mode").Update("value", input.Value)
	c.JSON(http.StatusOK, gin.H{"status": "success", "active_mode": input.Value})
}

func GetSchedules(c *gin.Context) {
	var schedules []models.Schedule
	mode := c.Query("mode")
	day := c.Query("day")

	query := database.DB
	if mode != "" {
		query = query.Where("mode = ?", mode)
	}
	if day != "" {
		query = query.Where("day = ?", day)
	}

	query.Find(&schedules)
	c.JSON(http.StatusOK, schedules)
}

func CreateSchedule(c *gin.Context) {
	var schedule models.Schedule
	if err := c.ShouldBindJSON(&schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	database.DB.Create(&schedule)
	c.JSON(http.StatusOK, schedule)
}

func UpdateSchedule(c *gin.Context) {
	id := c.Param("id")
	var schedule models.Schedule

	// 1. Cek apakah ID-nya eksis di DB
	if err := database.DB.Where("id = ?", id).First(&schedule).Error; err != nil {
		c.JSON(404, gin.H{"error": "Jadwal tidak ditemukan!"})
		return
	}

	// 2. Tangkap semua data mentah JSON dari React ke dalam Map
	var body map[string]interface{}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// 3. Update isi kolomnya satu per satu langsung ke database via GORM Updates
	err := database.DB.Model(&schedule).Updates(map[string]interface{}{
		"mode":       body["mode"],
		"day":        body["day"],
		"time":       body["time"],
		"bell_type":  body["bell_type"],
		"bell_ke":    body["bell_ke"],
		"audio_file": body["audio_file"],
		"message":    body["message"],
	}).Error

	if err != nil {
		c.JSON(500, gin.H{"error": "Gagal update database"})
		return
	}

	c.JSON(200, gin.H{"status": "success", "message": "Jadwal berhasil diupdate!"})
}

func DeleteSchedule(c *gin.Context) {
	id := c.Param("id")
	database.DB.Delete(&models.Schedule{}, id)
	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Jadwal bel dihapus"})
}
