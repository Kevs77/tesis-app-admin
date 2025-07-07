'use server'

import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'

// Crear servicio de telefonía
export const createServicioTelefonia = async ({
  formulario,
  instancia,
  nombre,
  numero,
  plan,
  tarifa,
}: {
  formulario: number | null
  instancia?: string | null
  nombre?: string | null
  numero?: string | null
  plan?: string | null
  tarifa?: number | null
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('servicio_telefonia').insert({
    formulario,
    instancia,
    nombre,
    numero,
    plan,
    tarifa,
  })

  if (error) throw new Error(`Error al crear servicio telefonía: ${error.message}`)

  revalidatePath('/admin/telefonia')
  return data
}

// Obtener todos los servicios de telefonía
export const getServiciosTelefonia = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_telefonia')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Error al obtener servicios telefonía: ${error.message}`)
  return data
}

// Obtener un servicio de telefonía por ID
export const getServicioTelefoniaById = async (id: number) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_telefonia')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error al obtener servicio telefonía: ${error.message}`)
  return data
}

// Actualizar servicio de telefonía
export const updateServicioTelefonia = async (
  id: number,
  values: {
    instancia?: string | null
    nombre?: string | null
    numero?: string | null
    plan?: string | null
    tarifa?: number | null
  }
) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_telefonia')
    .update(values)
    .eq('id', id)

  if (error) throw new Error(`Error al actualizar servicio telefonía: ${error.message}`)

  revalidatePath('/admin/telefonia')
  return data
}

// Eliminar servicio de telefonía
export const deleteServicioTelefonia = async (id: number) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('servicio_telefonia')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Error al eliminar servicio telefonía: ${error.message}`)

  revalidatePath('/admin/telefonia')
}
