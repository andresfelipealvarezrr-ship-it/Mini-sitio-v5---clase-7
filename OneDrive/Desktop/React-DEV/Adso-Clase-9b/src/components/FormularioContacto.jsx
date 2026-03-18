import { useState, useEffect } from "react";

export default function FormularioContacto({ onAgregar, contactoEnEdicion, onActualizar, onCancelarEdicion }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
    empresa: "",
  });

  useEffect(() => {
    if (contactoEnEdicion) {
  // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        nombre: contactoEnEdicion.nombre || "",
        telefono: contactoEnEdicion.telefono || "",
        correo: contactoEnEdicion.correo || "",
        etiqueta: contactoEnEdicion.etiqueta || "",
        empresa: contactoEnEdicion.empresa || "",
      });
    } else {
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
        empresa: "",
      });
    }
  }, [contactoEnEdicion]);

  const [errores, setErrores] = useState({});
  const [, setEnviando] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.telefono.trim()) nuevosErrores.telefono = "El teléfono es obligatorio.";
    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe incluir @";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      if (contactoEnEdicion) {
        await onActualizar({ ...contactoEnEdicion, ...form });
      } else {
        await onAgregar(form);
      }
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "", empresa: "" });
      setErrores({});
    } catch (error) {
      alert("Error al guardar contacto: " + error.message);
    }

    setEnviando(false);
  };

  return (
    <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
      <h2 className="text-xl font-bold text-gray-800">
        {contactoEnEdicion ? "Editar contacto" : "Nuevo contacto"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="nombre"
            placeholder="Ej: Camila Pérez"
            value={form.nombre}
            onChange={onChange}
          />
          {errores.nombre && <p className="text-red-500 text-base mt-1">{errores.nombre}</p>}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Teléfono *</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="telefono"
            placeholder="Ej: 300 123 4567"
            value={form.telefono}
            onChange={onChange}
          />
          {errores.telefono && <p className="text-red-500 text-base mt-1">{errores.telefono}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Correo *</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="correo"
            placeholder="Ej: camila@sena.edu.co"
            value={form.correo}
            onChange={onChange}
          />
          {errores.correo && <p className="text-red-500 text-base mt-1">{errores.correo}</p>}
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">Empresa (opcional)</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            name="empresa"
            placeholder="Ej: SENA, Google, Independiente…"
            value={form.empresa}
            onChange={onChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-1">Etiqueta (opcional)</label>
        <input
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo, Amigo, Profe…"
          value={form.etiqueta}
          onChange={onChange}
        />
        {errores.etiqueta && <p className="text-red-500 text-base mt-1">{errores.etiqueta}</p>}
      </div>

      <div className="flex gap-4 mt-2">
        <button
          type="submit"
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-base font-semibold shadow-sm transition-colors"
        >
          {contactoEnEdicion ? "Actualizar contacto" : "Agregar contacto"}
        </button>

        <button
          type="button"
          onClick={onCancelarEdicion}
          className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl text-base font-semibold shadow-sm transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}