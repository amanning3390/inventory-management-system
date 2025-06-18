export type Role = 'ADMIN' | 'MANAGER' | 'USER'
export type TransactionType = 'IN' | 'OUT' | 'ADJUSTMENT'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface Supplier {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description?: string
  sku: string
  barcode?: string
  price: number
  cost: number
  quantity: number
  minStock: number
  maxStock?: number
  location?: string
  isActive: boolean
  categoryId?: string
  supplierId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  type: TransactionType
  productId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  reference?: string
  description?: string
  userId: string
  createdAt: Date
}