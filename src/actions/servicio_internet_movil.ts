'use server'

import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'

// Crear servicio de internet móvil
export const createServicioInternetMovil = async ({
  formulario,
  nombre,
  nro_telefono,
  plan,
  tarifa,
  velocidad,
  nro_favorito,
  servicio_adicional,
  megas,
  minutos,
  whatsapp,
  telegram,
}: {
  formulario: number | null
  nombre: string
  nro_telefono: string
  plan?: string | null
  tarifa?: number | null
  velocidad?: string | null
  nro_favorito?: string | null
  servicio_adicional?: string | null
  megas?: boolean | null
  minutos?: boolean | null
  whatsapp?: boolean | null
  telegram?: boolean | null
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('servicio_internet_movil').insert({
    formulario,
    nombre,
    nro_telefono,
    plan,
    tarifa,
    velocidad,
    nro_favorito,
    servicio_adicional,
    megas,
    minutos,
    whatsapp,
    telegram,
  })

  if (error) throw new Error(`Error al crear servicio móvil: ${error.message}`)

  revalidatePath('/admin/internet-movil')
  return data
}

// Obtener todos los servicios de internet móvil
export const getServiciosInternetMovil = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_internet_movil')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Error al obtener servicios móviles: ${error.message}`)
  return data
}

// Obtener un servicio de internet móvil por ID
export const getServicioInternetMovilById = async (id: number) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_internet_movil')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error al obtener servicio móvil: ${error.message}`)
  return data
}

// Actualizar servicio de internet móvil
export const updateServicioInternetMovil = async (
  id: number,
  values: {
    nombre?: string
    nro_telefono?: string
    plan?: string | null
    tarifa?: number | null
    velocidad?: string | null
    nro_favorito?: string | null
    servicio_adicional?: string | null
    megas?: boolean | null
    minutos?: boolean | null
    whatsapp?: boolean | null
    telegram?: boolean | null
  }
) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_internet_movil')
    .update(values)
    .eq('id', id)

  if (error) throw new Error(`Error al actualizar servicio móvil: ${error.message}`)

  revalidatePath('/admin/internet-movil')
  return data
}

// Eliminar servicio de internet móvil
export const deleteServicioInternetMovil = async (id: number) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('servicio_internet_movil')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Error al eliminar servicio móvil: ${error.message}`)

  revalidatePath('/admin/internet-movil')
}
