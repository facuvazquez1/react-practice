function Perfil() {
  const nombre = "Facundo Vazquez";
  const edad = 18;
  const juegoFavorito = "World of Warcraft";

  return (
    <>
      <p>Nombre: {nombre}</p>
      <p>Edad: {edad}</p>
      <p>Juego favorito: {juegoFavorito}</p>
      <p>Es mayor de edad: {edad >= 18 ? "Si" : "No"}</p>
    </>
  );
}

export default Perfil;
