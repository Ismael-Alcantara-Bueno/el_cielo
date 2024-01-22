import React from "react";
import BarraNav from "../components/BarraNav";
import img1 from "../assets/imagenes/prueba.webp";
import Footer from "../components/Footer";
import "../CSS/Inicio.css";
import nuevaImagen from "../assets/imagenes/reserva-ecologica-biosfera-cielo-paraiso.webp";
import nuevaImagen2 from "../assets/imagenes/reserva_el_cielo.jpg";


function Casa() {
  return (
    <>
      <BarraNav />
      <section
        class="u-align-center u-clearfix u-image u-shading u-section-1"
        src=""
        data-image-width="256"
        data-image-height="256"
        id="sec-5c2b"
      >
        <div class="u-clearfix u-sheet u-sheet-1">
          <h1 class="u-text u-text-default u-title u-text-1">
            El Cielo - Tamaulipas
          </h1>
          <p class="u-large-text u-text u-text-default u-text-variant u-text-2">
            Bienvenidos a "El Cielo", un rincón paradisíaco en el corazón de
            Tamaulipas, México. Sumérgete en la serenidad de la naturaleza y
            descubre la magia de este destino único. Desde majestuosas cascadas
            hasta exuberantes bosques, "El Cielo" ofrece una experiencia
            inigualable para aquellos que buscan un escape tranquilo y
            rejuvenecedor.
          </p>

          {/*Usar un Link para una futura pagina*/}
          <a href="#" class="u-btn u-button-style u-palette-2-base u-btn-1">
            Mas informes
          </a>
        </div>
      </section>
      <section className="u-align-center u-clearfix u-section-2">
        <div className="u-clearfix u-sheet u-sheet-1">
          <div className="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div
                  className="u-align-left u-container-style u-image u-layout-cell u-left-cell u-size-30 u-size-xs-60 u-image-1"
                  data-image-width="1080"
                  data-image-height="1080"
                  style={{ backgroundImage: `url(${nuevaImagen})` }}
                ></div>
                <div className="u-align-left u-container-style u-layout-cell u-palette-1-base u-right-cell u-size-30 u-size-xs-60 u-layout-cell-2">
                  <div className="u-container-layout u-valign-middle u-container-layout-2">
                    <h2 className="u-text u-text-default u-text-1">
                      Parte alta
                    </h2>
                    <p class="u-text u-text-2">
                    Es un escenario natural impresionante, 
                    caracterizado por majestuosas cascadas y exuberantes bosques. 
                    Este rincón paradisíaco en el corazón de México ofrece una experiencia única, 
                    donde la serenidad de la naturaleza se combina con la magia de paisajes pintorescos.
                    </p>
                    <a
                      href=""
                      className="u-border-2 u-border-white u-btn u-btn-rectangle u-button-style u-none u-btn-1"
                    >
                      Ver Mas
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div className="u-align-left u-container-style u-layout-cell u-palette-1-base u-right-cell u-size-30 u-size-xs-60 u-layout-cell-2">
                  <div className="u-container-layout u-valign-middle u-container-layout-2">
                    <h2 className="u-text u-text-default u-text-1">
                      Parte Baja
                    </h2>
                    <p class="u-text u-text-2">
                    Ofrece una serenidad única,
                    este destino cautiva a aquellos que buscan un escape tranquilo y rejuvenecedor. 
                    Experimenta la magia de la naturaleza en su máxima expresión,
                    donde la flora y fauna crean un paisaje que invita a la exploración
                     y la conexión con la belleza natural de México.
                    </p>
                    <a
                      href=""
                      className="u-border-2 u-border-white u-btn u-btn-rectangle u-button-style u-none u-btn-1"
                    >
                      Ver Mas
                    </a>
                  </div>
                </div>
                <div
                  className="u-align-left u-container-style u-image u-layout-cell u-left-cell u-size-30 u-size-xs-60 u-image-1"
                  data-image-width="1080"
                  data-image-height="1080"
                  style={{ backgroundImage: `url(${nuevaImagen2})` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Casa;
