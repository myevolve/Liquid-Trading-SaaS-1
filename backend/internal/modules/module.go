package modules

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// Module represents a pluggable component of the system
type Module interface {
	// Name returns the unique identifier of the module
	Name() string

	// Initialize sets up the module (database migrations, etc)
	Initialize(db *gorm.DB) error

	// RegisterRoutes adds the module's routes to the API
	RegisterRoutes(router fiber.Router)

	// GetAdminSettings returns the module's admin configuration settings
	GetAdminSettings() map[string]interface{}

	// UpdateAdminSettings updates the module's configuration
	UpdateAdminSettings(settings map[string]interface{}) error
}

// BaseModule provides common functionality for modules
type BaseModule struct {
	db *gorm.DB
}

// Initialize implements basic database initialization
func (m *BaseModule) Initialize(db *gorm.DB) error {
	m.db = db
	return nil
}

// GetAdminSettings returns default empty settings
func (m *BaseModule) GetAdminSettings() map[string]interface{} {
	return make(map[string]interface{})
}

// UpdateAdminSettings provides default no-op settings update
func (m *BaseModule) UpdateAdminSettings(settings map[string]interface{}) error {
	return nil
}
