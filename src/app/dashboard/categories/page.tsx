import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function CategoriesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
          <p className="text-gray-600">
            Organize products into categories
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Category Management</CardTitle>
            <CardDescription>
              Manage product categories and organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Category management features will be implemented in the inventory management step.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}