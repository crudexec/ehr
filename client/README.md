# EHR System Frontend

React + TypeScript frontend for the Electronic Health Records Management System.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Development

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Base UI components (Button, Input, etc.)
│   │   ├── Layout.tsx   # Main layout with sidebar
│   │   └── ProtectedRoute.tsx
│   ├── contexts/        # React contexts
│   │   └── AuthContext.tsx
│   ├── pages/           # Page components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   ├── Events.tsx
│   │   └── IntakeForms.tsx
│   ├── services/        # API services
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── event.service.ts
│   │   └── intakeForm.service.ts
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
└── package.json
```

## Features

- **Authentication**: Login and registration with JWT
- **Dashboard**: Overview of events and system stats
- **User Management**: View and manage users
- **Events**: Schedule and manage appointments
- **Intake Forms**: Patient onboarding forms
- **Treatment Plans**: (Coming soon)
- **Protected Routes**: Authentication-required pages
- **Responsive Design**: Works on all devices

## API Integration

The frontend communicates with the backend API running on `http://localhost:4000/api/v1`.

All API calls are authenticated using JWT tokens stored in localStorage.

## Environment Variables

```env
VITE_API_URL=http://localhost:4000/api/v1
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## License

MIT
