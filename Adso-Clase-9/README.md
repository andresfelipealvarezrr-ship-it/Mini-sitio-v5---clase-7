## Resumen de la Clase 11
¿Qué pedía la actividad?
Completar el CRUD agregando la operación UPDATE (Editar) que faltaba. El proyecto ya tenía Crear, Leer y Eliminar — solo faltaba Editar.

### ¿Qué cambiamos en cada archivo?

## api.js — 1 cosa nueva:

Función actualizarContacto(id, data) que hace un PUT a la API

## App.jsx — 4 cosas nuevas:

Estado contactoEnEdicion (guarda el contacto que se está editando, o null)
Función onEditarClick(contacto) — guarda el contacto en el estado al hacer clic en Editar
Función onCancelarEdicion() — limpia el estado volviendo a null
Función onActualizarContacto() — llama al PUT, actualiza la lista y limpia el estado
Pasó las 4 props nuevas al FormularioContacto

## ContactoCard.jsx — 2 cosas nuevas:

Prop onEditar recibida en el componente
Botón "Editar" azul junto al botón Eliminar

## FormularioContacto.jsx — 5 cosas nuevas:

## 3 props nuevas: 
contactoEnEdicion, onActualizar, onCancelarEdicion
useEffect que carga los datos del contacto en el formulario cuando se va a editar
Lógica condicional en handleSubmit: si hay contacto en edición llama onActualizar, si no llama onAgregar
Título dinámico: "Agregar contacto" / "✏️ Editar contacto"
Botón dinámico: "Guardar contacto" / "Guardar cambios" + botón "Cancelar edición" que solo aparece en modo edición


Clic "Editar" → formulario se llena con datos
     → usuario modifica → clic "Guardar cambios"
          → PUT a la API → lista se actualiza → formulario vuelve a modo crear

          