// 01 - Creamos el componente "Partido"
function Partido() {
  return (
    <div>
      <p>Boca 2 - 1 River</p>
    </div>
  );
}
// 02 - Creamos el componete "App", que utiliza dentro el componente "Partido"
function App() {
  return (
    <main>
      <h1>Fecha 1</h1>
      <Partido />
      <Partido />
      <Partido />
    </main>
  );
}

// 03 - Le avisamos a main.jsx que componentes se tiene que dibujar
// Explicacion: main.jsx hace import App from './App.jsx'. Para que ese import funcione, 
// App.jsx tiene que exportar el componente. Partido no necesita export porque se usa dentro del mismo archivo.
export default App;
