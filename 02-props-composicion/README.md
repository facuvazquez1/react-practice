# Tema 2 de 13 · Sección 6: React — Props y composición

**Ubicación:** carpeta `02-props-composicion` · rama `react/02-props-composicion` · se trabaja en `src/App.jsx` y en `src/components/`.

---

## 0. Setup del proyecto

Ya estás en la rama `react/02-props-composicion`. Desde la raíz del repo (`react-practice`), en Git Bash:

```bash
npm create vite@latest 02-props-composicion -- --template react
cd 02-props-composicion
npm install
npm run dev
```

Limpieza inicial (igual que en el tema 1):

- Borrá `src/App.css` y la carpeta `src/assets/`.
- Vaciá `src/index.css` (o dejá solo un reset mínimo).
- Dejá `src/App.jsx` así:

```jsx
export default function App() {
  return <h1>Tema 2</h1>;
}
```

- Creá la carpeta `src/components/`. No es una exigencia de Vite ni de React: es una convención para guardar un componente por archivo.

---

## 1. Explicación técnica

### Qué son las props

Las **props** (properties) son los datos que un componente recibe de quien lo usa. Se pasan como atributos en el JSX y llegan a la función del componente como **un único objeto** en el primer parámetro.

```jsx
// Se pasan así:
<Saludo nombre="Facu" edad={25} />

// Llegan así: props = { nombre: "Facu", edad: 25 }
function Saludo(props) {
  return <p>{props.nombre} tiene {props.edad}</p>;
}
```

Sirven para que un mismo componente muestre contenido distinto según los datos que reciba.

### Destructuring de props

Lo normal es desestructurar el objeto directamente en el parámetro (es el destructuring de objetos de JS, sección 4):

```jsx
function Saludo({ nombre, edad }) {
  return <p>{nombre} tiene {edad}</p>;
}
```

Valores por defecto: se escriben en el destructuring.

```jsx
function Saludo({ nombre, edad = 18 }) { ... }
```

El default se aplica solo si la prop es `undefined` (no se pasó). Si se pasa `null`, **no** se aplica.

### Qué tipos se pueden pasar

| Tipo | Cómo se escribe |
|---|---|
| String | `titulo="Hola"` (comillas) |
| Number | `edad={25}` |
| Boolean | `activo={true}` o simplemente `activo` (equivale a `true`) |
| Array | `items={["a", "b"]}` |
| Objeto | `jugador={{ nombre: "Leo", dorsal: 10 }}` (llaves de JSX + llaves del objeto) |
| Función | `alCerrar={cerrar}` |
| JSX | `icono={<Estrella />}` |

Regla: todo lo que **no** es un string literal va entre `{ }`. `edad="25"` pasa el **string** `"25"`, no el número.

### Las props son de solo lectura

Un componente **nunca modifica** sus props. Si necesita un valor distinto, lo calcula en una variable local. React deja el objeto de props congelado y asignarle una propiedad lanza un error. (Para datos que sí cambian existe el state: tema 3.)

### `children` y composición

Todo lo que escribís **entre** la etiqueta de apertura y la de cierre de un componente llega en una prop especial llamada `children`.

```jsx
function Caja({ titulo, children }) {
  return (
    <section>
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}

<Caja titulo="Novedades">
  <p>Hola</p>
  <p>Chau</p>
</Caja>
```

**Composición** es armar interfaces combinando componentes: uno genérico define la estructura (`Caja`) y quien lo usa decide el contenido interno. Se prefiere a copiar y pegar variantes casi iguales de un componente.

### Import / export (qué hace cada línea)

Cada componente vive en su archivo y se comparte con `export`; se usa en otro archivo con `import`.

**Export por defecto (`default`)**: un solo `default` por archivo.

```jsx
// src/components/Caja.jsx
export default function Caja() { ... }
```
```jsx
// src/App.jsx
import Caja from "./components/Caja.jsx";
```
- Sin llaves.
- El nombre lo elegís vos al importar (por convención, el mismo que el del componente).

