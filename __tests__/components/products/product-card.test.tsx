import { ProductCard } from '@/components/products/product-card';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 99.99,
  description: 'Test Description',
  stock: 15,
  createdAt: '2024-03-20T00:00:00.000Z',
  updatedAt: '2024-03-20T00:00:00.000Z',
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <ProductCard
        product={mockProduct}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('15 units')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onEdit={mockOnEdit}
        onDelete={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockProduct);
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockOnDelete = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onEdit={() => {}}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockProduct.id);
  });

  it('displays stock in red when below or equal to 10 units', () => {
    const lowStockProduct = { ...mockProduct, stock: 5 };
    render(
      <ProductCard
        product={lowStockProduct}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    const stockElement = screen.getByText('5 units');
    expect(stockElement).toHaveClass('text-red-600');
  });

  it('displays stock in green when above 10 units', () => {
    render(
      <ProductCard
        product={mockProduct}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    const stockElement = screen.getByText('15 units');
    expect(stockElement).toHaveClass('text-green-600');
  });
});