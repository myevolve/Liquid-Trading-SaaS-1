# Codebase Summary

## Project Structure
```
liquid-trading/
├── frontend/               # Next.js frontend application
│   ├── app/               # App router pages
│   ├── components/        # Reusable components
│   ├── lib/              # Utility functions and hooks
│   ├── styles/           # Global styles
│   └── types/            # TypeScript types
│
├── backend/               # Go backend application
│   ├── cmd/              # Application entrypoints
│   ├── internal/         # Internal packages
│   ├── pkg/              # Public packages
│   └── api/              # API definitions
│
└── modules/              # Module system directory
    └── core/             # Core module functionality
```

## Key Components and Their Interactions

### Frontend Components
- Authentication System
  - Handles user sessions and permissions
  - Manages JWT tokens
  - Provides auth context

- Theme System
  - Manages dark theme
  - Provides theme context
  - shadcn/ui integration

- Module System
  - Module registration
  - Module rendering
  - Configuration management

### Backend Components
- API Server
  - RESTful endpoints
  - Authentication middleware
  - Request validation

- Database Layer
  - GORM models
  - Migration system
  - Query optimization

- Module Management
  - Module registration
  - Configuration handling
  - API routing

## Data Flow
1. Authentication Flow
   - User credentials → API → JWT token
   - JWT validation on protected routes
   - Role-based access control

2. Module Integration Flow
   - Module registration
   - API endpoint integration
   - Admin configuration
   - Frontend rendering

## External Dependencies
### Frontend
- Next.js
- shadcn/ui
- Tailwind CSS
- TypeScript

### Backend
- Go Fiber
- GORM
- PostgreSQL

## Recent Changes
- Initial project setup
- Documentation structure created
- Base architecture defined

## Development Status
- Setting up initial project structure
- Implementing core authentication system
- Creating module system foundation

## User Feedback Integration
- No user feedback yet
- Planning feedback collection system
- Will integrate feedback in iterative development

## Notes for Developers
- Follow modular architecture strictly
- Test all changes incrementally
- Document all configuration changes
- Use conventional commits
- Regular database backups required

## Known Issues
- None currently (new project)

## Upcoming Changes
- Initial project setup
- Authentication system implementation
- Module system development
- Admin dashboard creation