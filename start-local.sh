#!/bin/bash

echo "🚀 Starting Enterprise Inventory Management System Locally"
echo "================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚙️ Setting up environment variables..."
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
    echo ""
fi

# Check if database exists
if [ ! -f "prisma/dev.db" ]; then
    echo "🗄️ Setting up database..."
    npm run db:generate
    npm run db:push
    npm run db:seed
    echo ""
fi

echo "🌟 Demo Accounts Available:"
echo "  👑 Admin:   admin@example.com   / admin123"
echo "  👨‍💼 Manager: manager@example.com / user123"
echo "  👤 User:    user@example.com    / user123"
echo ""

echo "🚀 Starting development server..."
echo "📱 Application will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================="

npm run dev