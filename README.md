# Liquid Trading SaaS Platform

A modular SaaS platform for crypto trading with Next.js frontend and Go backend.

## Project Structure

```
liquid-trading/
├── frontend/               # Next.js frontend application
│   ├── app/               # App router pages
│   ├── components/        # Reusable components
│   ├── lib/              # Utility functions
│   └── public/           # Static assets
│
├── backend/               # Go backend application
│   ├── cmd/              # Application entrypoints
│   ├── internal/         # Internal packages
│   │   ├── auth/        # Authentication
│   │   ├── config/      # Configuration
│   │   ├── models/      # Database models
│   │   └── modules/     # Module system
│   └── pkg/             # Public packages
│
└── cline_docs/           # Project documentation
```

## Features

- Next.js 14 frontend with TypeScript
- shadcn/ui components with dark theme
- Go backend with Fiber framework
- PostgreSQL database with GORM
- JWT authentication
- Role-based access control (Admin/User)
- Modular architecture for extensibility
- Admin user management
- Auto-approval configuration

## Prerequisites

- Node.js 18+
- Go 1.21+
- PostgreSQL 15+

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:3000

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

3. Update the .env file with your configuration

4. Install Go dependencies:
   ```bash
   go mod tidy
   ```

5. Start the server:
   ```bash
   go run cmd/api/main.go
   ```

The API will be available at http://localhost:8080

## Module Development

The platform supports a modular architecture where new features can be added as modules:

1. Each module implements the Module interface
2. Modules can have their own admin settings
3. Modules are loaded dynamically
4. Sub-modules can extend existing modules

See the module documentation for more details on creating new modules.

## Documentation

- Project documentation is available in the `cline_docs` directory
- API documentation is available at `/api/docs` when running the backend
- Frontend component documentation is available in the components directory

## Contributing

1. Create a new branch for your feature
2. Follow the existing code style
3. Write tests for new features
4. Submit a pull request

## License

MIT