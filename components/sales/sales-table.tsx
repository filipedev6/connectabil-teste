'use client';

import { Sale, Product } from '@/lib/types';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { formatCurrency } from '@/lib/utils';

interface SalesTableProps {
  sales: Sale[];
  products: Product[];
}

export function SalesTable({ sales, products }: SalesTableProps) {
  const columns: ColumnDef<Sale>[] = [
    {
      accessorKey: 'product.name',
      header: 'Product',
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => formatCurrency(row.original.total),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
    },
  ];

  return <DataTable columns={columns} data={sales} searchKey="product.name" />;
}