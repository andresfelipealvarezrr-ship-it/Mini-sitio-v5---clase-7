# Agenda ADSO v5 📒

Proyecto desarrollado en la **Clase 7** del curso ReactJS — Programa ADSO SENA.

## ¿Qué hace?

Aplicación de gestión de contactos conectada a una API REST local usando JSON Server. Permite crear, listar y eliminar contactos de forma dinámica sin recargar la página.

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