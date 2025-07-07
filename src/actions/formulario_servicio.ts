'use server';

import { createClient } from '@/supabase/server';
import { revalidatePath } from 'next/cache';

// TYPES
export type FormularioServicioInput = {
  nombre: string
  user: string
  tipo_usuario: string
  razon_social: string
  nit: string
}

export type DetalleServicioInput = {
  formulario: number
  codigo_cliente: string
  cuenta: string
  entidad_cobranzas: string
  suscripcion_nueva: boolean
}

// FORMULARIO SERVICIO CRUD
export const getFormularios = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('formulario_servicio')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Error al obtener formularios: ${error.message}`)

  return data
}

export const createFormulario = async (formulario: FormularioServicioInput) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('formulario_servicio')
    .insert({ ...formulario })

  if (error) throw new Error(`Error al crear formulario: ${error.message}`)

  revalidatePath('/admin/formularios')
  return data
}

export const updateFormulario = async (id: number, formulario: FormularioServicioInput) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('formulario_servicio')
    .update({ ...formulario })
    .eq('id', id)

  if (error) throw new Error(`Error al actualizar formulario: ${error.message}`)

  revalidatePath('/admin/formularios')
  return data
}

export const deleteFormulario = async (id: number) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('formulario_servicio')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Error al eliminar formulario: ${error.message}`)

  revalidatePath('/admin/formularios')
}


/** FORMULARIO COMPLETO */

export const getFormularioCompletoById = async (id: number) => {
  const supabase = createClient()

  const errors: string[] = []

  // Obtener formulario principal
  const { data: formulario, error: errorFormulario } = await supabase
    .from('formulario_servicio')
    .select('*')
    .eq('id', id)
    .single()

  if (errorFormulario) throw new Error(`Error al obtener formulario: ${errorFormulario.message}`)

    const [usuario, contacto] = await Promise.all([
  supabase.from('users').select('*').eq('id', formulario.user).maybeSingle(),
  supabase.from('contacto_user').select('*').eq('usuario', formulario.user).maybeSingle(),
])

  // Consultas en paralelo
  const [
    detalle,
    internet,
    internetMovil,
    iptv,
    telefonia,
    vozip,
    factura,
  ] = await Promise.all([
    supabase.from('detalle_servicio').select('*').eq('formulario', id).maybeSingle(),
    supabase.from('servicio_internet').select('*').eq('formulario', id).maybeSingle(),
    supabase.from('servicio_internet_movil').select('*').eq('formulario', id).maybeSingle(),
    supabase.from('servicio_IPTV').select('*').eq('formulario', id).maybeSingle(),
    supabase.from('servicio_telefonia').select('*').eq('formulario', id).maybeSingle(),
    supabase.from('servicio_VOZIP').select('*').eq('formulario', id).maybeSingle(),
    supabase.from('factura').select('*').eq('formulario', id).maybeSingle(),
  ])

  // Verificar errores de cada consulta
  if (detalle.error) errors.push(`detalle_servicio: ${detalle.error.message}`)
  if (internet.error) errors.push(`servicio_internet: ${internet.error.message}`)
  if (internetMovil.error) errors.push(`servicio_internet_movil: ${internetMovil.error.message}`)
  if (iptv.error) errors.push(`servicio_IPTV: ${iptv.error.message}`)
  if (telefonia.error) errors.push(`servicio_telefonia: ${telefonia.error.message}`)
  if (vozip.error) errors.push(`servicio_VOZIP: ${vozip.error.message}`)
  if (factura.error) errors.push(`factura: ${factura.error.message}`)

  if (errors.length > 0) {
    throw new Error(`Errores al obtener servicios relacionados:\n${errors.join('\n')}`)
  }

  return {
    formulario,
     users: usuario.data || null,
     contacto_user: contacto.data || null,
    detalle_servicio: detalle.data || null,
    servicio_internet: internet.data || null,
    servicio_internet_movil: internetMovil.data || null,
    servicio_IPTV: iptv.data || null,
    servicio_telefonia: telefonia.data || null,
    servicio_VOZIP: vozip.data || null,
    factura: factura.data || null,
  }
}

export const getFormulariosCompletos = async () => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('formulario_servicio')
    .select(`
      *,
      detalle_servicio(*),
      factura(*),
      servicio_IPTV(*),
      servicio_internet(*),
      servicio_internet_movil(*),
      servicio_telefonia(*),
      servicio_VOZIP(*),
      users(*)
    `)

  if (error) throw new Error(`Error al obtener el formulario completo: ${error.message}`)
  return data
}

/**  */
export const getFormulariosResumen = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('formulario_servicio')
    .select(`
      id,
      created_at,
      users (
        name,
        ap_paterno,
        ap_materno,
        email
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Error al obtener formularios: ${error.message}`)
  return data
}