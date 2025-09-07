# Personal Portfolio Website

A full-stack personal portfolio website built with React, Node.js, and PostgreSQL. Features a modern design with project showcases, contact form, and email notifications.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Email**: SendGrid for contact form notifications
- **Development**: Vite, ESBuild, tsx

## Prerequisites

Before running this project locally, make sure you have:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (local or cloud like Neon)
- SendGrid API key (for email functionality)

## Local Development Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-website

# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio"

# SendGrid (for contact form emails)
SENDGRID_API_KEY="your_sendgrid_api_key_here"
```

### 3. Database Setup

If using local PostgreSQL:

```bash
# Create database
createdb portfolio

# Run migrations (if using Drizzle migrations)
npm run db:migrate
```

### 4. Start Development Server

```bash
# Start the development server
npm run dev
```

This will start both the frontend (Vite) and backend (Express) servers concurrently.

The application will be available at:
- Frontend: `http://localhost:3000` (or the port Vite assigns)
- Backend API: `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── lib/           # Utilities
├── server/                 # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data layer
│   └── email.ts           # Email service
├── shared/                 # Shared types/schemas
│   └── schema.ts          # Database schema
└── package.json           # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations

## Features

- Responsive design with dark/light theme
- Project portfolio with image carousel
- Contact form with email notifications
- Modern animations and smooth scrolling
- TypeScript throughout the stack
- Type-safe database operations with Drizzle ORM

## Environment Setup Notes

- The project uses in-memory storage by default for development
- For production, ensure DATABASE_URL points to your PostgreSQL instance
- SendGrid API key is required for contact form email functionality
- All assets are bundled and served from the backend in production

## Troubleshooting

- If you get TypeScript errors, run `npm run build` to check for issues
- For database connection issues, verify your DATABASE_URL format
- For email functionality, ensure your SendGrid API key is valid and has send permissions