'use client';

import { FC, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ProductsWithCategoriesResponse } from '@/app/admin/products/products.types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Category } from '@/app/admin/categories/categories.types';
import {
  createOrUpdateProductSchema,
  CreateOrUpdateProductSchema,
} from '@/app/admin/products/schema';
import { imageUploadHandler } from '@/actions/categories';
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '@/actions/products';
import { ProductForm } from '@/app/admin/products/product-form';
import { ProductTableRow } from '@/app/admin/products/product-table-row';

type Props = {
  categories: Category[];
  productsWithCategories: ProductsWithCategoriesResponse;
};

export const ProductPageComponent: FC<Props> = ({
  categories,
  productsWithCategories,
}) => {
  const [currentProduct, setCurrentProduct] =
    useState<CreateOrUpdateProductSchema | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const form = useForm<CreateOrUpdateProductSchema>({
    resolver: zodResolver(createOrUpdateProductSchema),
    defaultValues: {
      title: '',
      category: undefined,
      price: undefined,
      maxQuantity: undefined,
      heroImage: undefined,
      intent: 'create',
    },
  });

  const router = useRouter();

  const productCreateUpdateHandler = async (
    data: CreateOrUpdateProductSchema
  ) => {
    const {
      category,
      maxQuantity,
      price,
      title,
      heroImage,
      slug,
      intent = 'create',
    } = data;

    const uploadFile = async (file: File) => {
      const uniqueId = uuid();
      const fileName = `product/product-${uniqueId}-${file.name}`;
      const formData = new FormData();
      formData.append('file', file, fileName);
      return imageUploadHandler(formData);
    };

    let heroImageUrl: string | undefined;
    
    if (heroImage) {
      const imagePromise = Array.from(heroImage).map(file =>
        uploadFile(file as File)
      );
      try {
        [heroImageUrl] = await Promise.all(imagePromise);
      } catch (error) {
        console.error('Error al actualizar imagen:', error);
        toast.error('Error al actualizar imagen');
        return;
      }
    }

    switch (intent) {
      case 'create': {
        if (heroImageUrl) {
          await createProduct({
            category: Number(category),
            heroImage: heroImageUrl,
            maxQuantity: Number(maxQuantity),
            price: Number(price),
            title,
          });
          form.reset();
          router.refresh();
          setIsProductModalOpen(false);
          toast.success('Producto creado correctamente');
        }
        break;
      }
      case 'update': {
        if (heroImageUrl && slug) {
          await updateProduct({
            category: Number(category),
            heroImage: heroImageUrl!,
            maxQuantity: Number(maxQuantity),
            price: Number(price),
            title,
            slug,
          });
          form.reset();
          router.refresh();
          setIsProductModalOpen(false);
          toast.success('Producto actualizado correctamente');
        }
        break;
      }

      default:
        console.error('Intento no valido');
    }
  };

  const deleteProductHandler = async () => {
    if (currentProduct?.slug) {
      await deleteProduct(currentProduct.slug);
      router.refresh();
      toast.success('Producto eliminado correctamente');
      setIsDeleteModalOpen(false);
      setCurrentProduct(null);
    }
  };

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-bold'>Administrador de productos</h1>
          <Button
            onClick={() => {
              setCurrentProduct(null);
              setIsProductModalOpen(true);
            }}
          >
            <PlusIcon className='mr-2 h-4 w-4' /> Agregar producto
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio (Bs)</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Imagen</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsWithCategories.map(product => (
              <ProductTableRow
                setIsProductModalOpen={setIsProductModalOpen}
                key={product.id}
                product={product}
                setCurrentProduct={setCurrentProduct}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
              />
            ))}
          </TableBody>
        </Table>

        {/* Product Modal */}
        <ProductForm
          form={form}
          onSubmit={productCreateUpdateHandler}
          categories={categories}
          isProductModalOpen={isProductModalOpen}
          setIsProductModalOpen={setIsProductModalOpen}
          defaultValues={currentProduct}
        />

        {/* Delete Product Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar producto</DialogTitle>
            </DialogHeader>
            <p>¿Está seguro de que desea eliminar? {currentProduct?.title}</p>
            <DialogFooter>
              <Button variant='destructive' onClick={deleteProductHandler}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      
    </main>
  );
};
