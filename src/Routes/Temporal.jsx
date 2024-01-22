import React, { useState } from "react";
import { obtenerDatos } from "../auth/GetData";

function Temporal() {
  const [datos, setDatos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [fail, setFail] = useState(false);

  const canbios = (e) => {
    const { value } = e.target;
    handleObtenerDatos();
    setNombre(value);
    
    
  };

  /*useEffect(() => {
    const consulta = `SELECT * FROM cabaña`;

    obtenerDatos(consulta)
      .then((data) => {
        setDatos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);*/ // El array vacío asegura que useEffect solo se ejecute una vez al montar el componente

  const handleObtenerDatos = async () => {
    try {
      const consulta = `SELECT * FROM cabaña where Nombre_Cabaña =  '${nombre}'`;
      const data = await obtenerDatos(consulta);
      setDatos(data);
      setFail(false);
    } catch (error) {
      console.error("Error:", error);
      setFail(true);
    }
  };

  //console.log(`dato ${JSON.stringify(datos, null, 2)}`);

  return (
    <div>
      <input type="text" value={nombre} onChange={canbios} />
      <button onClick={handleObtenerDatos}>obtener datos</button>
      {datos.length > 0 ? (
        datos.map((item) => (
            
          <>
            <h1>{item.Nombre_Cabaña}</h1>
            <p>{item.Descripcion_Cabaña}</p>
          </>
        ))
      ) : (
        <div className="u-form-address u-form-group u-form-group-3">
          <label>No se a encontrado ningun registro</label>
        </div>
      )}
      {!!fail && (
        <div className="u-form-address u-form-group u-form-group-3">
          <label>A ocurrido un error</label>
        </div>
      )}
    </div>
  );
}

export default Temporal;
