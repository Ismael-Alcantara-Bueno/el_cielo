import React, { useEffect, useState } from "react";
import BarraNav from "../components/BarraNav";
import Footer from "../components/Footer";
import { obtenerDatos } from "../auth/GetData";
import PopUp from "../components/PopUp";

const MisReservas = () => {
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [curp, setCurp] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [folio, setFolio] = useState('')
  const idUser = sessionStorage.getItem('userId');

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setCurp(value);
  };

  const verDatos = async () => {
    try {
      const consulta = `CALL ver_reservacion ('${idUser}');`;
      const response = await obtenerDatos(consulta);
      setData(response[0]);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(()=>{
    const consulta = `CALL ver_reservacion ('${idUser}')`;
    obtenerDatos(consulta)
    .then((response)=>{
      setData(response[0])
    })
    .catch((error) => console.error("Error:", error));
  },[])

  const handleOpenPopup = (fol) => {
    setIsPopupOpen(true);
    setFolio(fol)
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleYes = async () => {
    // Lógica cuando se hace clic en "Sí"
    try {
      const act = `CALL cancelar_reservacion ('${folio}')`;
      console.log(act);
      await obtenerDatos(act);
    } catch (error) {
      console.error("Error:", error);
    }
    verDatos();
    console.log("Sí");
    setIsPopupOpen(false);
  };

  const handleNo = () => {
    // Lógica cuando se hace clic en "No"
    console.log("No");
    setIsPopupOpen(false);
  };

  const formatFecha = (fechaDesdeBD) => {
    const fechaObjeto = new Date(fechaDesdeBD);
    if (isNaN(fechaObjeto)) {
      console.error("La fecha no es válida");
      return "La fecha no es válida";
    } else {
      // Formatear la fecha como "13 de Enero de 2024"
      const options = { day: "numeric", month: "long", year: "numeric" };
      const fechaFormateada = fechaObjeto.toLocaleDateString("es-ES", options);
      console.log(fechaFormateada); // Salida: "13 de enero de 2024"
      return fechaFormateada;

      // Formatear la fecha como "13/01/2024"
      /*const options2 = { day: 'numeric', month: '2-digit', year: 'numeric' };
      const fechaFormateada2 = fechaObjeto.toLocaleDateString('es-ES', options2);
      console.log(fechaFormateada2);  */ // Salida: "13/01/2024"
    }
  };

  return (
    <>
      <BarraNav />
      <section>
        <div className="m-2">
          {data.length > 0 ? (
            <>
              <h5>Estas son las reservaciones que has hecho</h5>
              <ul className="list-group">
                {data.map((item, key) => (
                  <li
                    className={`list-group-item ${
                      item.Status === "A"
                        ? "list-group-item-secondary"
                        : "list-group-item-danger"
                    } m-2`}
                  >
                    <div className="card text-center">
                      <div className="card-header">
                        <h5 className="card-title">
                          Folio {item.Folio_Reservacion}
                        </h5>
                      </div>
                      <div className="card-body">
                        <label className="card-text">
                          Reservacion en: {item.Nombre_Cabaña}
                        </label>
                        <p className="card-text">
                          Fecha de entrada: {formatFecha(item.Fecha_Entrada)}
                        </p>
                        <p className="card-text">
                          Fecha de Salida: {formatFecha(item.Fecha_Salida)}
                        </p>
                        <p className="card-text">
                          Total de Pago: ${item.Precio_Reservacion} MXN
                        </p>
                        {item.Status === "A" ? (
                          <>
                            <p>En proceso</p>
                            <button
                              onClick={() => handleOpenPopup(item.Folio_Reservacion)}
                              className="btn btn-outline-danger mx-1"
                            >
                              Cancelar reservacion
                            </button>
                          </>
                        ) : item.Status === "C" ? (
                          <p className="text-danger">Cancelada</p>
                        ) : (
                          <>Otras cosas</>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
                <PopUp
                  isOpen={isPopupOpen}
                  onClose={() => handleClosePopup()}
                  onYes={() => handleYes()}
                  onNo={handleNo}
                />
              </ul>
            </>
          ) : (
            <>
            <div className="m-5"><h5>Sin Reservaciones a tu nombre...</h5></div>
              
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MisReservas;