**Export con nombre (`named`)**: puede haber varios por archivo.

```jsx
// src/components/Botones.jsx
export function BotonOk() { ... }
export function BotonCancelar() { ... }
```
```jsx
import { BotonOk, BotonCancelar } from "./components/Botones.jsx";
```
- Con llaves.
- El nombre tiene que coincidir exacto con el exportado.

**Rutas:**
- `./` y `../` = relativa al archivo actual (`./` misma carpeta, `../` carpeta superior).
- Sin `./` (ej. `"react"`) = paquete instalado en `node_modules`.

### Errores comunes

- Nombre de componente en minúscula: `<caja />` se interpreta como etiqueta HTML. Tiene que empezar con mayúscula.
- Pasar un número o booleano entre comillas (`edad="25"`).
- Modificar una prop (`props.nombre = "x"`).
- Importar un `default` con llaves, o un `named` sin llaves.
- Escribir mal el nombre de una prop: llega `undefined` y no hay error visible.
- Usar `class` en vez de `className` en JSX.
- Olvidar el `{children}` dentro del componente: lo que escribas entre las etiquetas no se muestra.

---

## 2. Ejemplo concreto

Una etiqueta con texto y tipo (con valor por defecto), y un contenedor que usa `children`.

```jsx
// src/components/Etiqueta.jsx
export default function Etiqueta({ texto, tipo = "info" }) {
  return <span className={`etiqueta etiqueta-${tipo}`}>{texto}</span>;
}
```

```jsx
// src/components/Panel.jsx
export default function Panel({ titulo, children }) {
  return (
    <section className="panel">
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}
```

```jsx
// src/App.jsx
import Panel from "./components/Panel.jsx";
import Etiqueta from "./components/Etiqueta.jsx";

export default function App() {
  return (
    <Panel titulo="Novedades">
      <Etiqueta texto="Nuevo" />
      <Etiqueta texto="Agotado" tipo="error" />
    </Panel>
  );
}
```

Qué pasa: `App` renderiza `Panel`; los dos `Etiqueta` van a `children`. La primera usa `tipo="info"` por defecto; la segunda recibe `"error"`.

---

## 3. Ejercicios

Todos en `02-props-composicion`. Cada componente en su propio archivo dentro de `src/components/`.

### Ejercicio 1: Primer componente con props, en su archivo
**Consigna:** creá `JugadorCard.jsx` que reciba `nombre`, `equipo` y `posicion` y los muestre (un `h3` con el nombre y dos `p`). Importalo en `App.jsx` y usalo 3 veces con datos distintos.
**Terminado cuando:** se ven 3 tarjetas distintas en el navegador, el componente usa `export default` y `App.jsx` lo importa con `import ... from "./components/JugadorCard.jsx"`.

### Ejercicio 2: Props que no son strings
**Consigna:** creá `Partido.jsx` que reciba `local` (string), `visitante` (string), `golesLocal` (number), `golesVisitante` (number), `jugado` (boolean) y `goleadores` (array de strings). Mostrá: `local golesLocal - golesVisitante visitante`, la cantidad de goleadores (`goleadores.length`) y la lista unida con `goleadores.join(", ")`. Usá `jugado` para elegir la clase CSS del contenedor: `className={jugado ? "partido jugado" : "partido pendiente"}` (es un ternario común de JS; el render condicional como tema aparece más adelante).
**Terminado cuando:** usás el componente con al menos un partido `jugado` y otro no, todos los valores no-string van entre `{ }` y se ven distintos estilos según `jugado`.

### Ejercicio 3: Default values
**Consigna:** a `JugadorCard` agregale las props `goles` (default `0`) y `capitan` (default `false`). Mostrá los goles. Usá una de las tarjetas **sin** pasar `goles` ni `capitan`, y otra pasándolos.
**Terminado cuando:** la tarjeta sin props nuevas muestra `0` goles y la otra muestra el valor que le pasaste. Los defaults están escritos en el destructuring del parámetro.

