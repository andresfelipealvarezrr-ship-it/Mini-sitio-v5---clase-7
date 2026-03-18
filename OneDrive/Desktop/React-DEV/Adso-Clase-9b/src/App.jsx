import { useEffect, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId, actualizarContacto } from "./api.js";
import FormularioContacto from "./components/FormularioContacto";
import { APP_INFO } from "./config.js";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  const [vista, setVista] = useState("crear");

  const irAVerContactos = () => {
    setVista("contactos");
    setContactoEnEdicion(null);
  };

  const irACrearContacto = () => {
    setVista("crear");
    setContactoEnEdicion(null);
    setBusqueda("");
  };

  const estaEnVistaCrear = vista === "crear";
  const estaEnVistaContactos = vista === "contactos";

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

  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setVista("contactos");
  };

  const onCancelarEdicion = () => setContactoEnEdicion(null);

  const onActualizarContacto = async (contactoActualizado) => {
    try {
      const actualizado = await actualizarContacto(contactoActualizado.id, contactoActualizado);
      setContactos((prev) => prev.map((c) => (c.id === actualizado.id ? actualizado : c)));
      setContactoEnEdicion(null);
    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar el contacto");
    }
  };

  const contactosFiltrados = contactos.filter((c) => {
    const t = busqueda.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(t) ||
      c.correo.toLowerCase().includes(t) ||
      (c.etiqueta || "").toLowerCase().includes(t) ||
      (c.telefono || "").toLowerCase().includes(t)
    );
  });

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nA = a.nombre.toLowerCase();
    const nB = b.nombre.toLowerCase();
    if (nA < nB) return ordenAsc ? -1 : 1;
    if (nA > nB) return ordenAsc ? 1 : -1;
    return 0;
  });

  const conteoEtiquetas = contactos.reduce((acc, c) => {
    const etiqueta = c.etiqueta || "Sin etiqueta";
    acc[etiqueta] = (acc[etiqueta] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">

      <header className="bg-slate-900/80 backdrop-blur border-b border-slate-700 px-6 py-3 flex items-center gap-4 sticky top-0 z-10">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-blue-600 flex items-center justify-center font-black text-white text-xl">
          A
        </div>
        <div>
          <h1 className="text-white font-bold text-base leading-tight">{APP_INFO.titulo}</h1>
          <p className="text-slate-400 text-sm">Ficha {APP_INFO.ficha} · SENA CTMA</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={irACrearContacto}
            className={`px-5 py-2 rounded-lg text-base font-semibold transition ${
              estaEnVistaCrear
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            + Crear contacto
          </button>
          <button
            onClick={irAVerContactos}
            className={`px-5 py-2 rounded-lg text-lg font-semibold transition ${
              estaEnVistaContactos
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Ver contactos
          </button>
        </div>
      </header>

      <div className="w-full px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        <div className="lg:col-span-3 space-y-4">

          {error && (
            <div className="rounded-xl bg-red-900/40 border border-red-500/30 px-4 py-3 text-base text-red-300">
              ⚠️ {error}
            </div>
          )}

          <div className="bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-700 overflow-hidden">

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
              <div>
                <h2 className="text-white font-bold text-lg">
                  {estaEnVistaCrear ? "✏️ Modo creación" : "📋 Modo contactos"}
                </h2>
                <p className="text-slate-400 text-sm mt-0.5">
                  {estaEnVistaCrear
                    ? "Agrega un nuevo contacto al sistema"
                    : `${contactosOrdenados.length} contacto${contactosOrdenados.length !== 1 ? "s" : ""} encontrado${contactosOrdenados.length !== 1 ? "s" : ""}`
                  }
                </p>
              </div>
              <button
                onClick={estaEnVistaCrear ? irAVerContactos : irACrearContacto}
                className="text-lg px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition"
              >
                {estaEnVistaCrear ? "Ver contactos →" : "← Volver a crear"}
              </button>
            </div>

            <div className="p-6">
              {estaEnVistaCrear && (
                <FormularioContacto
                  onAgregar={agregarContacto}
                  contactoEnEdicion={null}
                  onActualizar={onActualizarContacto}
                  onCancelarEdicion={onCancelarEdicion}
                />
              )}

              {estaEnVistaContactos && (
                <div className="space-y-4">
                  {contactoEnEdicion && (
                    <FormularioContacto
                      onAgregar={agregarContacto}
                      contactoEnEdicion={contactoEnEdicion}
                      onActualizar={onActualizarContacto}
                      onCancelarEdicion={onCancelarEdicion}
                    />
                  )}

                  <div className="flex flex-col md:flex-row gap-3">
                    <input
                      type="text"
                      className="w-full md:flex-1 rounded-xl border border-slate-600 bg-slate-700/50 text-white placeholder-slate-400 text-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <button
                      onClick={() => setOrdenAsc((prev) => !prev)}
                      className="bg-slate-700 text-slate-300 text-lg px-5 py-2 rounded-xl border border-slate-600 hover:bg-slate-600 transition"
                    >
                      {ordenAsc ? "Ordenar Z-A ↓" : "Ordenar A-Z ↑"}
                    </button>
                  </div>

                  {cargando && (
                    <p className="text-slate-500 text-base">⏳ Cargando contactos...</p>
                  )}

                  {contactosOrdenados.length === 0 && !cargando ? (
                    <p className="text-slate-500 text-base">No se encontraron contactos.</p>
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
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">

          <div className="rounded-2xl bg-linear-to-br from-purple-600 to-blue-700 p-5 text-white">
            <h3 className="font-bold text-lg mb-1">Agenda ADSO — Dashboard</h3>
            <p className="text-purple-200 text-sm mb-4">
              CRUD completo desarrollado con React y JSON Server
            </p>
            <div className="bg-white/20 rounded-xl px-4 py-3 mb-3">
              <p className="text-sm text-purple-200">Contactos registrados</p>
              <p className="text-3xl font-black">{contactos.length}</p>
            </div>
            <p className="text-sm text-purple-200">
              🚀 Este proyecto es tu carta de presentación como desarrollador profesional.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-5">
            <h3 className="text-white font-bold text-base mb-3">📊 Por etiqueta</h3>
            <div className="space-y-2">
              {Object.entries(conteoEtiquetas).map(([etiqueta, count]) => (
                <div key={etiqueta} className="flex items-center justify-between">
                  <span className="text-slate-300 text-sm">{etiqueta}</span>
                  <span className="bg-purple-500/20 text-purple-300 text-sm px-2 py-0.5 rounded-full font-semibold">
                    {count}
                  </span>
                </div>
              ))}
              {Object.keys(conteoEtiquetas).length === 0 && (
                <p className="text-slate-500 text-sm">Sin contactos aún</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-5">
            <h3 className="text-white font-bold text-base mb-3">💡 Tips de código limpio</h3>
            <div className="space-y-3">
              {[
                { titulo: "Nombres descriptivos", desc: "Nombra tus componentes según su responsabilidad." },
                { titulo: "Evita duplicación", desc: "Extrae funciones reutilizables entre componentes." },
                { titulo: "Comenta con intención", desc: "Explica el 'por qué', no el 'qué'." },
                { titulo: "Archivos coherentes", desc: "Un componente debe hacer una sola cosa bien." },
              ].map((tip) => (
                <div key={tip.titulo} className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold">{tip.titulo}</p>
                    <p className="text-slate-400 text-sm">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-5">
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide mb-2">
              SENA CTMA · ADSO
            </p>
            <p className="text-white text-sm mb-2">
              Desarrollo Web — ReactJS · Ficha {APP_INFO.ficha}
            </p>
            <p className="text-slate-400 text-sm italic">
              "Pequeños proyectos bien cuidados valen más que mil ideas sin código."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}