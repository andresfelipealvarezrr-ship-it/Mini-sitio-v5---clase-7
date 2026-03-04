export default function ContactoCard({ nombre, telefono, correo, etiqueta, empresa, onEliminar }) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 flex items-start justify-between">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-gray-800">{nombre}</h3>
        <p className="text-gray-600 text-sm">📞 {telefono}</p>
        <p className="text-gray-600 text-sm">✉️ {correo}</p>
        {empresa && (
          <p className="text-gray-600 text-sm">🏢 {empresa}</p>
        )}
        {etiqueta && (
          <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full mt-2">
            {etiqueta}
          </span>
        )}
      </div>
      <button
        onClick={onEliminar}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg shadow transition-colors"
      >
        Eliminar
      </button>
    </div>
  );
}

