package main

import (
	"backend/database"
	"backend/handlers"
	"backend/scheduler"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.InitDB()
	scheduler.StartScheduler()

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	api := r.Group("/api")
	{
		api.GET("/settings", handlers.GetSettings)
		api.POST("/settings", handlers.UpdateSettings)
		api.GET("/schedules", handlers.GetSchedules)
		api.POST("/schedules", handlers.CreateSchedule)
		api.DELETE("/schedules/:id", handlers.DeleteSchedule)
		api.PUT("/schedules/:id", handlers.UpdateSchedule)

		// Stop Audio Bel Darurat
		api.POST("/stop-bell", func(c *gin.Context) {
			scheduler.StopAudio()
			c.JSON(http.StatusOK, gin.H{
				"status":  "success",
				"message": "Suara bel berhasil dihentikan",
			})
		})
	}

	r.Run(":8080")
}
