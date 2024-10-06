
package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize MongoDB
	initMongoDB()

	// Initialize Gin router
	r := gin.Default()

	// Enable CORS
	r.Use(cors.Default())

	// Define routes
	r.POST("/register", register)
	r.POST("/login", login)

	// Run server
	r.Run(":5000")
}
