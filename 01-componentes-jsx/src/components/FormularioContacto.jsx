function FormularioContacto() {
  return (
    <>
      <form>
        {/* formulario de contacto */}
        <label htmlFor="nombre">Nombre</label>
        <input type="text" id="nombre" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" />

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default FormularioContacto
