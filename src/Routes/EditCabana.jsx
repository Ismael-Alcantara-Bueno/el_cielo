import React, { useEffect, useState } from "react";
import BarraNav from "../components/BarraNav";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { obtenerDatos } from "../auth/GetData";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API_URL } from "../auth/constans";
import "../CSS/editcabana.css";
import PopUpCrt from "../components/PopUpCrt";

const EditCabana = () => {
  const [file, setFile] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { id } = useParams();
  const userId = Cookies.get("user");
  const goTo = useNavigate();
  const [datos, setDatos] = useState([]);
  const [imageLis, setImageLis] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [crt, setCrt] = useState([]);
  const [crts, setCrts] = useState([]);
  const [selectedCrts, setSelectedCrts] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    capacidad: "",
    ubicacion: "",
    Maps: "",
  });

  const vewImage = async () => {
    try {
      const response = await fetch(`${API_URL}/imagescabana/get/${id}`);
      const data = await response.json();
      setImageLis(data);
    } catch (error) {
      console.error("Error al llamar a la API:", error);
    }
  };

  useEffect(() => {
    const consulta = `CALL getMiCabana('${id}')`;
    const consulta2 = `CALL verCaracteristicas('${id}')`;

    obtenerDatos(consulta)
      .then((data) => {
        setDatos(data);
        setFormulario({
          nombre: data[0][0].Nombre_Cabaña,
          descripcion: data[0][0].Descripcion_Cabaña,
          precio: data[0][0].Precio_Cabaña,
          capacidad: data[0][0].Capacidad,
          ubicacion: data[0][0].Ubicacion,
          Maps: data[0][0].Maps,
        });
      })
      .catch((error) => console.error("Error:", error));

    obtenerDatos(consulta2)
      .then((itm) => {
        setCrt(itm);
        console.log(`caracterisitcas si: ${itm[0]}`);
      })
      .catch((error) => console.error("Error:", error));

    vewImage();
    console.log(`dato ${JSON.stringify(imageLis, null, 2)}`);
  }, []);

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
    try {
      const consulta = `CALL actualizar_cabana  (${id},'${userId}','${formulario.nombre}','${formulario.descripcion}',${formulario.precio},'${formulario.capacidad}','${formulario.ubicacion}','${formulario.Maps}')`;
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

  const selectedHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const senHandler = () => {
    if (!file) {
      alert("No hay ninguna imagen seleccionada");
      return;
    }

    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("id", id);

    fetch(`${API_URL}/imagescabana/post`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    document.getElementById("fileinput").value = null;
    vewImage();
  };
  const cargCart = async () => {
    try {
      const consulta = "select * from Caracteristicas";
      const response = await obtenerDatos(consulta);
      setCrts(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenPopup = (fol) => {
    setIsPopupOpen(true);
    cargCart();
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCrts([])
  };

  const toggleSelection = (id) => {
    // Verifica si la característica ya está seleccionada
    const isSelected = selectedCrts.includes(id);
    console.log(id)
    // Actualiza el estado según la acción (seleccionar/deseleccionar)
    if (isSelected) {
      const updatedSelection = selectedCrts.filter(
        (selectedId) => selectedId !== id
      );
      setSelectedCrts(updatedSelection);
    } else {
      setSelectedCrts([...selectedCrts, id]);      
    }
  };

  const handleButtonClick = async() => {
    // Ejecuta la función dependiendo de cuántas características se han seleccionado
    // Puedes hacer algo con el array selectedCrts aquí
    //console.log("Características seleccionadas:", selectedCrts);
    try {
      
      selectedCrts.map(async(item) =>{
        const folioreserv = Date.now();
        const addcrt = `CALL addcaracteristica ('${folioreserv}${id}','${id}','${item}');`
        await obtenerDatos(addcrt)
        
      })
      
      
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const carga = `CALL verCaracteristicas('${id}')`
      const response = await obtenerDatos(carga)
      setCrt(response)
    } catch (error) {
      console.error("Error:", error);
    }
    handleClosePopup()
    
    // Llama a tu función con la lógica específica que necesitas
  };

  const deleteCrt = async (folio) =>{
    try {
      const deleteprc = `CALL delete_caract('${folio}')`
      await obtenerDatos(deleteprc)
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const carga = `CALL verCaracteristicas('${id}')`
      const response = await obtenerDatos(carga)
      setCrt(response)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const data = crt.length > 0 ? crt : [{ dnulo: "" }, { dnulo2: "" }];

  return (
    <>
      <BarraNav />
      <section className="u-clearfix u-image u-shading u-section-1">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-27-xl u-size-29-lg u-size-29-md  u-size-29-sm u-size-29-xs u-layout-cell-1">
                  <div class="u-container-layout u-valign-top u-container-layout-1">
                    <div className="accordion">
                      <div className="card">
                        <div className="card-header">
                          <h2 className="mb-0">
                            <button
                              className="btn btn-link btn-block text-left"
                              onClick={() => setVisible(!visible)}
                            >
                              Imagenes
                            </button>
                          </h2>
                        </div>
                        <div
                          className={`collapse show ${visible ? "vh-100" : ""}`}
                        >
                          <div className="card-body">
                            {visible && (
                              <>
                                <div>
                                  <div className="image-container">
                                    {imageLis.length > 0 ? (
                                      imageLis.map((item) => (
                                        <div
                                          className="imgcontainer2"
                                          key={item}
                                        >
                                          <img
                                            src={`http://localhost:3001/imagescabana/${id}/${item}`}
                                            alt="..."
                                          />
                                        </div>
                                      ))
                                    ) : (
                                      <>
                                        <div
                                          class="spinner-border"
                                          role="status"
                                        >
                                          <span class="sr-only">
                                            Loading...
                                          </span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <h2 className="mb-0">
                            <button
                              onClick={() => setVisible2(!visible2)}
                              className="btn btn-link btn-block text-left collapsed"
                            >
                              Caracteristicas
                            </button>
                          </h2>
                        </div>
                        <div
                          className={`collapseTwo ${visible2 ? "vh-100" : ""}`}
                        >
                          <div className="card-body">
                            {visible2 && (
                              <>
                                <h5>Caracteristicas de la cabaña</h5>{" "}
                                <ul className="list-group">
                                  {data[0].map((item) => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                      <label>{item.Descripcion}</label>
                                      <button className="btn btn-outline-danger" onClick={() => deleteCrt(item.clave_caracteristica_cabana)}>
                                        quitar
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                                <button
                                  className="btn btn-success"
                                  onClick={handleOpenPopup}
                                >
                                  Añadir Caracteristica
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <PopUpCrt
                      isOpen={isPopupOpen}
                      onYes={()=>handleButtonClick()}
                      onClose={() => handleClosePopup()}
                      component={
                        crts ? (
                          <ul className="list-group">
                            {crts.map((item) => (
                              <li 
                              className={`list-group-item d-flex justify-content-between align-items-center ${
                                selectedCrts.includes(
                                  item.id_caracteristica
                                )
                                  ? "bg-success"
                                  : ""
                              }`}
                              onClick={() =>toggleSelection(item.id_caracteristica)}
                              >
                                <label>{item.Descripcion}</label>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <h1>
                            <div class="spinner-border" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </h1>
                        )
                      }
                    />

                    <div></div>
                    {/* <img
                      class="u-image u-image-contain u-image-default u-image-1"
                      src=""
                      alt=""
                      data-image-width="525"
                      data-image-height="425"
                    /> */}
                  </div>
                </div>

                <div className="u-container-style u-layout-cell u-right-cell u-size-31-lg u-size-31-md u-size-31-sm u-size-31-xs u-size-33-xl u-layout-cell-2">
                  <div className="u-container-layout u-container-layout-2">
                    <div className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-form u-form-1">
                      <form
                        onSubmit={handleSubmit}
                        className="u-clearfix u-form-spacing-30 u-form-vertical u-inner-form"
                      >
                        {/* Sección de Información Básica */}
                        <h2>Actualizar Datos de Cabaña</h2>
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
                            Actualizar
                          </button>
                        </div>
                      </form>

                      <div className="u-clearfix u-form-spacing-30 u-form-vertical u-inner-form">
                        <div className="u-form-address u-form-group u-form-group-3">
                          <label className="u-label u-text-body-alt-color u-label-3">
                            En este campo carga las imágenes que necesite de tu
                            cabaña:
                          </label>
                          <input
                            className="u-border-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-input u-input-rectangle"
                            id="fileinput"
                            type="file"
                            name="imagen"
                            accept="image/*"
                            required
                            onChange={selectedHandler}
                          />
                        </div>

                        <div className="u-align-left u-form-group u-form-submit">
                          <button
                            onClick={senHandler}
                            className="u-active-white u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-white u-palette-3-base u-radius-50 u-btn-1"
                          >
                            Agregar Imagen
                          </button>
                        </div>
                      </div>
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

export default EditCabana;
