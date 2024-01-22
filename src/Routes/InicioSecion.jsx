import React, { useState } from "react";
import BarraNav from "../components/BarraNav";
import logoCielo from "../assets/images/imagen.webp";
import { Link } from "react-router-dom";
import { API_URL } from "../auth/constans";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const InicioSecion = () => {
  const [correo, setEmail] = useState("");
  const [contrasenia, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación para evitar caracteres no permitidos
    switch (name) {
      case "correo":
        if (!value.includes("/") && !value.includes("*")) {
          setEmail(value);
        }
        break;

      case "contraenia":
        if (!value.includes("/") && !value.includes("*")) {
          setPassword(value);
        }
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        correo,
        contrasenia,
      })
  }

  fetch(`${API_URL}/log/validar`, requestInit)
  .then(res => res.json())
  .then(res => {
      // Actualizar el estado con los datos de la base de datos
      console.log('Usuario'+res[0][0].id_usuario);
      console.log('Rol'+res[0][0].id_rol);

      let id = res[0][0].id_usuario;
      let rol = res[0][0].id_rol;
      if (id != undefined){
        console.log(id)
        console.log(rol)
        
        sessionStorage.setItem('userId', id);
        sessionStorage.setItem('rol', rol);
        goTo('/SecionUsuario')
        //navigate("/Registro/Info");
      } else {
        alert('Usuario O Contraseña Incorrectos');
      }
      
      
      
    })
    .catch(error => console.error('Error:', error));


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
                <div className="u-align-left u-container-style u-layout-cell u-left-cell u-size-27-xl u-size-29-lg u-size-29-md  u-size-29-sm u-size-29-xs u-layout-cell-1">
                  <div className="u-container-layout u-valign-top u-container-layout-1">
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
                        className="u-clearfix u-form-spacing-30 u-form-vertical u-inner-form"
                        source="email"
                        name="form"
                        onSubmit={handleSubmit}
                      >
                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {""}Email:
                          </label>
                          <input
                            type="email"
                            name="correo"
                            value={correo}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>
                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-1">
                            {""}Contraseña:
                          </label>
                          <input
                            type="password"
                            name="contraenia"
                            value={contrasenia}
                            onChange={handleChange}
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                          />
                        </div>

                        {!!errorResponse && (
                          <div className="u-form-address u-form-group u-form-group-3">
                            <label className="u-label u-text-body-alt-color u-label-3">
                              {errorResponse}
                            </label>
                          </div>
                        )}

                        <div className="u-form-address u-form-group u-form-group-3">
                          {" "}
                          <Link
                            className="u-button-style u-nav-link"
                            as={Link}
                            to={"/Registro"}
                          >
                            {" "}
                            ¿Aun no tienes una Cuenta? Registrate aquí
                          </Link>
                        </div>

                        <div className="u-align-left u-form-group u-form-submit">
                          <button
                            type="submit"
                            className="u-active-white u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-white u-palette-3-base u-radius-50 u-btn-1"
                          >
                            Iniciar Sesión
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
    </>
  );
};

export default InicioSecion;
