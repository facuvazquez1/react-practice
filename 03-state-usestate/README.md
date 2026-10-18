# Tema 3: State con `useState`

**Tema 3 de 13 · Sección 6: React**
**Ubicación:** carpeta `03-state-usestate` · rama `react/03-state-usestate` · archivo `src/App.jsx` (y los componentes nuevos en `src/components/`)

---

## 0. Setup (antes de empezar)

Desde la raíz del repo `react-practice`, en Git Bash:

```bash
git switch main
git pull
git switch -c react/03-state-usestate
npm create vite@latest 03-state-usestate -- --template react
cd 03-state-usestate
npm install
npm run dev
```

- Si Vite pregunta por opciones experimentales (rolldown, React Compiler, etc.), elegí **No**.
- Abrí la URL que muestra la terminal (normalmente `http://localhost:5173`).
- Trabajás en `src/App.jsx`. Borrá el contenido de ejemplo igual que en los temas anteriores.

---

## 1. Explicación técnica

### El problema que resuelve

Un componente es una función que React ejecuta cada vez que necesita dibujarlo (un **render**). Con una variable común no alcanza, por dos razones:

1. Cada render ejecuta la función de nuevo, así que la variable vuelve a su valor inicial.
2. Cambiar una variable no le avisa a React que tiene que volver a dibujar.

```jsx
function Contador() {
  let count = 0; // se reinicia en cada render

  return <button onClick={() => { count = count + 1; }}>Clicks: {count}</button>;
  // count cambia en memoria, pero la pantalla sigue mostrando 0
}
```

**State** es un valor que React guarda por vos entre renders y que, al cambiar, provoca un nuevo render. Se maneja con el hook `useState`.

### Sintaxis

```jsx
import { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Clicks: {count}</button>;
}

export default Contador;
```

Qué hace cada línea:

| Código | Qué hace |
|---|---|
| `import { useState } from 'react'` | Trae el **named export** `useState` del paquete `react`. Las llaves se usan porque `react` exporta varias cosas con nombre y vos elegís cuál traer. El nombre entre llaves tiene que coincidir exactamente con el nombre exportado. |
| `useState(0)` | Llama al hook. `0` es el **valor inicial**: solo se usa en el primer render. |
| `[count, setCount]` | `useState` devuelve un array de 2 elementos: el valor actual y la función para cambiarlo. Se usa **destructuring de arrays** (por posición), por eso los nombres los elegís vos. Convención: `x` y `setX`. |
| `setCount(count + 1)` | Le pide a React guardar un valor nuevo y volver a renderizar el componente. |
| `export default Contador` | **Default export**: el archivo exporta una sola cosa principal. Se importa sin llaves y con cualquier nombre: `import Contador from './Contador'`. |

### Reglas de los hooks

- Se llaman **solo en el nivel superior** del componente: no dentro de `if`, bucles, funciones anidadas ni después de un `return` anticipado.
- Se llaman solo dentro de componentes (o de custom hooks, tema 9).
- Los nombres de los hooks empiezan con `use`.

### Cómo se actualiza el state

**1. El state es una "foto" por render.** Dentro de un render, `count` tiene un único valor fijo. Llamar a `setCount` no cambia `count` en esa ejecución: pide un render nuevo donde `count` tendrá el valor nuevo.

```jsx
function handleClick() {
  setCount(count + 1);
  console.log(count); // muestra el valor ANTERIOR, no el nuevo
}
```

**2. Si el valor nuevo depende del anterior, usá la forma funcional (updater).** Se le pasa al setter una función que recibe el valor pendiente más reciente:

```jsx
setCount(prev => prev + 1);
```

