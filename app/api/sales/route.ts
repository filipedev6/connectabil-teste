import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      include: { product: true },
      orderBy: { date: 'desc' },
    });
    return NextResponse.json({ data: sales });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sales' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const product = await prisma.product.findUnique({
      where: { id: json.productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.stock < json.quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    const sale = await prisma.$transaction(async (prisma) => {
      // Create the sale
      const sale = await prisma.sale.create({
        data: {
          productId: json.productId,
          quantity: json.quantity,
          total: product.price * json.quantity,
        },
      });

      // Update product stock
      await prisma.product.update({
        where: { id: json.productId },
        data: { stock: product.stock - json.quantity },
      });

      return sale;
    });

    return NextResponse.json({ data: sale });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create sale' },
      { status: 500 }
    );
  }
}