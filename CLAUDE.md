# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Enterprise Material and Inventory Management System built with Next.js 14, TypeScript, Prisma, and NextAuth for authentication.

## Development Commands

### Core Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### Database Operations
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with initial data

### Testing
- `npm test` - Run Jest tests
- `npm test:watch` - Run tests in watch mode

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: Prisma ORM
- **Authentication**: NextAuth.js with Prisma adapter
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Lucide React icons, React Select
- **Data Visualization**: Recharts
- **PDF Generation**: jsPDF
- **Testing**: Jest with React Testing Library

## Current Implementation Status

### ✅ Completed Features
- **Authentication System** - NextAuth with role-based access (Admin/Manager/User)
- **Database** - Complete schema with Users, Products, Categories, Suppliers, Transactions
- **Dashboard** - Professional layout with navigation, stats, and overview
- **Product Management** - Full CRUD API with search, filtering, pagination
- **Transaction System** - Stock movements (IN/OUT/ADJUSTMENT) with automatic quantity updates
- **UI Components** - Modern components using Tailwind CSS and shadcn/ui patterns

### 🔄 Demo Accounts
- **Admin**: admin@example.com / admin123
- **Manager**: manager@example.com / user123  
- **User**: user@example.com / user123

### 📊 API Endpoints Available
- `GET/POST /api/products` - Product management with search & pagination
- `GET/PUT/DELETE /api/products/[id]` - Individual product operations
- `GET/POST /api/categories` - Category management
- `GET/POST /api/transactions` - Stock transaction processing
- `GET /api/dashboard/stats` - Real-time dashboard statistics

## Important Notes

- Always run `npm run typecheck` and `npm run lint` before committing changes
- Database schema changes require running `npm run db:generate` after modifying Prisma schema
- Use `npm run db:studio` to inspect database contents during development
- The system uses SQLite for development - easily changeable to PostgreSQL for production