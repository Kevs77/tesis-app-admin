import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { TableCell, TableRow } from '@/components/ui/table';
import { CreateCategorySchema } from '@/app/admin/categories/create-category.schema';
import { CategoryWithProducts } from '@/app/admin/categories/categories.types';

export const CategoryTableRow = ({
  category,
  setCurrentCategory,
  setIsCreateCategoryModalOpen,
  deleteCategoryHandler,
}: {
  category: CategoryWithProducts;
  setCurrentCategory: (category: CreateCategorySchema | null) => void;
  setIsCreateCategoryModalOpen: (isOpen: boolean) => void;
  deleteCategoryHandler: (id: number) => Promise<void>;
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEditClick = (category: CreateCategorySchema) => {
    setCurrentCategory({
      name: category.name,
      // @ts-ignore
      image: new File([], ''),
      intent: 'update',
      slug: category.slug,
    });
    setIsCreateCategoryModalOpen(true);
  };

  const handleDelete = async () => {
    await deleteCategoryHandler(category.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <TableRow>
        <TableCell className='sm:table-cell'>
          <Image
            alt='Product image'
            className='aspect-square rounded-md object-cover'
            height='64'
            src={category.imageUrl}
            width='64'
          />
        </TableCell>
        <TableCell className='font-medium'>{category.name}</TableCell>
        <TableCell className='md:table-cell'>
          {format(new Date(category.created_at), 'yyyy-MM-dd')}
        </TableCell>
        <TableCell className='md:table-cell'>
          {category.products && category.products.length > 0 ? (
            <Dialog>
              <DialogTrigger>
                {category.products
                  .slice(0, 2)
                  .map(product => product.title)
                  .join(', ')}
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className='sr-only'>
                  Lista de productos por categoría
                </DialogTitle>
                <h2>Productos</h2>
                <ScrollArea className='h-[400px] rounded-md p-4'>
                  {category.products.map(product => (
                    <Card key={product.id} className='cursor-pointer'>
                      <div className='grid grid-cols-[100px,1fr] items-center gap-4'>
                        <Image
                          alt='Product image'
                          className='aspect-square rounded-md object-cover'
                          height='100'
                          src={product.heroImage}
                          width='100'
                        />
                        <div className='flex flex-col space-y-1'>
                          <h3 className='font-medium leading-none'>
                            {product.title}
                          </h3>
                          <p className='text-sm text-muted-foreground'>
                            {product.maxQuantity} en stock
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </ScrollArea>
              </DialogContent>
            </Dialog>
          ) : (
            'No hay productos vinculados a esta categoría'
          )}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size='icon' variant='ghost'>
                <MoreHorizontal className='h-4 w-4' />
                <span className='sr-only'>Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[160px]'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  handleEditClick({
                    ...category,
                    intent: 'update',
                  })
                }
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={() => setIsDeleteDialogOpen(!isDeleteDialogOpen)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Estás absolutamente seguro?</DialogTitle>
            <DialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente esta
            categoría.
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end gap-4'>
            <Button
              variant='outline'
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant='destructive' onClick={handleDelete}>
              Confirmar eliminación
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
