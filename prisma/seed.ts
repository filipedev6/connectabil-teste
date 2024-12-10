#!/usr/bin/env ts-node
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (prisma) => {
    // Clear existing data
    await prisma.sale.deleteMany();
    await prisma.product.deleteMany();

    // Create products
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: 'Gaming Laptop',
          price: 1299.99,
          description: 'High-performance gaming laptop with RTX 3080',
          stock: 15,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Wireless Mouse',
          price: 49.99,
          description: 'Ergonomic wireless mouse with long battery life',
          stock: 50,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Mechanical Keyboard',
          price: 129.99,
          description: 'RGB mechanical keyboard with Cherry MX switches',
          stock: 30,
        },
      }),
      prisma.product.create({
        data: {
          name: '4K Monitor',
          price: 499.99,
          description: '32-inch 4K HDR display for professional use',
          stock: 20,
        },
      }),
      prisma.product.create({
        data: {
          name: 'Wireless Headset',
          price: 159.99,
          description: 'Premium wireless gaming headset with surround sound',
          stock: 25,
        },
      }),
    ]);

    // Create sales
    const today = new Date();
    const sales = [];
    
    for (const product of products) {
      // Create multiple sales for each product
      const numberOfSales = Math.floor(Math.random() * 5) + 1;
      
      for (let i = 0; i < numberOfSales; i++) {
        const quantity = Math.floor(Math.random() * 3) + 1;
        const date = new Date(today);
        date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days
        
        sales.push(
          prisma.sale.create({
            data: {
              productId: product.id,
              quantity,
              total: product.price * quantity,
              date,
            },
          })
        );
      }
    }

    await Promise.all(sales);
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });