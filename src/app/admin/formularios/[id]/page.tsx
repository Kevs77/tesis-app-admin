import { getFormularioCompletoById } from '@/actions/formulario_servicio'
import FormularioDetalleClient from './FormularioDetalleClient'

export default async function FormularioDetallePage({ params }: { params: { id: string } }) {
  const id = Number(params.id)
  if (isNaN(id)) return <div>ID inválido</div>

  const formulario = await getFormularioCompletoById(id)
  if (!formulario) return <div>No se encontró el formulario</div>

  return <FormularioDetalleClient formulario={formulario} />
}
