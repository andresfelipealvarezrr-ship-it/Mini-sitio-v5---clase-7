import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
    empresa: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.correo) return;
    onAgregar(form);
    setForm({ nombre: "", telefono: "", correo: "", etiqueta: "", empresa: "" });
  };

  return (
    <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Nuevo contacto</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="nombre"
            placeholder="Ej: Camila Pérez"
            value={form.nombre}
            onChange={onChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="telefono"
            placeholder="Ej: 300 123 4567"
            value={form.telefono}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo *</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="correo"
            placeholder="Ej: camila@sena.edu.co"
            value={form.correo}
            onChange={onChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Empresa (opcional)</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="empresa"
            placeholder="Ej: SENA, Google, Independiente…"
            value={form.empresa}
            onChange={onChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Etiqueta (opcional)</label>
        <input
          className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo, Amigo, Profe…"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-colors"
      >
        + Agregar contacto
      </button>
    </form>
  );
}

