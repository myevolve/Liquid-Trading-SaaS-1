package config

import (
	"os"
	"strings"
)

type Config struct {
	Port        string
	CorsOrigins []string
	JWTSecret   string
	DBConfig    DatabaseConfig
}

type DatabaseConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

func Load() (*Config, error) {
	config := &Config{
		Port: getEnv("PORT", "8080"),
		CorsOrigins: strings.Split(
			getEnv("CORS_ORIGINS", "http://localhost:3000"),
			",",
		),
		JWTSecret: getEnv("JWT_SECRET", "your-secret-key"),
		DBConfig: DatabaseConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "5432"),
			User:     getEnv("DB_USER", "postgres"),
			Password: getEnv("DB_PASSWORD", "postgres"),
			DBName:   getEnv("DB_NAME", "liquid_trading"),
			SSLMode:  getEnv("DB_SSL_MODE", "disable"),
		},
	}

	return config, nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
