function Partido({
  local,
  visitante,
  golesLocal,
  golesVisitante,
  jugado,
  goleadores,
}) {
  return (
    <>
      <p>
        {local} {golesLocal} - {golesVisitante} {visitante}{" "}
      </p>
      <p>Goleadores totales: {goleadores.length}</p>
      <p>Goleadores: {goleadores.join(", ")}</p>
      <p>Jugado: {jugado ? "partido jugado" : "partido pendiente"}</p>
    </>
  );
}

export default Partido;
