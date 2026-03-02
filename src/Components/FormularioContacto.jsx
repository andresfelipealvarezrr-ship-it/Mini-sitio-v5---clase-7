import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    profesion: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    onAgregar(form);
    setForm({ nombre: "", telefono: "", correo: "", profesion: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 w-full max-w-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Nueva Agenda</h1>
        <p className="text-sm text-gray-400 mt-1">Agrega un nuevo contacto</p>
        <div className="w-12 h-1 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full mt-3" />
      </div>

      <div className="space-y-4">
        {[
          { label: "Nombre completo", name: "nombre", type: "text", placeholder: "Ej: Juan Pérez" },
          { label: "Teléfono", name: "telefono", type: "tel", placeholder: "Ej: 300 123 4567" },
          { label: "Correo electrónico", name: "correo", type: "email", placeholder: "Ej: juan@correo.com" },
          { label: "Profesión", name: "profesion", type: "text", placeholder: "Ej: Desarrollador" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-linear-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md mt-2"
        >
          ＋ Agregar contacto
        </button>
      </div>
    </div>
  );
}

