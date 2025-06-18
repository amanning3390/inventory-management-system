import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold mb-8">
          Inventory Management System
        </h1>
        <p className="text-muted-foreground mb-8">
          Enterprise Material and Inventory Management System
        </p>
        <div className="space-y-4">
          <Link href="/auth/signin">
            <Button size="lg">
              Sign In to Dashboard
            </Button>
          </Link>
          <div className="text-sm text-gray-600">
            <p><strong>Demo Accounts:</strong></p>
            <p>Admin: admin@example.com / admin123</p>
            <p>Manager: manager@example.com / user123</p>
            <p>User: user@example.com / user123</p>
          </div>
        </div>
      </div>
    </main>
  )
}