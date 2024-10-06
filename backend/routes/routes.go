package routes

import (
	"github.com/gin-gonic/gin"
	"backend/handlers" // Adjusted import path
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)
}
