import React, { useState } from "react";
//import { v4 as uuidv4 } from "uuid";
import BarraNav from "../components/BarraNav";
import Footer from "../components/Footer";
import "../CSS/Registrarse.css";
import logoCielo from "../assets/images/imagen.webp";
import { API_URL } from "../auth/constans";
import { useNavigate } from "react-router-dom";
import { useEffect} from 'react';

const Registro = () => {
  const [correo, setEmail] = useState("");
  const [contrasenia, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [rolSe, setRolSe] = useState([]);
  const [Nombre, setNombre] = useState("");
  const [Ape1, setApe1] = useState("");
  const [Ape2, setApe2] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [CURP, setCurp] = useState("");
  
  const [errorResponse, setErrorResponse] = useState("");

  const goTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value)

    // Validación para evitar caracteres no permitidos
    switch (name) {
      case "correo":
        if (!value.includes("/") && !value.includes("*")) {
          setEmail(value);
        }
        break;

      case "contrasenia":
        if (!value.includes("/") && !value.includes("*")) {
          setPassword(value);
        }
        break;
      case "Nombre":
        if (!value.includes("/") && !value.includes("*")) {
          setNombre(value);
        }
        break;

      case "apellidoPaterno":
        if (!value.includes("/") && !value.includes("*")) {
          setApe1(value);
        }
        break;

      case "apellidoMaterno":
        if (!value.includes("/") && !value.includes("*")) {
          setApe2(value);
        }
        break;
      case "Telefono":
        if (!value.includes("/") && !value.includes("*")) {
          setTelefono(value);
        }
        break;
      case "CURP":
        if (!value.includes("/") && !value.includes("*")) {
          setCurp(value);
        }
        break;
      
      default:
        console.log("nada");
        break;
    }
  };
  


  useEffect(() => {
    const getRolSe = () => {
      fetch(`${API_URL}/rol`)
      .then(res => res.json())
      .then(data => {
          // Actualizar el estado con los datos de la base de datos
          console.log(data[0]);
          const roles = data[0].map(ro => ro.rol);
          setRolSe(roles);
        })
        .catch(error => console.error('Error:', error));
    
    }
    getRolSe()
  }, [])


  const handleSelectChange = (e) => {
    const { value } = e.target;
    setRol(value); // Almacena solo el valor del rol
    console.log(value); //[0].Rol
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          ap1,
          ap2,
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log("El usuario se creo correctamente");
        setNombre("");
        setAp1("");
        setAp2("");
        setPassword("");
        setEmail("");
        setErrorResponse("");
        goTo("/InicioSecion");
      } else {
        const errorData = await response.json(); // Intenta obtener el cuerpo JSON del error
        console.log("Ocurrió un problema:", errorData.body.error);
        setErrorResponse(errorData.body.error);
      }
    } catch (error) {
      console.log(error);
    }*/

    const requestInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        correo,
        contrasenia,
        rol,
        Nombre,
        Ape1,
        Ape2,
        Telefono,
        CURP
      }),
  }

  /*console.log(correo,
    contrasenia,
    rol,
    Nombre,
    Ape1,
    Ape2,
    Telefono,
    CURP);*/

  fetch(`${API_URL}/log`, requestInit)
  .then(res => res.text())
  .then(res => {
      // Actualizar el estado con los datos de la base de datos
      console.log(res);
      if(res == 'Registro Insertado'){
        alert('Usuario Insertado');
        goTo('/InicioSecion')
      } else {
        alert('Error Al Insertar Usuario');
      }
      
    })
    .catch(error => console.error('Error:', error))

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
                        name="formName"
                      >

                      <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            Email/Correo electronico
                          </label>
                          <input
                            type="email"
                            placeholder="Ingrese un correo valido"
                            value={correo}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            name="correo"
                          />
                        </div>
                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            placeholder="Cree una contraseña max 20 caracteres"
                            value={contrasenia}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            name="contrasenia"
                          />
                        </div>

                       {/* {!!errorResponse && (
                          <div className="u-form-address u-form-group u-form-group-3">
                            <label className="u-label u-text-body-alt-color u-label-3">
                              {errorResponse}
                            </label>
                          </div>
                       )}*/}

                        <div className="u-form-address u-form-group u-form-group-3">
                          <label  className="u-label u-text-body-alt-color u-label-3">Tipo De Usuario</label>
                          <select onChange={handleSelectChange}  id="inputState" class="form-select" name='Rol' required>
                            <option >--Seleccione--</option>
                              {Array.isArray(rolSe) && rolSe.map(ro => (
                              <option
                                key={ro} value={ro} >
                                  {ro}
                            </option>
                          ))}
                          </select>
                       </div>

                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {" "}
                            Nombre
                          </label>
                          <input
                            type="text"
                            placeholder="Introdusca su/s Nombre/s"
                            name="Nombre"
                            value={Nombre}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>

                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {" "}
                            Apellido Paterno
                          </label>
                          <input
                            type="text"
                            placeholder="Introdusca su Apellido paterno"
                            name="apellidoPaterno"
                            value={Ape1}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>

                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {" "}
                            Apellido Materno
                          </label>
                          <input
                            type="text"
                            placeholder="Introdusca su Apellido Materno"
                            name="apellidoMaterno"
                            value={Ape2}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>
                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {" "}
                            Telefono
                          </label>
                          <input
                            type="tel"
                            placeholder="Introdusca su Telefono"
                            name="Telefono"
                            value={Telefono}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>

                        <div className="u-form-email u-form-group u-form-partition-factor-2">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {" "}
                           CURP
                          </label>
                          <input
                            type="text"
                            placeholder="Introdusca su CURP"
                            name="CURP"
                            value={CURP}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>

                       

                        <div className="u-align-left u-form-group u-form-submit">
                          <button
                            type="submit"
                            className="u-active-white u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-white u-palette-3-base u-radius-50 u-btn-1"
                          >
                            {" "}
                            Registrarse
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
