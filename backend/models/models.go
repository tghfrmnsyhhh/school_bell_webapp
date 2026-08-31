package models

import "gorm.io/gorm"

type Schedule struct {
	gorm.Model
	Mode      string `json:"mode"`
	Day       string `json:"day"`
	Time      string `json:"time"`
	BellType  string `json:"bell_type"`
	BellKe    int    `json:"bell_ke"` // 👈 TAMBAHKAN BARIS INI, BRE!
	AudioFile string `json:"audio_file"`
	Message   string `json:"message"`
}

type AppSetting struct {
	Key   string `gorm:"primaryKey;size:191" json:"key"`
	Value string `json:"value"`
}
