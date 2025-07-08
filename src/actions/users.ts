'use server'

import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'

export const getUsers = async () => {
  const supabase = createClient()
  const { data, error } = await supabase.from('users').select('*')

  if (error) throw new Error(`Error al obtener usuarios: ${error.message}`)
  return data
}

export const getUserById = async (id: string) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()

  if (error) throw new Error(`Error al obtener usuario: ${error.message}`)
  return data
}

export const createUser = async ({
  id,
  name,
  ap_paterno,
  ap_materno,
  email,
  ci,
  expedido_en,
  fecha_nacimiento,
  avatar_url,
  address = null,
  phone = null,
  expo_notification_token = null,
  stripe_customer_id = null,
  type = 'cliente',
}: {
  id: string
  name: string
  ap_paterno: string
  ap_materno: string
  email: string
  ci: string
  expedido_en: string
  fecha_nacimiento: string
  avatar_url: string
  address?: string | null
  phone?: string | null
  expo_notification_token?: string | null
  stripe_customer_id?: string | null
  type?: string
}) => {
  const supabase = createClient()

  const { data, error } = await supabase.from('users').insert({
    id,
    name,
    ap_paterno,
    ap_materno,
    email,
    ci,
    expedido_en,
    fecha_nacimiento,
    avatar_url,
    address,
    phone,
    expo_notification_token,
    stripe_customer_id,
    type,
  })

  if (error) throw new Error(`Error al crear usuario: ${error.message}`)

  revalidatePath('/admin/users')
  return data
}

export const updateUser = async (
  id: string,
  updates: Partial<{
    name: string
    ap_paterno: string
    ap_materno: string
    email: string
    ci: string
    expedido_en: string
    fecha_nacimiento: string
    avatar_url: string
    address?: string | null
    phone?: string | null
    expo_notification_token?: string | null
    stripe_customer_id?: string | null
    type?: string
  }>
) => {
  const supabase = createClient()

  const { data, error } = await supabase.from('users').update(updates).eq('id', id)

  if (error) throw new Error(`Error al actualizar usuario: ${error.message}`)

  revalidatePath('/admin/users')
  return data
}

export const deleteUser = async (id: string) => {
  const supabase = createClient()
  const { error } = await supabase.from('users').delete().eq('id', id)

  if (error) throw new Error(`Error al eliminar usuario: ${error.message}`)

  revalidatePath('/admin/users')
}
