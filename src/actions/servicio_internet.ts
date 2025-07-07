'use server'

import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'

// Crear servicio_internet
export const createServicioInternet = async ({
  formulario,
  nombre,
  instancia,
  plan,
  red_ip,
  tarifa,
  velocidad,
}: {
  formulario: number | null
  nombre: string
  instancia?: string | null
  plan?: string | null
  red_ip?: string | null
  tarifa?: number | null
  velocidad?: string | null
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('servicio_internet').insert({
    formulario,
    nombre,
    instancia,
    plan,
    red_ip,
    tarifa,
    velocidad,
  })

  if (error) throw new Error(`Error al crear servicio de internet: ${error.message}`)

  revalidatePath('/admin/internet')
  return data
}

// Obtener todos los servicios de internet
export const getServiciosInternet = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_internet')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Error al obtener servicios de internet: ${error.message}`)
  return data
}

// Obtener servicio de internet por ID
export const getServicioInternetById = async (id: number) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_internet')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error al obtener servicio de internet: ${error.message}`)
  return data
}

// Actualizar servicio de internet
export const updateServicioInternet = async (
  id: number,
  values: {
    nombre?: string
    instancia?: string | null
    plan?: string | null
    red_ip?: string | null
    tarifa?: number | null
    velocidad?: string | null
  }
) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_internet')
    .update(values)
    .eq('id', id)

  if (error) throw new Error(`Error al actualizar servicio de internet: ${error.message}`)

  revalidatePath('/admin/internet')
  return data
}

// Eliminar servicio de internet
export const deleteServicioInternet = async (id: number) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('servicio_internet')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Error al eliminar servicio de internet: ${error.message}`)

  revalidatePath('/admin/internet')
}
