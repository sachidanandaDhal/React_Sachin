package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

var Client *mongo.Client

// Initialize MongoDB connection
func InitMongoDB() {
	var err error
	Client, err = mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = Client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
}

// User model
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// InsuranceData model
type InsuranceData struct {
	ID            string `json:"id,omitempty" bson:"_id,omitempty"`
	UserID        string `json:"userId" bson:"userId"`
	Name          string `json:"name" bson:"name"`
	Mobile        string `json:"mobile" bson:"mobile"`
	Email         string `json:"email" bson:"email"`
	Date          string `json:"date" bson:"date"`
	InsuranceType string `json:"insuranceType" bson:"insuranceType"`
	RenewalType   string `json:"renewalType" bson:"renewalType"`
	VehicleType   string `json:"vehicleType" bson:"vehicleType"`
	VehicleRegNo  string `json:"vehicleRegNo" bson:"vehicleRegNo"`
	VehicleDate   string `json:"vehicleDate" bson:"vehicleDate"`
	MakeModel     string `json:"makeModel" bson:"makeModel"`
	PremiumAmount string `json:"premiumAmount" bson:"premiumAmount"`
	PaymentMode   string `json:"paymentMode" bson:"paymentMode"`
	AgentName     string `json:"agentName" bson:"agentName"`
	AgentContact  string `json:"agentContact" bson:"agentContact"`
	AgentEmail    string `json:"agentEmail" bson:"agentEmail"`
}

func main() {
	InitMongoDB()
	r := gin.Default()

	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},                   // Allow your frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, // Allowed methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // Allow Authorization
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Set up routes
	r.POST("/register", Register)
	r.POST("/login", Login)
	r.POST("/saveUserData", SaveUserData)
	r.GET("/getUserData", GetUserData)

	if err := r.Run(":5000"); err != nil {
		log.Fatal("Server run failed:", err)
	}
}

// Register handles user registration and returns a structured JSON response.
func Register(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to hash password",
		})
		return
	}

	collection := Client.Database("auth_demo").Collection("users")
	_, err = collection.InsertOne(context.Background(), bson.M{
		"username": user.Username,
		"password": string(hashedPassword),
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to register user",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Registration successful",
	})
}

// Login function to authenticate the user and return a JWT token with a structured JSON response.
func Login(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	collection := Client.Database("auth_demo").Collection("users")
	var foundUser User
	err := collection.FindOne(context.Background(), bson.M{"username": user.Username}).Decode(&foundUser)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"error":   "Invalid credentials",
		})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(user.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"error":   "Invalid credentials",
		})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to generate token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"token":   tokenString,
	})
}

// SaveUserData handles saving insurance data for the logged-in user.
func SaveUserData(c *gin.Context) {
	var data InsuranceData

	userID, err := ExtractUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"error":   "Unauthorized",
		})
		return
	}

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   err.Error(),
		})
		return
	}

	data.UserID = userID

	collection := Client.Database("auth_demo").Collection("insurance_data")

	insertResult, err := collection.InsertOne(context.Background(), data)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Error saving data",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":    true,
		"message":    "Data saved successfully",
		"insertedId": insertResult.InsertedID,
	})
}

// ExtractUserIDFromToken extracts User ID from JWT token.
func ExtractUserIDFromToken(c *gin.Context) (string, error) {
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		return "", errors.New("no token provided")
	}

	if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
		tokenString = tokenString[7:]
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	if err != nil || !token.Valid {
		return "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return "", errors.New("invalid token")
	}

	return claims["username"].(string), nil
}

func GetUserData(c *gin.Context) {
    userID, err := ExtractUserIDFromToken(c)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{
            "success": false,
            "error":   "Unauthorized",
        })
        return
    }

    collection := Client.Database("auth_demo").Collection("insurance_data")

    cursor, err := collection.Find(context.Background(), bson.M{"userId": userID})
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "success": false,
            "error":   "Error retrieving data",
        })
        return
    }
    defer cursor.Close(context.Background())

    var results []InsuranceData
    for cursor.Next(context.Background()) {
        var data InsuranceData
        if err := cursor.Decode(&data); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "success": false,
                "error":   "Error decoding data",
            })
            return
        }
        results = append(results, data)
    }

    c.JSON(http.StatusOK, gin.H{
        "success": true,
        "data":    results,
    })
}
