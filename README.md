# Enterprise Inventory Management System

A modern, full-stack inventory management system built with Next.js 14, TypeScript, Prisma, and NextAuth.

## Features

- 🔐 **Authentication** - Secure login with role-based access (Admin/Manager/User)
- 📦 **Product Management** - Complete CRUD operations with search and filtering
- 📊 **Real-time Dashboard** - Live statistics and inventory insights
- 🔄 **Stock Transactions** - Track IN/OUT/ADJUSTMENT movements
- 🏷️ **Category Management** - Organize products efficiently
- 🏢 **Supplier Management** - Manage supplier relationships
- ⚠️ **Low Stock Alerts** - Automatic notifications for items below minimum stock
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: Prisma ORM with SQLite (easily changeable to PostgreSQL)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Custom components following shadcn/ui patterns
- **Forms**: React Hook Form with Zod validation

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Accounts

The system comes with pre-seeded demo accounts:

- **Admin**: admin@example.com / admin123
- **Manager**: manager@example.com / user123
- **User**: user@example.com / user123

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

## API Endpoints

### Products
- `GET /api/products` - List products with search & pagination
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get product details
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Soft delete product

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create new category

### Transactions
- `GET /api/transactions` - List stock transactions
- `POST /api/transactions` - Create new transaction

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Dashboard pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth/             # Authentication components
│   └── dashboard/        # Dashboard-specific components
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Node.js:
- Railway
- Heroku
- AWS
- Google Cloud
- DigitalOcean

## Environment Variables

Required environment variables:

```env
DATABASE_URL="file:./dev.db"                    # Database connection
NEXTAUTH_URL="http://localhost:3000"            # Your domain
NEXTAUTH_SECRET="your-secret-key-here"          # JWT secret
```

For production with PostgreSQL:
```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in this repository
- Check the documentation in CLAUDE.md
- Review the API endpoints above

---

Built with ❤️ using modern web technologies