```jsx
// Resultado: suma 1 (las tres líneas leen el mismo count)
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);

// Resultado: suma 3
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

**3. Objetos y arrays: nunca mutar, siempre reemplazar.** React detecta el cambio comparando por referencia. Si mutás el objeto original, la referencia es la misma y React no re-renderiza (es el bug nº 1 que viste en la sección 4 con inmutabilidad).

| Operación | Mal (muta) | Bien (copia nueva) |
|---|---|---|
| Agregar a array | `lista.push(x)` | `setLista([...lista, x])` |
| Quitar de array | `lista.splice(i, 1)` | `setLista(lista.filter(item => item.id !== id))` |
| Modificar un elemento | `lista[i].done = true` | `setLista(lista.map(item => item.id === id ? { ...item, done: true } : item))` |
| Modificar objeto | `user.age = 30` | `setUser({ ...user, age: 30 })` |

### Más reglas y datos útiles

- **Cada instancia del componente tiene su propio state.** Si usás `<Contador />` tres veces, hay tres states independientes.
- **El state puede ser cualquier valor:** número, string, boolean, objeto, array.
- **No guardes en state lo que podés calcular** a partir de otro state o de props. Por ejemplo, el total de una lista se calcula en el render con `lista.length`, no necesita su propio `useState`. Guardar datos duplicados provoca inconsistencias.
- **El state es local al componente.** Si dos componentes necesitan el mismo dato, se resuelve en el tema 6 (lifting state up).

### Errores comunes

| Error | Por qué falla |
|---|---|
| `onClick={setCount(count + 1)}` | Ejecuta el setter **durante el render** (loop infinito). Tiene que ser una función: `onClick={() => setCount(count + 1)}`. |
| Esperar el valor nuevo justo después de `setX(...)` | El valor nuevo recién existe en el próximo render. |
| Mutar arrays/objetos (`push`, `obj.x = ...`) | Misma referencia: React no detecta el cambio. |
| Usar `useState` dentro de un `if` o un bucle | Rompe el orden de los hooks. |
| Guardar en state algo derivable | Dos fuentes de verdad que se desincronizan. |
| Olvidar `...item` al actualizar un objeto | El objeto nuevo pierde las propiedades que no incluiste. |

---

## 2. Ejemplo concreto de uso

Un botón de "Me gusta" con cantidad: dos states de tipos distintos (boolean y número).

```jsx
import { useState } from 'react';

function BotonMeGusta() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(120);

  function handleClick() {
    // liked es la "foto" del render actual: se decide con ese valor
    setLikes(prev => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  }

  return (
    <button onClick={handleClick}>
      {liked ? 'Quitar me gusta' : 'Me gusta'} ({likes})
    </button>
  );
}

export default BotonMeGusta;
```

Para usarlo en `App.jsx`:

```jsx
import BotonMeGusta from './components/BotonMeGusta'; // default export: sin llaves, ruta relativa al archivo actual

function App() {
  return <BotonMeGusta />;
}

export default App;
```

---

## 3. Ejercicios

Hacelos en orden. Cada ejercicio se considera terminado cuando cumple su criterio **y** no hay errores ni warnings en la consola del navegador (F12).

### Ejercicio 1: Contador básico

**Consigna:** Creá el componente `Contador` en `src/components/Contador.jsx` con tres botones: `+1`, `-1` y `Reiniciar`. Mostrá el valor actual. Renderizalo desde `App.jsx`.

**Terminado cuando:** el contador arranca en 0, sube y baja con los botones y vuelve a 0 con `Reiniciar`.

---

### Ejercicio 2: Interruptor (boolean)

**Consigna:** Creá `Interruptor`. Un solo botón que alterna entre "Encendido" y "Apagado". El texto del botón y un texto aparte (por ejemplo "La luz está encendida") deben reflejar el estado actual.

**Terminado cuando:** cada click invierte el estado y los dos textos siempre coinciden entre sí.

**Concepto nuevo, un ternario dentro de JSX.** Dentro de `{}` solo van expresiones, así que para elegir entre dos valores se usa el operador ternario:

```jsx
<p>{isOpen ? 'Abierto' : 'Cerrado'}</p>
```

(El render condicional completo se ve en el tema 5; acá solo necesitás esto.)

---

### Ejercicio 3: Sumar de a varios (updater)

**Consigna:** En `Contador` (o en un componente nuevo `ContadorTriple`), agregá un botón `+3` que llame **tres veces** al setter en el mismo handler y logre que el contador suba 3 por click.

**Terminado cuando:** un solo click en `+3` suma exactamente 3. Tenés que poder explicar por qué `setCount(count + 1)` repetido tres veces suma 1 y qué cambia con la forma funcional.

---

### Ejercicio 4: State con un objeto

**Consigna:** Creá `Personaje` con un único `useState` cuyo valor sea un objeto: `{ nombre: 'Aria', vida: 100, nivel: 1 }`. Mostrá los tres datos y agregá dos botones:

- `Recibir daño`: resta 10 de vida (la vida nunca baja de 0).
- `Subir de nivel`: suma 1 al nivel.

**Terminado cuando:** cada botón cambia solo su propiedad y las otras dos se conservan; la vida no pasa de 0; no mutás el objeto original.

**Concepto nuevo, actualizar un objeto con spread:**

```jsx
const [user, setUser] = useState({ name: 'Leo', age: 20 });

