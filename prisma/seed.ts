import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminPassword = await hash('admin123', 12)
  const userPassword = await hash('user123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  const manager = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: {
      email: 'manager@example.com',
      name: 'Manager User',
      password: userPassword,
      role: 'MANAGER',
    },
  })

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: userPassword,
      role: 'USER',
    },
  })

  const electronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics',
      description: 'Electronic devices and components',
    },
  })

  const office = await prisma.category.upsert({
    where: { name: 'Office Supplies' },
    update: {},
    create: {
      name: 'Office Supplies',
      description: 'Office equipment and supplies',
    },
  })

  const supplier1 = await prisma.supplier.upsert({
    where: { id: 'supplier-1' },
    update: {},
    create: {
      id: 'supplier-1',
      name: 'Tech Solutions Inc.',
      email: 'contact@techsolutions.com',
      phone: '+1-555-0123',
      address: '123 Tech Street, Silicon Valley, CA',
    },
  })

  const supplier2 = await prisma.supplier.upsert({
    where: { id: 'supplier-2' },
    update: {},
    create: {
      id: 'supplier-2',
      name: 'Office Pro Ltd.',
      email: 'sales@officepro.com',
      phone: '+1-555-0456',
      address: '456 Business Ave, New York, NY',
    },
  })

  await prisma.product.upsert({
    where: { sku: 'LAPTOP-001' },
    update: {},
    create: {
      name: 'Business Laptop',
      description: 'High-performance laptop for business use',
      sku: 'LAPTOP-001',
      barcode: '1234567890123',
      price: 1299.99,
      cost: 899.99,
      quantity: 15,
      minStock: 5,
      maxStock: 50,
      location: 'A1-01',
      categoryId: electronics.id,
      supplierId: supplier1.id,
    },
  })

  await prisma.product.upsert({
    where: { sku: 'MOUSE-001' },
    update: {},
    create: {
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      sku: 'MOUSE-001',
      barcode: '1234567890124',
      price: 29.99,
      cost: 19.99,
      quantity: 50,
      minStock: 10,
      maxStock: 100,
      location: 'A1-02',
      categoryId: electronics.id,
      supplierId: supplier1.id,
    },
  })

  await prisma.product.upsert({
    where: { sku: 'DESK-001' },
    update: {},
    create: {
      name: 'Office Desk',
      description: 'Adjustable height office desk',
      sku: 'DESK-001',
      barcode: '1234567890125',
      price: 299.99,
      cost: 199.99,
      quantity: 8,
      minStock: 2,
      maxStock: 20,
      location: 'B1-01',
      categoryId: office.id,
      supplierId: supplier2.id,
    },
  })

  console.log('Database seeded successfully!')
  console.log('Users created:')
  console.log('- Admin: admin@example.com (password: admin123)')
  console.log('- Manager: manager@example.com (password: user123)')
  console.log('- User: user@example.com (password: user123)')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })