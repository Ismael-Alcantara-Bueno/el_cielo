import React, { useEffect, useState } from "react";
import BarraNav from "../components/BarraNav";
import NavDeunos from "../components/NavDeunos";
import Footer from "../components/Footer";
import "../CSS/cabanaCard.css";
import { obtenerDatos } from "../auth/GetData";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const MisCabanas = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [datos, setDatos] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const goTo = useNavigate();

  useEffect(() => {
    const consulta = `CALL getMisCabanas ('${userId}')`;

    obtenerDatos(consulta)
      .then((data) => {
        setDatos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const irA = (idcab) => {
    goTo(`/EditarCabaña/${idcab}`);
  };

  console.log(`dato ${JSON.stringify(datos, null, 2)}`);

  const data = datos.length > 0 ? datos : [{ dnulo: "" }, { dnulo2: "" }];

  // ... (tus importaciones)

return (
  <>
    <BarraNav />
    <section className="main-section">
      <div className="container">
        <NavDeunos mostrar={mostrarMenu} />
        <div className="main-content">
          <button
            className="toggle-button"
            onClick={() => setMostrarMenu(!mostrarMenu)}
          >
            Mostrar/ocultar menú
          </button>
          <ul className="compact-list">
            {data[0].length > 0 ? (
              datos[0].map((item, index) => (
                <li key={index} className="compact-item">
                  <h2>{item.Nombre_Cabaña}</h2>
                  <div className="image-container">
                    {/* Renderiza la imagen si la tienes */}
                  </div>
                  <p>Precio: ${item.Precio_Cabaña} MXN</p>
                  <p>Capacidad: {item.Capacidad} Personas</p>
                  <p>Ubicación: {item.Ubicacion}</p>
                  <button onClick={() => irA(item.Clave_Cabaña)}>Editar</button>
                </li>
              ))
            ) : (
              <li className="no-cabins">
                <h1>Aun no tienes ninguna cabaña registrada</h1>
                <p>Pulsa + para registrar tu Cabaña ahora!!</p>
              </li>
            )}
          </ul>
          <Link as={Link} to={"/RegistrodeCabañas"}>
            <button className="add-button">+</button>
          </Link>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

};

export default MisCabanas;
