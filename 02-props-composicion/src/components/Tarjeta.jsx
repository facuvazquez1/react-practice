function Tarjeta({titulo, children}){
    return (
        <div className="tarjeta">
            <h2>{titulo}</h2>
            {children}
        </div>
    )

}

export default Tarjeta