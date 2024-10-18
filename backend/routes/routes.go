package routes

import (
	"backend/handlers" // Adjusted import path

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)
	r.POST("/save-user-data", handlers.SaveUserData)
}
