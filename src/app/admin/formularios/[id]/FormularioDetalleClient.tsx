'use client'

import { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import BotonImprimir from '@/components/BotonImprimir'

export default function FormularioDetalleClient({ formulario }: { formulario: any }) {
  const ref = useRef<HTMLDivElement>(null)

  const {
    formulario: datos,
    users,
    detalle_servicio,
    servicio_internet,
    servicio_internet_movil,
    servicio_IPTV,
    servicio_telefonia,
    servicio_VOZIP,
    factura,
    contacto_user,
  } = formulario

  return (
    <>
      <div ref={ref}>
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6 space-y-8">
          <h1 className="text-3xl text-center font-bold text-blue-800 border-b pb-2">{datos.nombre}</h1>

          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Información General</h2>
            <div className="border border-gray-300 rounded overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-300">
                <div className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Solicitante:</span>
                    <span className="text-gray-800 text-right">{users?.name} {users?.ap_paterno} {users?.ap_materno}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Email:</span>
                    <span className="text-gray-800 text-right">{users?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Teléfono:</span>
                    <span className="text-gray-800 text-right">{users?.phone}</span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Dirección:</span>
                    <span className="text-gray-800 text-right">{users?.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Fecha de Registro:</span>
                    <span className="text-gray-800 text-right">{new Date(datos.created_at).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">ID del Formulario:</span>
                    <span className="text-gray-800 text-right">{datos.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Detalles del cliente</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 border border-gray-300 rounded overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-gray-300">
              {detalle_servicio && (
                <div className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Código Cliente:</span>
                    <span className="text-gray-800 text-right">{detalle_servicio.codigo_cliente}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Cuenta:</span>
                    <span className="text-gray-800 text-right">{detalle_servicio.cuenta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Entidad Cobranzas:</span>
                    <span className="text-gray-800 text-right">{detalle_servicio.entidad_cobranzas}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Suscripción Nueva:</span>
                    <span className="text-gray-800 text-right">{detalle_servicio.suscripcion_nueva ? 'Sí' : 'No'}</span>
                  </div>
                </div>
              )}

              <div className="p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Tipo de Usuario:</span>
                  <span className="text-gray-800 text-right">{datos.tipo_usuario}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Razón Social:</span>
                  <span className="text-gray-800 text-right">{datos.razon_social}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">NIT:</span>
                  <span className="text-gray-800 text-right">{datos.nit}</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-center font-bold text-blue-800 border-b pb-2">SERVICIOS ASOCIADOS</h2>
            <div className="flex flex-col md:flex-row gap-6 border border-gray-300 p-4 rounded">
              <div className="flex-1 space-y-6 md:pr-3 md:border-r border-gray-300">

                {servicio_internet && (
                  <div>
                    <h3 className="font-semibold text-blue-700">Servicio de Internet</h3>
                    <ul className="text-gray-800 text-sm">
                      <li><strong>Nombre:</strong> {servicio_internet.nombre}</li>
                      <li><strong>Instancia:</strong> {servicio_internet.instancia}</li>
                      <li><strong>Plan:</strong> {servicio_internet.plan}</li>
                      <li><strong>Tarifa:</strong> {servicio_internet.tarifa}</li>
                      <li><strong>Velocidad:</strong> {servicio_internet.velocidad}</li>
                      <li><strong>Red IP:</strong> {servicio_internet.red_ip}</li>
                    </ul>
                  </div>
                )}

                {servicio_telefonia && (
                  <div>
                    <h3 className="font-semibold text-blue-700">Servicio de Telefonía</h3>
                    <ul className="text-gray-800 text-sm">
                      <li><strong>Nombre:</strong> {servicio_telefonia.nombre}</li>
                      <li><strong>Número:</strong> {servicio_telefonia.numero}</li>
                      <li><strong>Tarifa:</strong> {servicio_telefonia.tarifa} Bs</li>
                    </ul>
                  </div>
                )}
              </div>

                <div className="flex-1 space-y-6 md:pl-3">
                {servicio_internet_movil && (
                  <div>
                    <h3 className="font-semibold text-blue-700">Servicio de Internet Móvil</h3>
                    <ul className="text-gray-800 text-sm">
                      <li><strong>Nombre:</strong> {servicio_internet_movil.nombre}</li>
                      <li><strong>Teléfono:</strong> {servicio_internet_movil.nro_telefono}</li>
                      <li><strong>Plan:</strong> {servicio_internet_movil.plan}</li>
                      <li><strong>Tarifa:</strong> {servicio_internet_movil.tarifa} Bs</li>
                      <li><strong>Whatsapp:</strong> {servicio_internet_movil.whatsapp ? 'Sí' : 'No'}</li>
                      <li><strong>Telegram:</strong> {servicio_internet_movil.telegram ? 'Sí' : 'No'}</li>
                    </ul>
                  </div>
                )}

                {servicio_VOZIP && (
                  <div>
                    <h3 className="font-semibold text-blue-700">Servicio VozIP</h3>
                    <ul className="text-gray-800 text-sm">
                      <li><strong>Nombre:</strong> {servicio_VOZIP.nombre}</li>
                      <li><strong>Número:</strong> {servicio_VOZIP.numero}</li>
                      <li><strong>Tarifa:</strong> {servicio_VOZIP.tarifa} Bs</li>
                      <li><strong>Correo:</strong> {servicio_VOZIP.correo}</li>
                    </ul>
                  </div>
                )}

                {servicio_IPTV && (
                  <div>
                    <h3 className="font-semibold text-blue-700">Servicio IPTV</h3>
                    <ul className="text-gray-800 text-sm">
                      <li><strong>Nombre:</strong> {servicio_IPTV.nombre}</li>
                      <li><strong>Plan:</strong> {servicio_IPTV.plan}</li>
                      <li><strong>Tarifa:</strong> {servicio_IPTV.tarifa} Bs</li>
                      <li><strong>Nro TVs:</strong> {servicio_IPTV.nro_tvs}</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>

          {(factura || contacto_user) && (
            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Factura y Contacto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 border border-gray-300 rounded overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-gray-300">
                {factura ? (
                  <div className="p-4 space-y-2">
                    <h3 className="text-blue-700 font-semibold mb-2">Factura</h3>
                    <div className="flex justify-between"><span className="font-medium text-gray-600">Nombre:</span><span className="text-gray-800 text-right">{factura.nombre}</span></div>
                    <div className="flex justify-between"><span className="font-medium text-gray-600">NIT:</span><span className="text-gray-800 text-right">{factura.nit}</span></div>
                    <div className="flex justify-between"><span className="font-medium text-gray-600">Dirección:</span><span className="text-gray-800 text-right">{factura.direccion}</span></div>
                    <div className="flex justify-between"><span className="font-medium text-gray-600">Teléfono:</span><span className="text-gray-800 text-right">{factura.telefono}</span></div>
                  </div>
                ) : (
                  <div className="p-4 text-gray-500 italic">No se registró información de factura.</div>
                )}

                {contacto_user ? (
                  <div className="p-4 space-y-2">
                    <h3 className="text-blue-700 font-semibold mb-2">Contacto de Emergencia</h3>
                    <div className="flex justify-between"><span className="font-medium text-gray-600">Nombre:</span><span className="text-gray-800 text-right">{contacto_user.nombre} {contacto_user.apellido}</span></div>
                    <div className="flex justify-between"><span className="font-medium text-gray-600">Vínculo:</span><span className="text-gray-800 text-right">{contacto_user.vinculo}</span></div>
                    <div className="flex justify-between"><span className="font-medium text-gray-600">Teléfono:</span><span className="text-gray-800 text-right">{contacto_user.telefono}</span></div>
                  </div>
                ) : (
                  <div className="p-4 text-gray-500 italic">No se registró contacto de emergencia.</div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      <BotonImprimir contenido={ref} />
    </>
  )
}
