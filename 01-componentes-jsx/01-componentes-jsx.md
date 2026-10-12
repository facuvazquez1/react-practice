# Tema 1 de 13 · Sección 6: React — Componentes funcionales y JSX

**Ubicación:** carpeta `01-componentes-jsx` · rama `react/01-componentes-jsx` · archivos `src/App.jsx` y `src/components/`

```bash
git branch --show-current   # debe mostrar react/01-componentes-jsx
cd 01-componentes-jsx
npm run dev
```

---

## 1. Qué generó Vite

| Carpeta / archivo | Qué hace | ¿Lo tocás? |
|---|---|---|
| `index.html` | Única página HTML. Tiene un `<div id="root">` vacío y un `<script>` que carga `src/main.jsx`. React dibuja toda la app dentro de ese div. | Casi nunca |
| `src/` | Tu código. Trabajás acá. | Sí |
| `src/main.jsx` | Punto de entrada: le dice a React que dibuje `App` dentro del `#root`. | Casi nunca |
| `src/App.jsx` | Componente raíz de la app. | Sí |
| `src/index.css`, `src/App.css` | Estilos globales y del componente `App`. | Sí |
| `src/assets/` | Imágenes y archivos que importás desde el código. | A veces |
| `public/` | Archivos estáticos servidos tal cual (favicon). | Raro |
| `package.json` | Dependencias y scripts (`npm run dev`, `build`). | Raro |
| `vite.config.js` | Configuración de Vite. | No por ahora |
| `eslint.config.js` | Reglas del linter, que avisa errores de código. | No |
| `node_modules/` | Dependencias instaladas. Se regenera con `npm install` y no se sube a Git. | Nunca |
| `.gitignore` | Archivos que Git ignora (incluye `node_modules`). | No |

### Los `import` / `export` de `main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

| Línea | Qué hace |
|---|---|
| `import { StrictMode } from 'react'` | **Named import** de un paquete de `node_modules`. Las llaves indican que traés una pieza con ese nombre exacto. |
| `import { createRoot } from 'react-dom/client'` | Ídem. `react-dom` es el paquete que conecta React con el navegador. |
| `import './index.css'` | Import **sin nombre**: solo carga el archivo. Así se aplican los estilos. |
| `import App from './App.jsx'` | **Default import** de un archivo tuyo. Sin llaves, y el nombre `App` lo elegís vos. La ruta empieza con `./` (misma carpeta) y en Vite se escribe con extensión. |
| `createRoot(...).render(...)` | Toma el `#root` del HTML y dibuja ahí lo que le pasás. |
| `<StrictMode>` | Activa chequeos extra solo en desarrollo. No cambia lo que ves. |

En `App.jsx`, la última línea es `export default App`: es lo que hace posible el `import App from './App.jsx'`.

**Dos formas de exportar:**

```jsx
// Default: UNO por archivo. Se importa sin llaves, con el nombre que quieras.
export default Saludo
import Saludo from './components/Saludo.jsx'

// Named: puede haber varios. Se importa con llaves y el nombre exacto.
export function Boton() { ... }
import { Boton } from './components/Boton.jsx'
```

En este tema usamos **`export default`** para cada componente.

---

## 2. Componentes funcionales y JSX

**Componente:** una función de JavaScript que devuelve lo que se tiene que mostrar en pantalla. Cada pieza de la interfaz (header, tarjeta, botón) es un componente, y se combinan entre sí.

**JSX:** una sintaxis que permite escribir algo parecido a HTML dentro de JavaScript. El navegador no la entiende: Vite la convierte a JavaScript común antes de ejecutarla. **JSX no es HTML**, tiene sus propias reglas.

### Reglas de los componentes
- El nombre **empieza con mayúscula** (`Saludo`, no `saludo`). Con minúscula, React lo interpreta como una etiqueta HTML.
- Se usa como etiqueta: `<Saludo />`.
- Debe **devolver** JSX con `return`.

### Reglas de JSX

| Regla | Mal | Bien |
|---|---|---|
| Un solo elemento raíz. Si no querés un `div` extra, usá Fragment `<>...</>` | `<h1/><p/>` | `<><h1/><p/></>` |
| Todas las etiquetas se cierran | `<img src="a.png">` | `<img src="a.png" />` |
| `class` → `className`, `for` → `htmlFor` | `<div class="x">` | `<div className="x">` |
| Atributos en camelCase | `tabindex`, `onclick` | `tabIndex`, `onClick` |
| JavaScript dentro de JSX va entre `{ }` | `<p>nombre</p>` (texto literal) | `<p>{nombre}</p>` |
| Dentro de `{ }` van **expresiones** (valores), no sentencias (`if`, `for`) | `{if (x) ...}` | `{x ? 'a' : 'b'}` |
| `style` recibe un **objeto**, de ahí las dobles llaves | `style="color:red"` | `style={{ color: 'red' }}` |
| Comentarios entre etiquetas | `<!-- -->` o `//` | `{/* comentario */}` |

### Errores comunes
- Escribir `return` y bajar de línea: JavaScript corta ahí. Hay que abrir el paréntesis en la misma línea: `return (`.
- Intentar mostrar un objeto dentro de `{ }` (no se puede, mostrá sus propiedades).
- Olvidar el `export default` o el `import` y recibir `X is not defined`.
- Usar `//` entre etiquetas: se muestra como texto en pantalla. Solo funciona en el código JavaScript, antes del `return`.

