# Practica de REACT 

# Estructura de un proyecto Vite + React

| Archivo | Qué hace |
|---|---|
| `index.html` | Única página HTML. Tiene un `<div id="root">` vacío donde React dibuja todo. |
| `src/main.jsx` | **Punto de entrada.** Le dice a React: "dibujá `<App />` dentro del `#root`". |
| `src/App.jsx` | Componente principal. **Acá se trabaja.** |
| `src/index.css` / `src/App.css` | Estilos globales / estilos de App. |
| `package.json` | Lista de dependencias y scripts (`npm run dev`). |
| `package-lock.json` | Versiones exactas instaladas de cada dependencia. No se edita a mano. |
| `vite.config.js` | Configuración de Vite. Por ahora no se toca. |
| `eslint.config.js` | Reglas del linter (avisa errores y malas prácticas en el código). |
| `public/` | Archivos estáticos (imágenes, favicon). |
| `node_modules/` | Dependencias descargadas. Está en `.gitignore`, no se sube a GitHub. |
| `.gitignore` | Qué archivos ignora Git (`node_modules`, etc.). |
| `README.md` | Documentación del proyecto. |