import JugadorCard from "./components/JugadorCard";
import Partido from "./components/Partido";
import Titulo from "./components/Titulo";
import Tarjeta from "./components/Tarjeta";
import Boton from "./components/Boton";
import {
  InsigniaBronce,
  InsigniaPlata,
  InsigniaOro,
} from "./components/Insignias";

function App() {
  return (
    <div>
      <Boton
        texto="boton1"
        alHacerClick={function saludoBoton() {
          console.log("Este es el boton numero: 1");
        }}
      />
      <Boton
        texto="boton2"
        alHacerClick={function saludoBoton() {
          console.log("Este es el boton numero: 2");
        }}
      />

      <Titulo texto="Hola" />

      <JugadorCard nombre="Facundo" equipo="Manchester" posicion="Delantero" />

      <Tarjeta titulo="Jugador 1">
        <JugadorCard
          nombre="Maria"
          equipo="Red Hot"
          posicion="Centrocampista"
          goles={1}
          capitan={false}
        />

        <Partido
          local="River"
          visitante="Boca"
          golesLocal={1}
          golesVisitante={0}
          jugado={true}
          goleadores={["Facundo", "Sol", "Matias"]}
        />
        <InsigniaOro texto="Oro" />
      </Tarjeta>

      <Tarjeta titulo="Jugador 2">
        <JugadorCard
          nombre="Lucas"
          equipo="Red Tomics"
          posicion="Centrocampista"
          goles={9}
          capitan={true}
        />
        <InsigniaBronce texto="Bronce" />
      </Tarjeta>

      <Tarjeta titulo="Jugador 3">
        <JugadorCard
          nombre="Ramiro"
          equipo="Red Bulls"
          posicion="Delantero"
          goles={6}
          capitan={false}
        />
        <InsigniaPlata texto="Plata" />
      </Tarjeta>

      <JugadorCard
        nombre="Maria"
        equipo="Red Bulls"
        posicion="Centrocampista"
        goles={10}
        capitan={false}
      />

      <Partido
        local="River"
        visitante="Boca"
        golesLocal={1}
        golesVisitante={0}
        jugado={true}
        goleadores={["Facundo", "Sol", "Matias"]}
      />
    </div>
  );
}

export default App;
