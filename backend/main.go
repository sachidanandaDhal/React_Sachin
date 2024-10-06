package main
import (
	"log"

	"backend/config" // Adjusted import path
	"backend/routes" // Adjusted import path

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.InitMongoDB()
	r := gin.Default()

	// Enable CORS for all routes
	r.Use(cors.Default())

	// Set up routes
	routes.SetupRoutes(r)

	if err := r.Run(":5000"); err != nil {
		log.Fatal("Server run failed:", err)
	}
}
