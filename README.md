# Binary Baseline Frontend

This is the frontend application for Binary Baseline - an automated trading platform for binary options.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` and proxy API requests to the backend at `http://localhost:5000`.

## Development

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: wouter for client-side navigation
- **Build Tool**: Vite

## API Integration

The frontend communicates with the backend through these API endpoints:
- `/api/auth/*` - Authentication
- `/api/admin/*` - Admin functions
- `/api/downloads/*` - Download management
- `/api/payments/*` - Payment processing

## Building for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.