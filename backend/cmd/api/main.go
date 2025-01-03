package main

import (
	"log"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/myevolve/liquid-trading/internal/auth"
	"github.com/myevolve/liquid-trading/internal/config"
	"github.com/myevolve/liquid-trading/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Initialize database
	dsn := "host=" + cfg.DBConfig.Host +
		" user=" + cfg.DBConfig.User +
		" password=" + cfg.DBConfig.Password +
		" dbname=" + cfg.DBConfig.DBName +
		" port=" + cfg.DBConfig.Port +
		" sslmode=" + cfg.DBConfig.SSLMode

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Auto migrate models
	if err := db.AutoMigrate(
		&models.User{},
		&models.UserSettings{},
		&models.AdminSettings{},
	); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	// Create Fiber app
	app := fiber.New(fiber.Config{
		AppName: "Liquid Trading API",
	})

	// Middleware
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: strings.Join(cfg.CorsOrigins, ","),
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
	}))

	// API routes
	api := app.Group("/api")

	// Auth routes
	authHandler := auth.NewAuthHandler(db, cfg.JWTSecret)
	authHandler.RegisterRoutes(api)

	// Protected routes
	protected := api.Group("/")
	protected.Use(auth.AuthMiddleware(cfg.JWTSecret))

	// Admin routes
	admin := protected.Group("/admin")
	admin.Use(auth.AdminMiddleware())

	// Admin user management routes
	admin.Get("/users", func(c *fiber.Ctx) error {
		var users []models.User
		if err := db.Find(&users).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to fetch users",
			})
		}
		return c.JSON(users)
	})

	admin.Put("/users/:id/approve", func(c *fiber.Ctx) error {
		id := c.Params("id")
		if err := db.Model(&models.User{}).Where("id = ?", id).Updates(map[string]interface{}{
			"approved": true,
			"active":   true,
		}).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to approve user",
			})
		}
		return c.JSON(fiber.Map{"message": "User approved"})
	})

	admin.Put("/users/:id/freeze", func(c *fiber.Ctx) error {
		id := c.Params("id")
		var active bool
		if err := c.BodyParser(&fiber.Map{"active": &active}); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid input",
			})
		}

		if err := db.Model(&models.User{}).Where("id = ?", id).Update("active", active).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to update user status",
			})
		}
		return c.JSON(fiber.Map{"message": "User status updated"})
	})

	admin.Put("/settings/auto-approve", func(c *fiber.Ctx) error {
		var enabled bool
		if err := c.BodyParser(&fiber.Map{"enabled": &enabled}); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid input",
			})
		}

		setting := models.AdminSettings{
			Key:         "auto_approve_users",
			Value:       models.JSON{"enabled": enabled},
			Description: "Automatically approve new user registrations",
			ModuleName:  "auth",
		}

		if err := db.Where("key = ?", setting.Key).
			Assign(setting).
			FirstOrCreate(&setting).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to update setting",
			})
		}

		return c.JSON(setting)
	})

	// Health check
	api.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  "ok",
			"version": "1.0.0",
		})
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := app.Listen(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
