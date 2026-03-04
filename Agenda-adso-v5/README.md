# 📒 Agenda ADSO v5

Aplicación desarrollada en **ReactJS** que permite gestionar una lista de contactos mediante una API REST simulada con **JSON Server**.

Este proyecto fue realizado como parte del programa **ADSO - SENA**, aplicando integración de API, manejo de estado y operaciones CRUD básicas.

---

## 🚀 Tecnologías utilizadas

- ⚛️ React 18
- ⚡ Vite
- 🎨 TailwindCSS
- 🗂 JSON Server
- 🌐 Fetch API

---

## 📌 Funcionalidades implementadas

✅ Listar contactos (GET)  
✅ Crear nuevos contactos (POST)  
✅ Eliminar contactos (DELETE)  
✅ Actualización automática de la interfaz  
✅ Diseño responsivo con TailwindCSS  

---

## 🗂 Estructura del proyecto
Agenda-adso-v5
│
├── public
├── src
│ ├── components
│ │ ├── ContactoCard.jsx
│ │ └── FormularioContacto.jsx
│ ├── api.js
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── db.json
├── package.json
├── vite.config.js
└── tailwind.config.js


▶️ Ejecutar el proyecto

⚠️ Se necesitan dos terminales abiertas.

🔹 Terminal 1 – Iniciar JSON Server
(npx json-server --watch db.json --port 3002)


API disponible en:

http://localhost:3002/contactos

🔹 Terminal 2 – Iniciar React
npm run dev

Aplicación disponible en:

http://localhost:5173

📡 Endpoints disponibles
| Método | Endpoint       | Descripción       |
| ------ | -------------- | ----------------- |
| GET    | /contactos     | Listar contactos  |
| POST   | /contactos     | Crear contacto    |
| DELETE | /contactos/:id | Eliminar contacto |

🎨 Diseño

-La interfaz fue desarrollada utilizando TailwindCSS, aplicando:
-Diseño responsivo
-Paleta de colores morado institucional (#7C3AED)
-Componentes con sombras y bordes redondeados
-Estados hover y focus accesibles

📚 Aprendizajes obtenidos

-Integración de React con API REST
-Manejo de peticiones asíncronas con Fetch
-Gestión de estado con useState y useEffect
-Separación de responsabilidades (api.js)
-Simulación de backend con JSON Server

👨‍💻 Autor

Proyecto desarrollado por:
Andrés Felipe Alvarez Restrepo
Sebastian Monsalve Ramos

Programa ADSO - SENA
2026