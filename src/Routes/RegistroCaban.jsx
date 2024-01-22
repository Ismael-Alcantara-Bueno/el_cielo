// RegistroCaban.js
import React, { useState } from "react";
import "../CSS/RegistroCaban.css";
import BarraNav from "../components/BarraNav";
import Footer from "../components/Footer";
import { obtenerDatos } from "../auth/GetData";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const RegistroCaban = () => {
  const goTo = useNavigate();
  const [datos, setDatos] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    capacidad: "",
    ubicacion: "",
    Maps: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar el formulario
    const id = sessionStorage.getItem('userId');
    try {
      const consulta = `CALL insertar_cabaña (${id},'${formulario.nombre}','${formulario.descripcion}',${formulario.precio},'${formulario.capacidad}','${formulario.ubicacion}','${formulario.Maps}')`;
      const data = await obtenerDatos(consulta);
      setDatos(data);
    } catch (error) {
      console.error("Error:", error);
    }
    goTo("/Micabaña");
    setFormulario({
      nombre: "",
      descripcion: "",
      precio: "",
      capacidad: "",
      ubicacion: "",
      Maps: "",
    });
    console.log("Formulario enviado:", formulario);
  };

  return (
    <>
      <BarraNav />
      <section className="u-clearfix u-image u-shading u-section-1">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                

                <div className="u-container-style u-layout-cell u-right-cell u-size-31-lg u-size-31-md u-size-31-sm u-size-31-xs u-size-33-xl u-layout-cell-2">
                  <div className="u-container-layout u-container-layout-2">
                    <div className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-form u-form-1">
                      <form
                        onSubmit={handleSubmit}
                        className="u-clearfix u-form-spacing-30 u-form-vertical u-inner-form"
                      >
                        {/* Sección de Información Básica */}
                        <h2>Registrar Cabaña</h2>
                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            Nombre:
                          </label>
                          <input
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            type="text"
                            name="nombre"
                            value={formulario.nombre}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            Descripción:
                          </label>
                          <textarea
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            name="descripcion"
                            value={formulario.descripcion}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            Precio por noche:
                          </label>
                          <input
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            type="text"
                            name="precio"
                            value={formulario.precio}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            Ubicación:
                          </label>
                          <select
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            name="ubicacion"
                            value={formulario.ubicacion}
                            onChange={handleChange}
                          >
                            <option value={formulario.ubicacion}>
                              {formulario.ubicacion}
                            </option>
                            <option value={"Parte Alta"}>Parte Alta</option>
                            <option value={"Parte Baja"}>Parte Baja</option>
                          </select>
                          <br />
                        </div>

                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            Capacidad:
                          </label>
                          <input
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            type="number"
                            name="capacidad"
                            value={formulario.capacidad}
                            onChange={handleChange}
                            required
                            placeholder="Capacidad de Personas en número"
                          />
                        </div>

                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            Link Google Maps Ubicación
                          </label>
                          <input
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            type="text"
                            name="Maps"
                            value={formulario.Maps}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="u-align-left u-form-group u-form-submit">
                          <button
                            type="submit"
                            className="u-active-white u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-white u-palette-3-base u-radius-50 u-btn-1"
                          >
                            Registrar
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

export default RegistroCaban;
