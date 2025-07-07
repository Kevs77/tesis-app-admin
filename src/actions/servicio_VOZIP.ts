'use server'

import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'

// Crear servicio_VOZIP
export const createServicioVOZIP = async ({
  formulario,
  nombre,
  numero,
  correo,
  instancia,
  consumo,
  limite,
  monto,
  plan,
  tarifa,
}: {
  formulario: number | null
  nombre?: string | null
  numero?: string | null
  correo?: string | null
  instancia?: string | null
  consumo?: string | null
  limite?: string | null
  monto?: number | null
  plan?: string | null
  tarifa?: number | null
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('servicio_VOZIP').insert({
    formulario,
    nombre,
    numero,
    correo,
    instancia,
    consumo,
    limite,
    monto,
    plan,
    tarifa,
  })

  if (error) throw new Error(`Error al crear VOZIP: ${error.message}`)

  revalidatePath('/admin/vozip')
  return data
}

// Obtener todos los servicios VOZIP
export const getServiciosVOZIP = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_VOZIP')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Error al obtener VOZIP: ${error.message}`)
  return data
}

// Obtener un servicio VOZIP por ID
export const getServicioVOZIPById = async (id: number) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_VOZIP')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error al obtener VOZIP: ${error.message}`)
  return data
}

// Actualizar servicio VOZIP
export const updateServicioVOZIP = async (
  id: number,
  values: {
    nombre?: string | null
    numero?: string | null
    correo?: string | null
    instancia?: string | null
    consumo?: string | null
    limite?: string | null
    monto?: number | null
    plan?: string | null
    tarifa?: number | null
  }
) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_VOZIP')
    .update(values)
    .eq('id', id)

  if (error) throw new Error(`Error al actualizar VOZIP: ${error.message}`)

  revalidatePath('/admin/vozip')
  return data
}

// Eliminar servicio VOZIP
export const deleteServicioVOZIP = async (id: number) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('servicio_VOZIP')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Error al eliminar VOZIP: ${error.message}`)

  revalidatePath('/admin/vozip')
}
