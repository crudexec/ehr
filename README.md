# EHR System - Electronic Health Records Management

A comprehensive Electronic Health Records (EHR) management system built with TypeScript, Express, and SQLite.

## Features

### Core Features
- **User Management**: Complete user lifecycle management with role-based access control
- **Authentication**: Secure JWT-based authentication with password hashing
- **Medical Forms**: Support for various medical and employment forms
- **Event Scheduling**: Calendar and event management for appointments and visits
- **Document Management**: Secure document upload and storage
- **Treatment Plans**: Create and manage patient treatment plans
- **Visit Logs**: Track patient visits and session details
- **Intake Forms**: Comprehensive patient intake and onboarding

### Supported Forms
- I9 Employment Verification Forms
- Intake Forms (Patient Onboarding)
- Treatment Plans
- Visit Logs
- Specific Needs Forms
- Employee Handbook Acknowledgment

## Technology Stack

### Backend
- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Custom middleware
- **Logging**: Winston
- **Security**: Helmet, CORS

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Project Structure

```
ehr/
├── src/                     # Backend source code
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── database/
│   │   ├── entities/        # TypeORM entities
│   │   └── data-source.ts   # Database connection
│   ├── middleware/          # Express middleware
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript types
│   └── package.json
├── data/                    # SQLite database storage
├── logs/                    # Application logs
├── .env.example             # Environment variables template
├── docker-compose.yml       # Docker configuration
└── package.json             # Root package.json
```

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

No database installation required! SQLite runs as an embedded database.

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ehr
```

2. Install all dependencies (backend + frontend):
```bash
npm run install:all
```

3. Set up environment variables (optional):
```bash
# Backend environment
cp .env.example .env

# Frontend environment
cp client/.env.example client/.env
```

4. Run the application:

**Full Stack Development** (recommended):
```bash
# Runs both backend (4000) and frontend (3000) concurrently
npm run dev:full
```

**Backend Only**:
```bash
npm run dev
```

**Frontend Only**:
```bash
npm run dev:client
```

**Production Build**:
```bash
# Build both backend and frontend
npm run build

# Start production server (serves both API and static frontend)
npm start
```

The SQLite database file will be automatically created on first run.

### Accessing the Application

- **Frontend**: http://localhost:3000 (development)
- **Backend API**: http://localhost:4000/api/v1
- **Production**: http://localhost:4000 (serves both)

### Using Docker

Run the entire application stack with Docker:

```bash
# Production
docker-compose up -d

# Development
docker-compose -f docker-compose.dev.yml up -d
```

## API Documentation

### Base URL
```
http://localhost:4000/api/v1
```

### Authentication Endpoints

#### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STANDARD"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

### User Endpoints

#### List Users
```http
GET /api/v1/users?page=1&limit=10
Authorization: Bearer <token>
```

#### Get User by ID
```http
GET /api/v1/users/:id
Authorization: Bearer <token>
```

#### Update User
```http
PUT /api/v1/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "phoneNumber": "+1234567890"
}
```

### Intake Form Endpoints

#### Create Intake Form
```http
POST /api/v1/intake-forms
Authorization: Bearer <token>
Content-Type: application/json

{
  "clientName": "Client Name",
  "clientDob": "1990-01-01",
  "primaryDiagnosis": "Diagnosis here",
  "emergencyContactName": "Emergency Contact",
  "emergencyContactPhone": "+1234567890"
}
```

#### Get Intake Form
```http
GET /api/v1/intake-forms/:id
Authorization: Bearer <token>
```

### Event Endpoints

#### Create Event
```http
POST /api/v1/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Doctor Appointment",
  "description": "Annual checkup",
  "eventDate": "2024-12-01T10:00:00Z",
  "location": "Medical Center",
  "attendeeId": "user-id-here"
}
```

#### Get My Events
```http
GET /api/v1/events/my-events
Authorization: Bearer <token>
```

## Database Schema

### Core Entities

- **users**: User accounts and profiles
- **documents**: File uploads and attachments
- **employee_handbooks**: Handbook acknowledgments
- **events**: Scheduled appointments and events
- **i9_forms**: Employment verification forms
- **intake_forms**: Patient intake information
- **treatment_plans**: Treatment plan details
- **visit_logs**: Patient visit records
- **specific_needs_forms**: Special needs documentation

## Environment Variables

See `.env.example` for all available configuration options:

- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 4000)
- `DB_PATH`: Path to SQLite database file (default: database.sqlite)
- `JWT_SECRET`: Secret key for JWT tokens
- `AWS_*`: AWS S3 configuration for file uploads

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based authorization
- CORS protection
- Helmet security headers
- Input validation
- SQL injection prevention (TypeORM)
- XSS protection

## User Roles

- **ADMINISTRATOR**: Full system access
- **MANAGER**: Management capabilities
- **EMPLOYEE**: Standard employee access
- **STANDARD**: Basic user access

## Scripts

```bash
# Development
npm run dev              # Start with hot reload

# Production
npm run build            # Build TypeScript
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run typecheck        # Run TypeScript compiler

# Database
npm run migration:generate  # Generate migration
npm run migration:run       # Run migrations
npm run migration:revert    # Revert last migration
```

## Development

### Adding a New Entity

1. Create entity in `src/database/entities/`
2. Create service in `src/services/`
3. Create controller in `src/controllers/`
4. Create routes in `src/routes/`
5. Register routes in `src/routes/index.ts`

### Adding a New API Endpoint

1. Add method to controller
2. Add route in corresponding route file
3. Add middleware if needed (validation, auth)

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
