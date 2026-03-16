import { useEffect, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId, actualizarContacto } from "./api.js";
import FormularioContacto from "./Components/FormularioContacto";
import { APP_INFO } from "./config.js";
import ContactoCard from "./Components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);

  // === NUEVO CLASE 11: contacto en edición ===
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  useEffect(() => {
    async function cargarContactos() {
      try {
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error(error);
        setError("No se pudo cargar la lista de contactos");
      } finally {
        setCargando(false);
      }
    }
    cargarContactos();
  }, []);

  const agregarContacto = async (nuevo) => {
    try {
      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error(error);
      setError("No se pudo agregar el contacto");
    }
  };

  const eliminarContacto = async (id) => {
    try {
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar el contacto");
    }
  };

  // === NUEVO CLASE 11: iniciar edición ===
  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
  };

  // === NUEVO CLASE 11: cancelar edición ===
  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
  };

  // === NUEVO CLASE 11: guardar cambios (PUT) ===
  const onActualizarContacto = async (contactoActualizado) => {
    try {
      const actualizado = await actualizarContacto(contactoActualizado.id, contactoActualizado);
      setContactos((prev) =>
        prev.map((c) => (c.id === actualizado.id ? actualizado : c))
      );
      setContactoEnEdicion(null);
    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar el contacto");
    }
  };

  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(termino) ||
      c.correo.toLowerCase().includes(termino) ||
      (c.etiqueta || "").toLowerCase().includes(termino) ||
      (c.telefono || "").toLowerCase().includes(termino)
    );
  });

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;
  });

  const textoResultados =
    contactosOrdenados.length === 1
      ? "Mostrando 1 contacto"
      : `Mostrando ${contactosOrdenados.length} contactos`;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="max-w-6xl mx-auto px-6 pt-8 pb-2">
        <p className="text-sm font-semibold text-gray-400 tracking-widest uppercase">
          Desarrollo web ReactJS FICHA {APP_INFO.ficha}
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
          {APP_INFO.titulo}
        </h1>
        <p className="text-gray-500 mt-1">{APP_INFO.subtitulo}</p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            ⚠️ {error}
          </div>
        )}
        {cargando && (
          <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm text-purple-700">
            ⏳ Cargando contactos desde la API...
          </div>
        )}

        <FormularioContacto
          onAgregar={agregarContacto}
          contactoEnEdicion={contactoEnEdicion}
          onActualizar={onActualizarContacto}
          onCancelarEdicion={onCancelarEdicion}
        />

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <input
              type="text"
              className="w-full md:flex-1 rounded-xl border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm px-3 py-2"
              placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setOrdenAsc((prev) => !prev)}
              className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200 transition"
            >
              {ordenAsc ? "Ordenar Z-A ↓" : "Ordenar A-Z ↑"}
            </button>
          </div>

          <p className="text-xs text-gray-400">{textoResultados}</p>

          {contactosOrdenados.length === 0 && !cargando ? (
            <p className="text-gray-500 text-sm">
              No se encontraron contactos que coincidan con la búsqueda.
            </p>
          ) : (
            contactosOrdenados.map((c) => (
              <ContactoCard
                key={c.id}
                {...c}
                onEliminar={() => eliminarContacto(c.id)}
                onEditar={() => onEditarClick(c)}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
