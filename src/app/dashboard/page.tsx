import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DashboardOverview } from '@/components/dashboard/overview'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {session.user.name}!
          </h2>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your inventory today.
          </p>
        </div>
        <DashboardOverview />
      </div>
    </DashboardLayout>
  )
}