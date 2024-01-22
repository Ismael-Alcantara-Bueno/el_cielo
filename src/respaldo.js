import React, { useState, useEffect } from 'react';

function App() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    // En este ejemplo, la consulta es 'SELECT * FROM foco_prueba'
    const consulta = encodeURIComponent(`CALL insertar_cabaña (111,'PRUEBA4','PRUEBA',2133,'PRUEBA','PRUEBA','PRUEBA',1)`);

    // Hacer la solicitud a la API cuando el componente se monta
    fetch(`http://localhost:3001/api/${consulta}`)
      .then(response => response.json())
      .then(data => {
        // Actualizar el estado con los datos de la base de datos
        setDatos(data);
      })
      .catch(error => console.error('Error:', error));
  }, []); // El array vacío asegura que useEffect solo se ejecute una vez al montar el componente
  console.log(`dato ${JSON.stringify(datos, null,2)}`)
  return (
    <div>
      <h1>Datos de la base de datos:</h1>
        <thead>
          <tr>
            <th>resultado</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <th>{datos[0][0].result}</th>
            </tr>
        </tbody>
    </div>
  );
}


export default App;


//Registro
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import BarraNav from "../components/BarraNav";
import Footer from "../components/Footer";
import "../CSS/Registrarse.css";
import logoCielo from "../assets/images/imagen.webp";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    direccion: "",
    curp: "",
    erefc: "",
    email: "",
    contraseña: "",
  });

  const[formDataD, setFormDataD] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    contraseña:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación para evitar caracteres no permitidos
    if (!value.includes("/") && !value.includes("*")) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  //genera un folio unico
  const generarFolioUnico = () => {
    const folio = uuidv4();
    return folio;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const folio = generarFolioUnico();
    console.log(folio);
    const consulta = encodeURIComponent(
      `CALL insertar_cliente('${folio}','${formData.nombre}','${formData.apellidoPaterno}','${formData.apellidoMaterno}','${formData.telefono}','${formData.direccion}','${formData.curp}','${formData.erefc}','${formData.email}','${formData.contraseña}')`
    );
    fetch(`http://localhost:3001/api/${consulta}`)
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado con los datos de la base de datos
      })
      .catch((error) => console.error("Error:", error));
    console.log("Datos enviados:", formData);
    setFormData({
      nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    direccion: "",
    curp: "",
    erefc: "",
    email: "",
    contraseña: "",
    })
  };

  return (
    <>
      <BarraNav />

      <section
        className="u-clearfix u-image u-shading u-section-1"
        data-image-width="735"
        data-image-height="245"
      >
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-27-xl u-size-29-lg u-size-29-md  u-size-29-sm u-size-29-xs u-layout-cell-1">
                  <div class="u-container-layout u-valign-top u-container-layout-1">
                    <img
                      class="u-image u-image-contain u-image-default u-image-1"
                      src={logoCielo}
                      alt=""
                      data-image-width="525"
                      data-image-height="425"
                    />
                  </div>
                </div>

                <div className="u-container-style u-layout-cell u-right-cell u-size-31-lg u-size-31-md u-size-31-sm u-size-31-xs u-size-33-xl u-layout-cell-2">
                  <div className="u-container-layout u-container-layout-2">
                    <div className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-form u-form-1">
                      <form
                        onSubmit={handleSubmit}
                        className="u-clearfix u-form-spacing-30 u-form-vertical u-inner-form"
                        source="email"
                        name="form"
                      >
                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {" "}
                            Cliente
                          </label>
                          <input
                            type="radio"
                            name="opcion"
                            value='cliente'
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>
                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {" "}
                            Dueño
                          </label>
                          <input
                            type="radio"
                            name="opcion"
                            value='dueno'
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>
                        
                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {" "}
                            Nombre
                          </label>
                          <input
                            type="text"
                            placeholder="Introdusca su/s Nombre/s"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>

                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {" "}
                            Apellido paterno
                          </label>
                          <input
                            type="text"
                            placeholder="Introdusca su Apellido paterno"
                            name="apellidoPaterno"
                            value={formData.apellidoPaterno}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>

                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {" "}
                            Apellido paterno
                          </label>
                          <input
                            type="text"
                            placeholder="Introdusca su Apellido materno"
                            name="apellidoMaterno"
                            value={formData.apellidoMaterno}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>

                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            Numero de telefono
                          </label>
                          <input
                            type="number"
                            placeholder="Introdusca su numero a 10 digitos"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            name="telefono"
                          />
                        </div>

                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            Direccion
                          </label>
                          <input
                            type="text"
                            placeholder="Introdusca su Dirección"
                            value={formData.direccion}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            name="direccion"
                          />
                        </div>

                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            CURP
                          </label>
                          <input
                            type="text"
                            placeholder="Introdusca su CURP"
                            value={formData.curp}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            name="curp"
                          />
                        </div>

                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            RFC
                          </label>
                          <input
                            type="text"
                            placeholder="Introdusca su RFC"
                            value={formData.erefc}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            name="erefc"
                          />
                        </div>

                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            E-Mail
                          </label>
                          <input
                            type="text"
                            placeholder="Introdusca su Correo electronico"
                            value={formData.email}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            name="email"
                          />
                        </div>

                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            placeholder="Cree una contraseña max 20 caracteres"
                            value={formData.contraseña}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            name="contraseña"
                          />
                        </div>

                        <div className="u-align-left u-form-group u-form-submit">
                          <button
                            type="submit"
                            className="u-active-white u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-white u-palette-3-base u-radius-50 u-btn-1"
                          >
                            {" "}
                            Ragistrarse
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Registro;
