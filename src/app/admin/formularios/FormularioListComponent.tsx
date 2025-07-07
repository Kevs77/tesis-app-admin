'use client'
import Link from 'next/link'

export default function FormularioListComponent({ formularios }: { formularios: any[] }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Administrador de formularios</h1>
      <table className="min-w-full bg-gray-900 text-white">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Correo</th>
            <th className="py-2 px-4">Fecha</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {formularios.map((formulario) => (
            <tr key={formulario.id} className="border-b border-gray-800 hover:bg-gray-800">
              <td className="py-2 px-4">
                {formulario.users?.name} {formulario.users?.ap_paterno} {formulario.users?.ap_materno}
              </td>
              <td className="py-2 px-4">{formulario.users?.email}</td>
              <td className="py-2 px-4">{new Date(formulario.created_at).toLocaleDateString()}</td>
              <td className="py-2 px-4">
                <Link
                  href={`/admin/formularios/${formulario.id}`}
                  className="text-blue-400 hover:underline"
                  aria-label={`Ver detalles del formulario ${formulario.id}`}
                >
                  Ver más
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