---

## 3. Ejemplo concreto

Archivo `src/components/EtiquetaPrecio.jsx`:

```jsx
function EtiquetaPrecio() {
  const producto = 'Zapatillas'
  const precio = 85000
  const enOferta = true

  const estiloPrecio = { color: enOferta ? 'green' : 'black', fontWeight: 'bold' }

  return (
    <div className="etiqueta">
      <p>{producto}</p>
      <p style={estiloPrecio}>${precio}</p>
      {enOferta ? <span>¡En oferta!</span> : <span>Precio normal</span>}
    </div>
  )
}

export default EtiquetaPrecio
```

Usarlo desde `App.jsx`:

```jsx
import EtiquetaPrecio from './components/EtiquetaPrecio.jsx'

function App() {
  return <EtiquetaPrecio />
}

export default App
```

---

## 4. Ejercicios

> No hagas commits entre ejercicios. Antes de pasar al siguiente, mirá el navegador y la consola (F12) para confirmar que no hay errores. El commit es uno solo, al cerrar el tema (ver sección 6).

### Ejercicio 1: limpiar la plantilla
Borrá lo que trae Vite en `App.jsx` y dejá un `App` que devuelva un `<h1>` con tu nombre. Eliminá `App.css`, su import y el contenido de `src/assets/` que no uses.

- [ ] La página muestra solo el `<h1>`
- [ ] No hay errores en consola

### Ejercicio 2: tu primer componente
Creá la carpeta `src/components/` y dentro `Saludo.jsx`, con un componente que devuelva un `<p>`. Importalo en `App` y renderizalo 3 veces.

- [ ] Se ven 3 párrafos
- [ ] El componente vive en su propio archivo con `export default`

### Ejercicio 3: expresiones con `{ }`
Creá `Perfil.jsx` con constantes `nombre`, `edad` y `juegoFavorito`. Mostralas en párrafos y agregá una línea "¿Mayor de edad?" que muestre "Sí" o "No" según la edad.

Concepto nuevo, el operador ternario como expresión: `{edad >= 18 ? 'Sí' : 'No'}`

- [ ] Al cambiar `edad` a 15 o a 20, el texto cambia solo

### Ejercicio 4: atributos y `style`
Creá `Avatar.jsx`: un `<img>` cuyo `src` y `alt` vengan de variables, con `className="avatar"` y un `style` con borde redondeado y un ancho fijo. Podés usar una imagen de `src/assets/` (importándola) o una URL.

Concepto nuevo, importar una imagen: `import logo from '../assets/logo.png'` y usar `src={logo}`. Desde `components/` hay que subir una carpeta con `../`.

- [ ] La imagen se ve redondeada
- [ ] El `alt` está presente

### Ejercicio 5: Fragment
Creá `Encabezado.jsx` que devuelva un `<h1>` y un `<p>` **sin** un `div` envolvente. Abrí DevTools → Elements y verificá que el `h1` y el `p` quedan sueltos.

Concepto nuevo: `<> ... </>` es el Fragment, que agrupa sin agregar elementos al DOM.

- [ ] En Elements no aparece ningún `div` extra generado por ese componente

### Ejercicio 6: formulario en JSX
Creá `FormularioContacto.jsx` con un `label` + `input` de nombre, otro de email y un `button`. Cada `label` asociado a su `input` con `htmlFor`/`id`. Dejá un comentario JSX **entre las etiquetas**, arriba del formulario.

Concepto nuevo, comentario en JSX: `{/* esto es un comentario */}`

- [ ] Al hacer click en el texto del `label`, el cursor entra en el `input` correspondiente
- [ ] El comentario no se ve en pantalla

### Ejercicio 7: romper y leer errores
Creá un archivo `NOTAS.md` en la carpeta del proyecto. Provocá **uno por vez** estos errores en un componente, anotá en `NOTAS.md` qué mensaje aparece (consola y/o pantalla) y qué lo causó, y restaurá el código:

1. Nombre de componente en minúscula (`<saludo />`).
2. Dos elementos raíz sin Fragment.
3. `<img>` sin cerrar.

- [ ] `NOTAS.md` tiene los 3 errores con su mensaje y causa
- [ ] La app vuelve a funcionar

---

## 5. Reto final (sin pistas)

Armá una **"Ficha de videojuego"** en `App`, con al menos 3 componentes propios, cada uno en su archivo dentro de `src/components/`:

- [ ] `App.jsx` solo compone: no tiene datos ni lógica propios
- [ ] Muestra título, género, año, un estado "Disponible" / "Agotado" (con ternario) y una imagen
- [ ] Usa al menos una vez: `className` con estilos en `index.css`, un `style` inline, un Fragment y un comentario JSX
- [ ] Sin errores ni warnings en la consola

Cuando lo tengas, pasale el código de los archivos al profesor para revisarlo.

---

## 6. Git (al cerrar el tema)

Un solo commit por tema, cuando el reto final esté aprobado:

```bash
git add .
git commit -m "feat: agregar componentes y reglas básicas de JSX"
```

Los comandos de push, PR y merge te los da el profesor al aprobar el reto.

---

## Para investigar por tu cuenta
En react.dev (sección *Learn*): **"Your First Component"** y **"Writing Markup with JSX"**. Fijate en especial en las reglas de JSX y en `import`/`export` de componentes.
