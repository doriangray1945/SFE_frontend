package utils

import (
	"math/rand"
	"time"
)

// GenerateRandomDuration генерирует случайное число от 1 до 30
func GenerateRandomDuration() int {
	time.Sleep(5 * time.Second)
	rand.Seed(time.Now().UnixNano()) // Инициализируем генератор случайных чисел
	return rand.Intn(30) + 1         // Возвращаем число от 1 до 30
}
