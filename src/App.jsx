import { useState, useEffect } from "react";
import FormularioContacto from "./Components/FormularioContacto";
import ContactoCard from "./Components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState(() => {
  const guardados = localStorage.getItem("contactos");
  return guardados ? JSON.parse(guardados) : [];
});


useEffect(() => {
  localStorage.setItem("contactos", JSON.stringify(contactos));
}, [contactos]);

  const agregarContacto = (nuevoContacto) => {
    setContactos([...contactos, { ...nuevoContacto, id: Date.now() }]);
  };

  const eliminarContacto = (id) => {
    setContactos(contactos.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-fuchsia-50 p-8">
      <div className="max-w-5xl mx-auto">

        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">📒 Mi Agenda ADSO V4</h1>
          <p className="text-gray-400 mt-2 text-sm">Gestiona tus contactos fácilmente</p>
        </div>

      {/* Etiqueta ADSO */}
      <p className="bg-violet-500 text-white text-xs rounded px-2 py-1 w-fit mx-auto mt-2">
       ADSO
         </p>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="w-full lg:w-auto">
            <FormularioContacto onAgregar={agregarContacto} />
          </div>

          <div className="flex-1">
            {contactos.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">
                <p className="text-5xl mb-3">👤</p>
                <p className="text-sm">Aún no tienes contactos. ¡Agrega uno!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactos.map((c) => (
                  <ContactoCard
                    key={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    profesion={c.profesion}
                    onEliminar={() => eliminarContacto(c.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

