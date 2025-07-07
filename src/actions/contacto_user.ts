'use server'

import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'

// Crear contacto
export const createContactoUser = async ({
  user,
  nombre,
  apellido,
  vinculo,
  telefono,
}: {
  user: string
  nombre: string
  apellido: string
  vinculo: string
  telefono: string
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('contacto_user').insert({
    user,
    nombre,
    apellido,
    vinculo,
    telefono,
  })

  if (error) throw new Error(`Error al crear contacto: ${error.message}`)

  revalidatePath('/admin/contactos')
  return data
}

// Obtener todos los contactos
export const getContactosUser = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('contacto_user')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Error al obtener contactos: ${error.message}`)
  return data
}

// Obtener un contacto por ID
export const getContactoUserById = async (id: number) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('contacto_user')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(`Error al obtener contacto: ${error.message}`)
  return data
}

// Actualizar contacto
export const updateContactoUser = async (
  id: number,
  values: {
    nombre?: string
    apellido?: string
    vinculo?: string
    telefono?: string
  }
) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('contacto_user')
    .update(values)
    .eq('id', id)

  if (error) throw new Error(`Error al actualizar contacto: ${error.message}`)

  revalidatePath('/admin/contactos')
  return data
}

// Eliminar contacto
export const deleteContactoUser = async (id: number) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('contacto_user')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Error al eliminar contacto: ${error.message}`)

  revalidatePath('/admin/contactos')
}
