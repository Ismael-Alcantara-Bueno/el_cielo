import React, { useEffect, useState } from "react";
import BarraNav from "../components/BarraNav";
import Footer from "../components/Footer";
import {obtenerDatos } from "../auth/GetData";
import NavDeunos from "../components/NavDeunos";
import "../CSS/Inicio.css";
import "../CSS/SecionUsiario.css"
import Cookies from "js-cookie";

const SecionUsuario = () => {
  const [datos, setDatos] = useState([]);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  
  //const userId = Cookies.get("user")
  const userId = sessionStorage.getItem('userId');
  const handleSubmit = () => {
    console.log(userId);
  };

  useEffect(() => {
    const consulta = `CALL dataUser ('${userId}')`;

    obtenerDatos(consulta)
      .then((data) => {
        setDatos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  //console.log(`dato ${JSON.stringify(datos, null, 2)}`);

  const email = datos[0]?.[0]?.correo || "Email no disponible";
  const nombreCompleto = `${datos[0]?.[0]?.Nombre || ""} ${
    datos[0]?.[0]?.Ape1 || ""
  } ${datos[0]?.[0]?.Ape2 || ""}`;

  return (
    <>
    <BarraNav />
    <section className="u-align-center u-clearfix u-section-2">      
      
      <div className="contenedor">
      <NavDeunos email={email} mostrar={mostrarMenu}/>
      <div className="contenido-principal">      
      {/* <button className="buttonVer" onClick={() => setMostrarMenu(!mostrarMenu)}>Mostrar/ocultar menú</button> */}
      <h3>{nombreCompleto}</h3>
      <div>
        <label>Sobre mi</label>
        <p>
          <textarea></textarea>
        </p>
      </div>
      <button onClick={handleSubmit}>Ver cosas</button>
      </div>
      </div>

      
      
    </section>
    <Footer />
    </>
  );
};

export default SecionUsuario;
