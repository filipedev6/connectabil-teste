'use client';

import { ProductCard } from '@/components/products/product-card';
import { ProductForm } from '@/components/products/product-form';
import { ProductSkeletonGrid } from '@/components/products/product-skeleton';
import { SalesSkeleton } from '@/components/sales/sales-skeleton';
import { SalesTable } from '@/components/sales/sales-table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFetchData } from '@/hooks/use-fetch-data';
import { useToast } from '@/hooks/use-toast';
import { createProduct, deleteProduct, getProducts, getSales, updateProduct } from '@/lib/api';
import { Product } from '@/lib/types';
import { useState } from 'react';

export default function Dashboard() {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('products');

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
    refetch: refetchProducts
  } = useFetchData(getProducts, []);

  const {
    data: sales,
    loading: salesLoading,
    error: salesError,
    refetch: refetchSales
  } = useFetchData(
    getSales,
    [],
    // Only fetch when sales tab is active
    { enabled: activeTab === 'sales' }
  );


  const handleCreateProduct = async (productData: Partial<Product>) => {
    try {
      const result = await createProduct(productData as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>);
      refetchProducts();
      toast({
        title: "Produto criado com sucesso",
        description: `${result.data.name} foi adicionado ao seu inventário com ${result.data.stock} unidades em estoque.`,
      });
    } catch (error) {
      toast({
        title: "Erro ao criar produto",
        description: "Houve um erro ao criar o produto. Tente novamente."
      });
    }
  };

  const handleUpdateProduct = async (productData: Partial<Product>) => {
    if (!selectedProduct) return;
    try {
      await updateProduct(selectedProduct.id, { name: productData.name, price: productData.price, description: productData.description, stock: productData.stock });
      refetchProducts();
      toast({
        title: "Produto atualizado com sucesso",
        description: `${productData.name} foi atualizado com sucesso.`
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar o produto",
        description: "Ocorreu um erro ao atualizar o produto. Tente novamente."
      });
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete);
      refetchProducts();
      setIsDeleteDialogOpen(false);
      toast({
        title: "Produto excluído com sucesso",
        description: "O produto foi removido com sucesso do seu inventário.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir produto",
        description: "Ocorreu um erro ao excluir o produto. Tente novamente.",
        duration: 5000
      });
    }
  };

  if (productsError || salesError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Erro ao carregar dados</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="products" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="sales">Histórico de vendas</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-3xl font-bold">Produtos</h2>
            <Button onClick={() => {
              setSelectedProduct(null);
              setIsFormOpen(true);
            }}>
              Adicionar produto
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsLoading ? (
              <ProductSkeletonGrid />
            ) : (
              <>
                {products?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={(product) => {
                      setSelectedProduct(product);
                      setIsFormOpen(true);
                    }}
                    onDelete={(id) => {
                      setProductToDelete(id);
                      setIsDeleteDialogOpen(true);
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="sales">
          <div className="mb-4">
            <h2 className="text-3xl font-bold">Histórico de vendas</h2>
          </div>
          {salesError ? (
            <div className="text-red-500">Erro ao carregar dados de vendas</div>
          ) : salesLoading ? (
            <SalesSkeleton />
          ) : (
            products && sales && <SalesTable sales={sales} products={products} />
          )}
        </TabsContent>

      <ProductForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={selectedProduct ? handleUpdateProduct : handleCreateProduct}
        initialData={selectedProduct || undefined}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá o produto permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>
             Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </Tabs>
    </div>
  );
}