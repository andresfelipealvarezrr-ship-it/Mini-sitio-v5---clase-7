
export default function ContactoCard({ nombre, telefono, correo, profesion, onEliminar }) {
  return (
    <div className="relative group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 overflow-hidden max-w-sm w-full">

    
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-violet-500 via-fuchsia-500 to-pink-500" />

      
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {nombre ? nombre.charAt(0).toUpperCase() : "?"}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{nombre}</h2>
          <span className="text-xs font-medium text-violet-500 bg-violet-50 px-2 py-0.5 rounded-full">
            {profesion}
          </span>
        </div>
      </div>

      Teléfono
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>📞</span> <span>{telefono}</span>
        </div>
      Correo electrónico
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>✉️</span> <span>{correo}</span>
        </div>
      </div>

      {/* Botón de eliminar*/}
      <button
        onClick={onEliminar}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-500 font-semibold text-sm hover:bg-red-500 hover:text-white transition-all duration-200 border border-red-100"
      >
        🗑️ Eliminar contacto
      </button>
    </div>
  );
}