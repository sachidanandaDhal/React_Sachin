package handlers

import (
	"context"
	"errors" // Add this import for error handling
	"net/http"

	"backend/config"
	"backend/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// SaveUserData handles saving insurance data for the logged-in user.
func SaveUserData(c *gin.Context) {
	var data models.InsuranceData

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

	collection := config.Client.Database("auth_demo").Collection("insurance_data")

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

