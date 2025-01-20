package handlers

import (
	"SFE_asynchronous_service/utils"
	"net/http"

	"log"

	"github.com/gin-gonic/gin"
)

func SetDuration(c *gin.Context) {
	// Получаем pk из запроса
	pk := c.DefaultPostForm("pk", "")

	if pk == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pk is required"})
		return
	}

	durationChan := make(chan int)

	go func() {

		duration := utils.GenerateRandomDuration()

		log.Printf("Generated duration for pk %s: %d", pk, duration)

		durationChan <- duration

	}()

	duration := <-durationChan

	// Отправляем результат обратно в виде JSON
	c.JSON(http.StatusOK, gin.H{
		"duration": duration, // Передаем сгенерированное duration
	})
}
