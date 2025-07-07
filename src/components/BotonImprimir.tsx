'use client' 

import { useRef } from 'react'
import html2pdf from 'html2pdf.js'

export default function BotonImprimir({ contenido }: { contenido: React.RefObject<HTMLDivElement> }) {
  const handleDownload = () => {
    if (!contenido.current) return

    const opt = {
      margin:       0.5,
      filename:     'Formulario.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().set(opt).from(contenido.current).save()
  }

  return (
    <div className="text-center mt-4">
      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-8 py-4 rounded hover:bg-blue-700"
      >
        Descargar en PDF
      </button>
    </div>
  )
}