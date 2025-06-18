'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react'
import { format } from 'date-fns'

interface Transaction {
  id: string
  type: string
  quantity: number
  unitPrice: number
  totalPrice: number
  reference?: string
  description?: string
  createdAt: string
  product: {
    name: string
    sku: string
  }
  user: {
    name: string
    email: string
  }
}

interface TransactionListResponse {
  transactions: Transaction[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })

  const fetchTransactions = async (page = 1) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      })

      const response = await fetch(`/api/transactions?${params}`)
      if (response.ok) {
        const data: TransactionListResponse = await response.json()
        setTransactions(data.transactions)
        setPagination(data.pagination)
        setCurrentPage(page)
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'IN':
        return <ArrowUp className="w-4 h-4 text-green-600" />
      case 'OUT':
        return <ArrowDown className="w-4 h-4 text-red-600" />
      case 'ADJUSTMENT':
        return <RefreshCw className="w-4 h-4 text-blue-600" />
      default:
        return <RefreshCw className="w-4 h-4" />
    }
  }

  const getTransactionBadgeVariant = (type: string) => {
    switch (type) {
      case 'IN':
        return 'default'
      case 'OUT':
        return 'destructive'
      case 'ADJUSTMENT':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Stock Transactions</CardTitle>
          <CardDescription>Loading transactions...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stock Transactions</h2>
          <p className="text-gray-600">
            Track all inventory movements ({pagination.total} transactions)
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Transaction
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Latest stock movements and adjustments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No transactions found.
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">
                          {transaction.product.name}
                        </h3>
                        <Badge variant={getTransactionBadgeVariant(transaction.type)}>
                          {transaction.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>
                          SKU: {transaction.product.sku} | 
                          Quantity: {transaction.type === 'OUT' ? '-' : '+'}{transaction.quantity} | 
                          Price: ${transaction.unitPrice}
                        </p>
                        <p>
                          By: {transaction.user.name} | 
                          {format(new Date(transaction.createdAt), 'MMM dd, yyyy HH:mm')}
                        </p>
                        {transaction.description && (
                          <p className="text-gray-500">{transaction.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ${transaction.totalPrice.toFixed(2)}
                    </div>
                    {transaction.reference && (
                      <div className="text-sm text-gray-500">
                        Ref: {transaction.reference}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => fetchTransactions(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                onClick={() => fetchTransactions(currentPage + 1)}
                disabled={currentPage === pagination.pages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}