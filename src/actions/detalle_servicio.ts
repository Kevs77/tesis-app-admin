'use server';

import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

// Crear detalle_servicio
export const createDetalleServicio = async ({
  formulario,
  codigo_cliente,
  cuenta,
  entidad_cobranzas,
  suscripcion_nueva,
}: {
  formulario: number;
  codigo_cliente: string;
  cuenta: string;
  entidad_cobranzas: string;
  suscripcion_nueva: boolean;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('detalle_servicio').insert({
    formulario,
    codigo_cliente,
    cuenta,
    entidad_cobranzas,
    suscripcion_nueva,
  });

  if (error) throw new Error(`Error al crear detalle: ${error.message}`);

  revalidatePath('/admin/detalles');
  return data;
};

// Obtener todos los detalles_servicio
export const getDetallesServicio = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('detalle_servicio')
    .select('*');

  if (error) throw new Error(`Error al obtener detalles: ${error.message}`);
  return data;
};

// Obtener un detalle específico
export const getDetalleServicioById = async (id: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('detalle_servicio')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(`Error al obtener detalle: ${error.message}`);
  return data;
};

// Actualizar detalle_servicio
export const updateDetalleServicio = async (id: number, values: {
  codigo_cliente?: string;
  cuenta?: string;
  entidad_cobranzas?: string;
  suscripcion_nueva?: boolean;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('detalle_servicio')
    .update(values)
    .eq('id', id);

  if (error) throw new Error(`Error al actualizar detalle: ${error.message}`);

  revalidatePath('/admin/detalles');
  return data;
};

// Eliminar detalle_servicio
export const deleteDetalleServicio = async (id: number) => {
  const supabase = createClient();
  const { error } = await supabase
    .from('detalle_servicio')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`Error al eliminar detalle: ${error.message}`);

  revalidatePath('/admin/detalles');
};
