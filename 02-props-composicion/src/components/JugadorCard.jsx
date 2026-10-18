function JugadorCard({nombre, equipo, posicion, goles=0, capitan=false}) {
    return (
        <div>
            <h3>{nombre}</h3>
            <p>{equipo}</p>
            <p>{posicion}</p>
            <p>{goles}</p>
            <p>{capitan ? "Capitan" : "No es capitan."}</p>
        </div>
    )
}

export default JugadorCard