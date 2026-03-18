<<<<<<< HEAD
# Agenda ADSO v5 📒

Proyecto desarrollado en la **Clase 7** del curso ReactJS — Programa ADSO SENA.

## ¿Qué hace?

Aplicación de gestión de contactos conectada a una API REST local usando JSON Server. Permite crear, listar y eliminar contactos de forma dinámica sin recargar la página.



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



## Tecnologías usadas

- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 📡 JSON Server
- 🔗 Fetch API (GET, POST, DELETE)

## Estructura del proyecto
```
src/
├── api.js                        → Peticiones HTTP al servidor
├── App.jsx                       → Componente principal
├── index.css                     → Estilos globales Tailwind
├── main.jsx                      → Punto de entrada
└── components/
    ├── FormularioContacto.jsx    → Formulario para agregar contactos
    └── ContactoCard.jsx          → Tarjeta individual de contacto
```

## Cómo correrlo

**1. Instalar dependencias:**
```bash
npm install
```

**2. Terminal 1 — Iniciar JSON Server:**
```bash
npx json-server --watch db.json --port 3002
```

**3. Terminal 2 — Iniciar React:**
```bash
npm run dev
```

**4. Abrir en el navegador:**
```
http://localhost:5173
```

## Funcionalidades

- ✅ Listar contactos desde la API (GET)
- ✅ Agregar nuevo contacto (POST)
- ✅ Eliminar contacto (DELETE)
- ✅ Campo empresa (Mini Reto de la clase)
- ✅ Manejo de estados: cargando, error y datos

## Autor

Andres Felipe Alvarez - Sebastian Monsalve Ramos
Programa ADSO — SENA 2026
=======
# 📒 Mini-sitio v4 — Agenda ADSO

Aplicación web para gestionar contactos personales, desarrollada como parte del programa **ADSO**. Permite agregar, visualizar y eliminar contactos, con persistencia de datos gracias a LocalStorage.

---

## 🚀 ¿Qué hace esta app?

- Agregar contactos con nombre, teléfono, correo y profesión
- Visualizar los contactos en tarjetas estilizadas
- Eliminar contactos fácilmente
- Los datos se guardan automáticamente en el navegador (LocalStorage), así no se pierden al recargar la página

---

## 🛠️ Tecnologías usadas

| Tecnología | Uso |
|---|---|
| React | Librería principal para la UI |
| Tailwind CSS | Estilos y diseño visual |
| LocalStorage | Persistencia de datos en el navegador |
| Vite | Entorno de desarrollo |

---

## 📁 Estructura del proyecto

```
src/
├── Components/
│   ├── FormularioContacto.jsx
│   └── ContactoCard.jsx
└── App.jsx
```

---

## 👨‍💻 Autor
ANDRES ALVAREZ 

Desarrollado en la clase 6 — Programa ADSO  
`Clase_6_Agenda_ADSO_v4_Tailwind`
>>>>>>> 4a6280c (Mi sitio v4)
