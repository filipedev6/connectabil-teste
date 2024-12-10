import { Product, Sale, ApiResponse } from './types';

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data;
}

export async function getSales(): Promise<ApiResponse<Sale[]>> {
  const response = await fetch('/api/sales');
  const data = await response.json();
  return data;
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<ApiResponse<Product>> {
  const response = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  const data = await response.json();
  return data;
}

export async function deleteProduct(id: string): Promise<ApiResponse<boolean>> {
  const response = await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}