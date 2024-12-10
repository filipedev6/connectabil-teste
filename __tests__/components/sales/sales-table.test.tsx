import { SalesTable } from '@/components/sales/sales-table';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const mockProducts = [
  {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    stock: 15,
    createdAt: '2024-03-20T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
  },
];

const mockSales = [
  {
    id: '1',
    productId: '1',
    product: mockProducts[0],
    quantity: 2,
    total: 199.98,
    date: '2024-03-20T00:00:00.000Z',
  },
];

describe('SalesTable', () => {
  it('renders sales data correctly', () => {
    render(<SalesTable sales={mockSales} products={mockProducts} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('$199.98')).toBeInTheDocument();
    expect(screen.getByText('3/20/2024')).toBeInTheDocument();
  });

  it('renders column headers correctly', () => {
    render(<SalesTable sales={mockSales} products={mockProducts} />);

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('renders empty state when no sales data', () => {
    render(<SalesTable sales={[]} products={mockProducts} />);
    expect(screen.getByText('No results.')).toBeInTheDocument();
  });
});