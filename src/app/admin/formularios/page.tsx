import { getFormulariosResumen } from '@/actions/formulario_servicio'
import FormularioListComponent from './FormularioListComponent'

export default async function FormulariosPage() {
  const formularios = await getFormulariosResumen()
  return <FormularioListComponent formularios={formularios} />
}
