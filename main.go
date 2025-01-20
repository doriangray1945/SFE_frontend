package main

import (
	"SFE_asynchronous_service/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	// Создаем новый роутер
	r := gin.Default()

	// Регистрация маршрута для запроса /set_duration
	r.POST("/set_duration", handlers.SetDuration)

	// Запуск сервера
	r.Run(":8081")
}
