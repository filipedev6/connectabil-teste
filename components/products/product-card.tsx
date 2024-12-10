'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="truncate">{product.name}</span>
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Estoque:</span>
          <span className={`font-bold ${product.stock > 10 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock} unidades
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onEdit(product)}>
          Editar
        </Button>
        <Button variant="destructive" onClick={() => onDelete(product.id)}>
          Deletar
        </Button>
      </CardFooter>
    </Card>
  );
}