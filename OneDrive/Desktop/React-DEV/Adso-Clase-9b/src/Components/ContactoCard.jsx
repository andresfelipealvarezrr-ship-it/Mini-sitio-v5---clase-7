export default function ContactoCard({ nombre, telefono, correo, etiqueta, empresa, onEliminar, onEditar }) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 flex items-start justify-between">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-gray-800">{nombre}</h3>
        <p className="text-gray-600 text-base">📞 {telefono}</p>
        <p className="text-gray-600 text-base">✉️ {correo}</p>
        {empresa && (
          <p className="text-gray-600 text-base">🏢 {empresa}</p>
        )}
        {etiqueta && (
          <span className="inline-block bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full mt-2">
            {etiqueta}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onEliminar}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-semibold"
        >
          Eliminar
        </button>
        <button
          onClick={onEditar}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl text-base font-semibold"
        >
          Editar
        </button>
      </div>
    </div>
  );
}