'use server'

import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'

// Crear factura
export const createFactura = async ({
  formulario,
  autorizacion,
  correo,
  departamento,
  direccion,
  nit,
  nombre,
  provincia,
  telefono,
}: {
  formulario: number | null
  autorizacion?: boolean | null
  correo?: string | null
  departamento?: string | null
  direccion?: string | null
  nit?: string | null
  nombre?: string | null
  provincia?: string | null
  telefono?: string | null
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('factura').insert({
    formulario,
    autorizacion,
    correo,
    departamento,
    direccion,
    nit,
    nombre,
    provincia,
    telefono,
  })

  if (error) throw new Error(`Error al crear factura: ${error.message}`)

  revalidatePath('/admin/facturas')
  return data
}

// Obtener todas las facturas
export const getFacturas = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('factura')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Error al obtener facturas: ${error.message}`)
  return data
}

// Obtener una factura por ID
export const getFacturaById = async (id: number) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('factura')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error al obtener factura: ${error.message}`)
  return data
}

// Actualizar factura
export const updateFactura = async (
  id: number,
  values: {
    autorizacion?: boolean | null
    correo?: string | null
    departamento?: string | null
    direccion?: string | null
    nit?: string | null
    nombre?: string | null
    provincia?: string | null
    telefono?: string | null
  }
) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('factura')
    .update(values)
    .eq('id', id)

  if (error) throw new Error(`Error al actualizar factura: ${error.message}`)

  revalidatePath('/admin/facturas')
  return data
}

// Eliminar factura
export const deleteFactura = async (id: number) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('factura')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Error al eliminar factura: ${error.message}`)

  revalidatePath('/admin/facturas')
}
