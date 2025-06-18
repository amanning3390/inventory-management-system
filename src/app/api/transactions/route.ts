import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createTransactionSchema = z.object({
  type: z.enum(['IN', 'OUT', 'ADJUSTMENT']),
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().min(1, 'Quantity must be positive'),
  unitPrice: z.number().min(0, 'Unit price must be non-negative'),
  reference: z.string().optional(),
  description: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const productId = searchParams.get('productId')
    const type = searchParams.get('type')

    const skip = (page - 1) * limit

    const where: any = {
      ...(productId && { productId }),
      ...(type && { type }),
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: {
          product: {
            select: { name: true, sku: true },
          },
          user: {
            select: { name: true, email: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.transaction.count({ where }),
    ])

    return NextResponse.json({
      transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get transactions error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createTransactionSchema.parse(body)

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: validatedData.productId },
    })

    if (!product || !product.isActive) {
      return NextResponse.json(
        { error: 'Product not found or inactive' },
        { status: 404 }
      )
    }

    // Calculate total price
    const totalPrice = validatedData.quantity * validatedData.unitPrice

    // Start transaction to update both product quantity and create transaction record
    const result = await prisma.$transaction(async (tx) => {
      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          ...validatedData,
          totalPrice,
          userId: session.user.id,
        },
        include: {
          product: {
            select: { name: true, sku: true },
          },
          user: {
            select: { name: true, email: true },
          },
        },
      })

      // Update product quantity based on transaction type
      let newQuantity = product.quantity
      if (validatedData.type === 'IN') {
        newQuantity += validatedData.quantity
      } else if (validatedData.type === 'OUT') {
        newQuantity -= validatedData.quantity
        if (newQuantity < 0) {
          throw new Error('Insufficient stock for this transaction')
        }
      } else if (validatedData.type === 'ADJUSTMENT') {
        newQuantity = validatedData.quantity // For adjustments, set absolute quantity
      }

      // Update product quantity
      await tx.product.update({
        where: { id: validatedData.productId },
        data: { quantity: newQuantity },
      })

      return transaction
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message === 'Insufficient stock for this transaction') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    console.error('Create transaction error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}