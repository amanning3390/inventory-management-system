'use client'

import { useEffect, useState } from 'react'
import { StatsCard } from './stats-card'
import { 
  Package, 
  AlertTriangle, 
  Users, 
  Building2, 
  ArrowLeftRight, 
  DollarSign 
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardStats {
  totalProducts: number
  lowStockProducts: number
  totalSuppliers: number
  totalCategories: number
  recentTransactions: number
  inventoryValue: string
  totalQuantity: number
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mb-2" />
              <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load dashboard statistics</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          description="Active products in inventory"
          icon={Package}
        />
        <StatsCard
          title="Low Stock Alert"
          value={stats.lowStockProducts}
          description="Products below minimum stock"
          icon={AlertTriangle}
        />
        <StatsCard
          title="Suppliers"
          value={stats.totalSuppliers}
          description="Active supplier relationships"
          icon={Users}
        />
        <StatsCard
          title="Categories"
          value={stats.totalCategories}
          description="Product categories"
          icon={Building2}
        />
        <StatsCard
          title="Recent Transactions"
          value={stats.recentTransactions}
          description="Last 7 days"
          icon={ArrowLeftRight}
        />
        <StatsCard
          title="Inventory Value"
          value={`$${stats.inventoryValue}`}
          description="Total inventory worth"
          icon={DollarSign}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              <p>• Add new product to inventory</p>
              <p>• Record stock transaction</p>
              <p>• Generate inventory report</p>
              <p>• Manage suppliers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Database</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Connected
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Last Backup</span>
              <span className="text-xs text-gray-500">
                Today, 2:00 AM
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Items</span>
              <span className="text-xs text-gray-700">
                {stats.totalQuantity} units
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}