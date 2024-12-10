export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  total: number;
  date: string;
}

export type ApiResponse<T> = {
  data: T;
  error?: string;
}