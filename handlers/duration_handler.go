package handlers

import (
	"SFE_asynchronous_service/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetDuration(c *gin.Context) {
	// Получаем pk из запроса
	pk := c.DefaultPostForm("pk", "")

	if pk == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pk is required"})
		return
	}

	// Генерируем случайную продолжительность (1-30)
	duration := utils.GenerateRandomDuration()

	// Отправляем результат обратно в виде JSON
	c.JSON(http.StatusOK, gin.H{
		"duration": duration, // Передаем сгенерированное duration
	})
}
