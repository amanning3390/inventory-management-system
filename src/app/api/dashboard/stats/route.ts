import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [
      totalProducts,
      lowStockProducts,
      totalSuppliers,
      totalCategories,
      recentTransactions,
      totalInventoryValue
    ] = await Promise.all([
      prisma.product.count({ where: { isActive: true } }),
      prisma.$queryRaw`
        SELECT COUNT(*) as count FROM products 
        WHERE isActive = 1 AND quantity <= minStock
      `.then((result: any) => Number(result[0]?.count || 0)),
      prisma.supplier.count(),
      prisma.category.count(),
      prisma.transaction.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      }),
      prisma.product.aggregate({
        where: { isActive: true },
        _sum: {
          quantity: true
        }
      })
    ])

    // Calculate inventory value (quantity * cost)
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { quantity: true, cost: true }
    })
    
    const inventoryValue = products.reduce((total, product) => {
      return total + (product.quantity * product.cost)
    }, 0)

    const stats = {
      totalProducts,
      lowStockProducts,
      totalSuppliers,
      totalCategories,
      recentTransactions,
      inventoryValue: inventoryValue.toFixed(2),
      totalQuantity: totalInventoryValue._sum.quantity || 0
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}