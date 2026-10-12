import avatarImagen from "../assets/avatar-img.jpg";

function Avatar() {
  return <img src={avatarImagen} alt="imagenes de avatar Aang" className="avatar" style={{width: 300, borderRadius: 15}}/>;
}

export default Avatar;
