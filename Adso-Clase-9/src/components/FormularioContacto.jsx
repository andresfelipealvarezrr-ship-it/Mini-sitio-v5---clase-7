// Archivo: src/components/FormularioContacto.jsx
import { useState, useEffect } from "react";

const ETIQUETAS = ["Amigo", "Trabajo", "Familia", "Otro"];

const ESTADO_INICIAL = {
  nombre: "",
  telefono: "",
  correo: "",
  etiqueta: "Amigo",
};

function FormularioContacto({ onAgregar, contactoEnEdicion, onActualizar, onCancelarEdicion }) {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  // === NUEVO CLASE 11: cargar datos al entrar en modo edición ===
  useEffect(() => {
    if (contactoEnEdicion) {
      setForm({
        nombre: contactoEnEdicion.nombre || "",
        telefono: contactoEnEdicion.telefono || "",
        correo: contactoEnEdicion.correo || "",
        etiqueta: contactoEnEdicion.etiqueta || "Amigo",
      });
      setErrores({});
    } else {
      setForm(ESTADO_INICIAL);
    }
  }, [contactoEnEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (form.nombre.trim().length < 2) {
      nuevosErrores.nombre = "El nombre debe tener al menos 2 caracteres.";
    }
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (!/^\d{7,15}$/.test(form.telefono.trim())) {
      nuevosErrores.telefono = "El teléfono debe tener entre 7 y 15 dígitos numéricos.";
    }
    if (form.correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.trim())) {
      nuevosErrores.correo = "El correo no tiene un formato válido.";
    }
    return nuevosErrores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresEncontrados = validar();
    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      return;
    }
    try {
      setEnviando(true);
      setErrores({});
      const contacto = {
        nombre: form.nombre.trim(),
        telefono: form.telefono.trim(),
        correo: form.correo.trim(),
        etiqueta: form.etiqueta,
      };

      // === NUEVO CLASE 11: lógica condicional crear vs editar ===
      if (contactoEnEdicion) {
        await onActualizar({ ...contacto, id: contactoEnEdicion.id });
      } else {
        await onAgregar(contacto);
        setForm(ESTADO_INICIAL);
        setExito(true);
        setTimeout(() => setExito(false), 3000);
      }
    } catch {
      // El error global es manejado por App.jsx
    } finally {
      setEnviando(false);
    }
  };

  const modoEdicion = Boolean(contactoEnEdicion);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        {modoEdicion ? "✏️ Editar contacto" : "Agregar contacto"}
      </h2>

      {exito && (
        <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
          <p className="text-sm font-medium text-green-700">✓ Contacto guardado correctamente.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Ana García"
              className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errores.nombre ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
              }`}
            />
            {errores.nombre && <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Teléfono *
            </label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Ej: 3101234567"
              className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errores.telefono ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
              }`}
            />
            {errores.telefono && <p className="mt-1 text-xs text-red-600">{errores.telefono}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Correo electrónico
            </label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="Ej: ana@correo.com"
              className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errores.correo ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
              }`}
            />
            {errores.correo && <p className="mt-1 text-xs text-red-600">{errores.correo}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Etiqueta
            </label>
            <select
              name="etiqueta"
              value={form.etiqueta}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500"
            >
              {ETIQUETAS.map((etiqueta) => (
                <option key={etiqueta} value={etiqueta}>{etiqueta}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            disabled={enviando}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold rounded-xl transition"
          >
            {enviando ? "Guardando..." : modoEdicion ? "Guardar cambios" : "Guardar contacto"}
          </button>

          {/* === NUEVO CLASE 11: botón cancelar solo en modo edición === */}
          {modoEdicion && (
            <button
              type="button"
              onClick={onCancelarEdicion}
              className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold rounded-xl transition"
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormularioContacto;
