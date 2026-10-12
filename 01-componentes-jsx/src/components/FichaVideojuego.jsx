import '../index.css'

function FichaVideojuego() {
  const anioActual = 2026;
  const juego = {
    titulo: "WOW Forever",
    genero: "MMORPG",
    anioLazanmiento: 2004,
    anioActual: 2026,
    img: "https://wowforever.be/_astro/2026-09-13-wow-forever-key-art.Bzv-jLkx_5q3xt.webp",
    precio: 25000,
    stock: 20,
    rating: 5
  };

  return (
    <>
    {/* // ficha de viedo juego */}
      <h1>Ficha de videojuego</h1>
      <p>titulo: {juego.titulo}</p>
      <p>Genero: {juego.genero}</p>
      <p>Anio lanzamiento: {juego.anioLazanmiento}</p>
      <img
        src={juego.img}
        alt="portada wow forever"
        className="videojuego"
        style={{ width: 300, borderRadius: 15 }}
      />
      <p>Antiguedad: {anioActual - juego.anioLazanmiento}</p>
      <p>
        Precio / Precio 20% desc : $ {juego.precio} / ${" "}
        {juego.precio - juego.precio * 0.2}
      </p>
      <p>Rating: {'★'.repeat(juego.rating)}  </p>
      <p style={{color: juego.stock > 0 ? 'green' : 'red'}}>Stock: {juego.stock > 0 ? "Disponible" : "Agotado"}</p>
    </>
  );
}

export default FichaVideojuego;
