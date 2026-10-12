import Saludo from "./components/Saludo.jsx";
import Perfil from "./components/Perfil.jsx"
import Avatar from "./components/Avatar.jsx"
import Encabezado from "./components/Encabezado.jsx"; 
import FormularioContacto from "./components/FormularioContacto.jsx";
import FichaVideojuego from "./components/FichaVideojuego.jsx";




function App() {
  return (
    <>
      <h1>Facundo Vazquez</h1>
      <Saludo />
      <Perfil/>
      <Avatar/>
      <Encabezado/>
      <FormularioContacto/>
      <FichaVideojuego/>
    </>
  );
}

export default App;


