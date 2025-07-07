'use server'

import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'

// Crear servicio_IPTV
export const createServicioIPTV = async ({
  formulario,
  nombre,
  instancia,
  nro_androidtv,
  nro_tvs,
  plan,
  servicio_adicional,
  tarifa,
}: {
  formulario: number | null
  nombre: string
  instancia?: string | null
  nro_androidtv?: number | null
  nro_tvs?: number | null
  plan?: string | null
  servicio_adicional?: string | null
  tarifa?: number | null
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('servicio_IPTV').insert({
    formulario,
    nombre,
    instancia,
    nro_androidtv,
    nro_tvs,
    plan,
    servicio_adicional,
    tarifa,
  })

  if (error) throw new Error(`Error al crear IPTV: ${error.message}`)

  revalidatePath('/admin/iptv')
  return data
}

// Obtener todos los servicios IPTV
export const getServiciosIPTV = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_IPTV')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Error al obtener IPTV: ${error.message}`)
  return data
}

// Obtener un servicio IPTV por ID
export const getServicioIPTVById = async (id: number) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_IPTV')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error al obtener IPTV: ${error.message}`)
  return data
}

// Actualizar servicio IPTV
export const updateServicioIPTV = async (
  id: number,
  values: {
    nombre?: string
    instancia?: string | null
    nro_androidtv?: number | null
    nro_tvs?: number | null
    plan?: string | null
    servicio_adicional?: string | null
    tarifa?: number | null
  }
) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servicio_IPTV')
    .update(values)
    .eq('id', id)

  if (error) throw new Error(`Error al actualizar IPTV: ${error.message}`)

  revalidatePath('/admin/iptv')
  return data
}

// Eliminar servicio IPTV
export const deleteServicioIPTV = async (id: number) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('servicio_IPTV')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Error al eliminar IPTV: ${error.message}`)

  revalidatePath('/admin/iptv')
}
