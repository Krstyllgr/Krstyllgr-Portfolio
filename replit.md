# Personal Portfolio Website

## Overview

This is a full-stack personal portfolio website for Kristyl Axlee Alegre, built with React, Node.js, and PostgreSQL. The application showcases projects, skills, and provides a contact form for potential clients or employers. It features a modern, responsive design with dark/light theme support and smooth animations.

## System Architecture

### Full-Stack Monorepo Structure
- **Frontend**: React with TypeScript, hosted in `/client` directory
- **Backend**: Express.js server with TypeScript, located in `/server` directory
- **Shared**: Common schemas and types in `/shared` directory
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations

### Build & Development Setup
- **Vite**: Frontend build tool with hot module replacement
- **ESBuild**: Backend bundling for production
- **Node.js 20**: Runtime environment
- **Development**: Both frontend and backend run concurrently in development mode

## Key Components

### Frontend Architecture
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom portfolio-specific color scheme
- **State Management**: TanStack Query for server state, React Context for theme
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Animations**: CSS-based fade-in animations with Intersection Observer

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Structure**: RESTful endpoints for projects and contact submissions
- **Storage**: Dual storage implementation (in-memory for development, database for production)

### Database Schema
Three main tables:
- **users**: Authentication (id, username, password)
- **projects**: Portfolio projects with metadata (title, description, category, tech stack, URLs, featured status)
- **contact_submissions**: Contact form submissions (name, email, subject, message)

## Data Flow

### Project Display Flow
1. Frontend queries `/api/projects` or `/api/projects/featured` endpoints
2. Backend retrieves data from PostgreSQL via Drizzle ORM
3. Data is cached by TanStack Query for optimal performance
4. Projects are filtered by category on the frontend

### Contact Form Flow
1. User submits contact form with validation via React Hook Form + Zod
2. Frontend sends POST request to `/api/contact`
3. Backend validates and stores submission in PostgreSQL
4. Success/error feedback displayed via toast notifications

### Theme Management
- Theme state managed via React Context
- Persisted in localStorage
- CSS custom properties for light/dark mode switching

## External Dependencies

### Key Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/react-***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight client-side routing
- **react-hook-form**: Form handling with validation
- **zod**: Schema validation

### Key Backend Libraries
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **express**: Web application framework
- **tsx**: TypeScript execution for development

### Development Tools
- **vite**: Frontend build tool and dev server
- **esbuild**: Backend bundling
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Deployment Strategy

### Production Build Process
1. Frontend builds to `dist/public` via Vite
2. Backend bundles to `dist/index.js` via ESBuild with external packages
3. Static files served from backend in production

### Environment Configuration
- **Development**: Uses tsx for hot reloading, Vite dev server
- **Production**: Compiled JavaScript with static file serving
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Replit Deployment
- **Modules**: nodejs-20, web, postgresql-16
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port Configuration**: Internal 5000 → External 80

Changelog:
- June 21, 2025. Initial setup
- June 21, 2025. Updated skills section with user's preferred technologies: React, JavaScript, React Native, Python, Git, Express, Prisma, VSCode

## User Preferences

Preferred communication style: Simple, everyday language.