### Ejercicio 4: Las props son de solo lectura
**Consigna:** en un componente nuevo `Titulo.jsx` que reciba `texto`, escribí dentro de la función `props.texto = props.texto.toUpperCase()` (usando `props` como parámetro, sin destructuring). Mirá la consola del navegador. Después arreglalo: en vez de modificar la prop, guardá el resultado en una variable local y mostrala.
**Terminado cuando:** viste el error en la consola, entendés por qué aparece, y la versión final muestra el texto en mayúsculas sin tocar `props`.

> Concepto mínimo, ya que `toUpperCase()` aparece acá: es un método de string que devuelve un **string nuevo** y no modifica el original. `"hola".toUpperCase()` → `"HOLA"`.

### Ejercicio 5: `children`
**Consigna:** creá `Tarjeta.jsx` con un `div` que tenga borde y padding, un `h2` con la prop `titulo` y, debajo, `{children}`. Usala 3 veces en `App.jsx` con contenido interno distinto: texto, un `JugadorCard` y un `Partido`.
**Terminado cuando:** el mismo `Tarjeta` muestra tres contenidos diferentes y no tiene ningún dato de jugador ni de partido escrito adentro.

### Ejercicio 6: Función como prop
**Consigna:** creá `Boton.jsx` que reciba `texto` y `alHacerClick` y renderice un `<button>` que ejecute esa función al hacer click. En `App.jsx` definí una función que haga `console.log` de algo y pasásela. Usá el botón dos veces con funciones distintas.
**Terminado cuando:** al hacer click en cada botón aparece su mensaje propio en la consola.

> Concepto mínimo: una función se pasa **sin ejecutarla** (sin paréntesis) y el atributo `onClick` de un `<button>` la ejecuta cuando hay un click. (Los eventos se ven a fondo en el tema 4.)
> ```jsx
> function Aviso({ alCerrar }) {
>   return <button onClick={alCerrar}>Cerrar</button>;
> }
>
> function avisar() { console.log("cerrado"); }
> <Aviso alCerrar={avisar} />
> ```

### Ejercicio 7: Named exports y varios componentes por archivo
**Consigna:** creá `src/components/Insignias.jsx` que exporte **con nombre** tres componentes: `InsigniaOro`, `InsigniaPlata` y `InsigniaBronce` (cada uno recibe `texto` y muestra un `span` con una clase distinta). Importalos en `App.jsx` en una sola línea y usalos dentro de un `Tarjeta`.
**Terminado cuando:** funciona con `import { InsigniaOro, InsigniaPlata, InsigniaBronce } from "./components/Insignias.jsx"` y podés explicar con tus palabras por qué acá hay llaves y en los otros archivos no.

---

## 4. Reto final (sin pistas)

**"Tarjeta de partido"**

Armá una tarjeta de partido de fútbol usando solo composición y props:

- Un componente `TarjetaPartido` que sea el contenedor y reciba `titulo` (ej. "Fecha 5") y `children`.
- Un componente `Equipo` que reciba `nombre`, `goles` (default `0`) y `esLocal` (boolean).
- Un componente `Marcador` que reciba los goles de ambos equipos y los muestre juntos.
- Un botón reutilizable (`Boton`) que reciba una función por props y se use dentro de la tarjeta.
- Usá la tarjeta 3 veces con datos distintos, cada una con contenido interno diferente.
- Todo en archivos separados, mezclando `export default` y export con nombre donde corresponda.

**Terminado cuando:** se ven 3 tarjetas distintas, ningún dato está escrito dentro de los componentes (todo llega por props), no modificás ninguna prop y no hay errores ni warnings en la consola.

---

## 5. Para investigar en react.dev

- *Passing Props to a Component*
- *Passing JSX as children* (en la misma guía)
- *Importing and Exporting Components*
- *Keeping Components Pure* (por qué las props no se modifican)