# Binary Baseline Frontend - Deployment Guide

## Quick Start

This is a standalone React frontend for Binary Baseline trading platform.

### Local Development
```bash
npm install
npm run dev
```

### Deploy to Vercel
1. Push this directory to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Environment Variables (Vercel)
```
VITE_API_URL=https://your-backend-url.com
```

### Backend Integration
Update `vercel.json` with your backend URL:
```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://your-backend-url.com/api/$1"
    }
  ]
}
```

## Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── lib/           # Utilities and configurations
├── hooks/         # Custom React hooks
└── data/          # Static data and constants

public/            # Static assets and downloads
shared/            # Shared types with backend
```

## Features Included
- User authentication (email + Google OAuth)
- Admin dashboard and management
- Payment processing (Stripe)
- File downloads and license management
- Trading strategy analytics
- Responsive design with Tailwind CSS

## Admin Access
- Email: mpalulis@msn.com
- Password: admin123

Ready for production deployment!