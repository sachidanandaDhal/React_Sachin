// package main

// import (
// 	"log"

// 	"backend/config" // Adjusted import path
// 	"backend/routes" // Adjusted import path

// 	"github.com/gin-contrib/cors"
// 	"github.com/gin-gonic/gin"
// )

// func main() {
// 	config.InitMongoDB()
// 	r := gin.Default()

// 	// Enable CORS for all routes
// 	r.Use(cors.Default())

// 	// Set up routes
// 	routes.SetupRoutes(r)

// 	if err := r.Run(":5000"); err != nil {
// 		log.Fatal("Server run failed:", err)
// 	}
// }

package main

import (
    "log"
    "time"

    "backend/config" // Adjusted import path
    "backend/routes" // Adjusted import path

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func main() {
    config.InitMongoDB()
    r := gin.Default()

    // CORS configuration
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"}, // Allow your frontend
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, // Allowed methods
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // Allow Authorization
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge: 12 * time.Hour,
    }))

    // Set up routes
    routes.SetupRoutes(r)

    if err := r.Run(":5000"); err != nil {
        log.Fatal("Server run failed:", err)
    }
}
