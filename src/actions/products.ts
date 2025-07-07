'use server';

import slugify from 'slugify';

import { createClient } from '@/supabase/server';
import {
  ProductsWithCategoriesResponse,
  UpdateProductSchema,
} from '@/app/admin/products/products.types';
import { CreateProductSchemaServer } from '@/app/admin/products/schema';
import { revalidatePath } from 'next/cache';

export const getProductsWithCategories =
  async (): Promise<ProductsWithCategoriesResponse> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('product')
      .select('*, category:category(*)')
      .returns<ProductsWithCategoriesResponse>();

    if (error) {
      throw new Error(`
        Error al obtener productos con categorias: ${error.message}`);
    }

    return data || [];
  };

export const createProduct = async ({
  category,
  heroImage,
  maxQuantity,
  price,
  title,
}: CreateProductSchemaServer) => {
  const supabase = createClient();
  const slug = slugify(title, { lower: true });

  const { data, error } = await supabase.from('product').insert({
    category,
    heroImage,
    maxQuantity,
    price,
    slug,
    title,
  });

  if (error) {
    throw new Error(`Error al crear producto: ${error.message}`);
  }

  revalidatePath('/admin/products');

  return data;
};

export const updateProduct = async ({
  category,
  heroImage,
  maxQuantity,
  price,
  slug,
  title,
}: UpdateProductSchema) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('product')
    .update({
      category,
      heroImage,
      maxQuantity,
      price,
      title,
    })
    .match({ slug });

  if (error) {
    throw new Error(`Error al actualizar producto: ${error.message}`);
  }

  revalidatePath('/admin/products');

  return data;
};

export const deleteProduct = async (slug: string) => {
  const supabase = createClient();
  const { error } = await supabase.from('product').delete().match({ slug });

  if (error) {
    throw new Error(`Error al eliminar producto: ${error.message}`);
  }

  revalidatePath('/admin/products');
};