setUser({ ...user, age: 21 }); // copia todas las propiedades y pisa solo age
```

---

### Ejercicio 5: State con un array (agregar y quitar)

**Consigna:** Creá `ListaTareas`. El state inicial es un array de objetos con `id` y `texto` (por ejemplo 3 tareas). Mostralas en una lista y agregá:

- Un botón `Agregar tarea` que añade una nueva ("Tarea 4", "Tarea 5"...) con un `id` único.
- Un botón `Eliminar` en cada tarea.

**Terminado cuando:** podés agregar y eliminar tareas, sin mutar el array original, y no aparece el warning de `key` en la consola.

**Conceptos nuevos:**

```jsx
// Agregar: array nuevo con los elementos anteriores + el nuevo
setItems([...items, { id: 99, text: 'nuevo' }]);

// Quitar: filter devuelve un array nuevo sin el elemento
setItems(items.filter(item => item.id !== idAEliminar));

// Renderizar una lista: map + key única y estable
{items.map(item => <li key={item.id}>{item.text}</li>)}
```

La `key` se estudia a fondo en el tema 5; por ahora usala exactamente así.

> Pista para el `id` único: pensá qué valor siempre distinto podés calcular a partir del state actual o de algo que no se repite.

---

### Ejercicio 6: State independiente por instancia + props

**Consigna:** Modificá `Contador` para que reciba una prop `inicial` (valor con el que arranca el state). En `App.jsx` renderizá tres `<Contador />` con valores iniciales distintos (por ejemplo 0, 10 y 100).

**Terminado cuando:** los tres contadores arrancan con su valor inicial y cada uno se modifica sin afectar a los otros. Tenés que poder explicar por qué pasa eso.

> Recordá: el valor inicial de `useState` solo se usa en el primer render.

---

### Ejercicio 7: Actualizar un elemento del array y state derivado

**Consigna:** Extendé `ListaTareas` para que cada tarea tenga `completada: false`. Agregá un botón o checkbox por tarea que alterne ese valor. Debajo de la lista mostrá:

- Total de tareas.
- Cantidad de completadas.
- Cantidad de pendientes.

**Terminado cuando:** marcar/desmarcar actualiza la tarea correcta sin afectar al resto, y los tres contadores se actualizan solos **sin tener ningún `useState` extra para ellos**.

**Concepto nuevo, modificar un elemento de un array con `map`:**

```jsx
setItems(items.map(item =>
  item.id === idBuscado
    ? { ...item, done: !item.done } // copia nueva del elemento elegido
    : item                           // los demás quedan igual
));
```

Para contar: `items.filter(i => i.done).length`. Se calcula en el cuerpo del componente, en cada render.

---

## 4. Reto final (sin pistas)

**Carrito de compras simple.**

Creá un componente `Carrito` con una lista fija de al menos 4 productos (`id`, `nombre`, `precio`). Cada producto muestra su cantidad en el carrito (arranca en 0) con botones `+` y `-`.

Requisitos:

- La cantidad de un producto nunca baja de 0.
- Se muestra el subtotal por producto, el total general y la cantidad total de unidades.
- Un botón `Vaciar carrito` deja todas las cantidades en 0.
- Los subtotales, el total y las unidades **se calculan**, no se guardan en state.
- No mutás ningún array ni objeto.
- Sin warnings en la consola.

---

## 5. Para investigar en react.dev

- *State: A Component's Memory*
- *State as a Snapshot* (explica por qué `console.log(count)` muestra el valor viejo)
- *Queueing a Series of State Updates* (updater functions)
- *Updating Objects in State* y *Updating Arrays in State*
- *Choosing the State Structure* (qué guardar y qué calcular)

---

## 6. Cierre del tema (Git)

Cuando apruebes el reto final:

```bash
git add .
git commit -m "feat: agrega tema 3 state con useState"
git push -u origin react/03-state-usestate
```

Después, en GitHub: abrir el PR de `react/03-state-usestate` hacia `main` y hacer el merge. Volvé a tu máquina:

```bash
git switch main
git pull
```