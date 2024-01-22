import React from "react";
import { Link } from "react-router-dom";
import "../CSS/nicepage.css"

const NavDeunos = ({ email, mostrar }) => {

  

  return (
    <>
      <div className={`menu-lateral ${mostrar ? "mostrar" : ""}`}>
        <p>
          <Link as={Link} className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" to={"/SecionUsuario"}>{email}</Link>          
          </p>
        <p>
            <Link as={Link} className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" to={`/Micabaña`}>
              Mis Cabañas
            </Link>
          </p>
        {/* Agrega más opciones según sea necesario */}
      </div>
    </>
  );
};

export default NavDeunos;
