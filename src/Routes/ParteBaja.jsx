import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

//import 'leaflet/dist/leaflet.css';
import { API_URL } from "../auth/constans";

import { obtenerDatos } from "../auth/GetData";
import BarraNav from "../components/BarraNav";
import Footer from "../components/Footer";

//import "../CSS/parte_alta.css";

const Mapa = ({ latitud, longitud }) => {
  useEffect(() => {
    const mapContainer = L.DomUtil.get("map");

    if (mapContainer && latitud !== undefined && longitud !== undefined) {
      if (mapContainer._leaflet_id) {
        mapContainer._leaflet_id = null;
      }

      const map = L.map(mapContainer).setView([latitud, longitud], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.marker([latitud, longitud]).addTo(map);
    }
  }, [latitud, longitud]);

  return <div id="map" style={{ height: "500px" }}></div>;
};

const ParteBaja = () =>{
    const [datos, setDatos] = useState([]);
    const [error, setError] = useState(null);
    const [cabanaSeleccionada, setCabanaSeleccionada] = useState(null);
    const [dataCab, setDataCab] = useState([]);
    const [imageLis, setImageLis] = useState([]);
    const [imageLisObj, setImageLisObj] = useState({});
    const goTo = useNavigate();
  
    const mapContainerRef = useRef(null);
  
    const vewImage = async (id) => {
      try {
        const response = await fetch(`${API_URL}/imagescabana/get/${id}`);
        const data = await response.json();
        setImageLis([...imageLis, { id }]);
      } catch (error) {
        console.error("Error al llamar a la API:", error);
      }
    };
    const verlista = () => {
      console.log(`Lista de imagenes ${JSON.stringify(imageLisObj, null, 2)}`);
    };
    const handleMostrarUbicacion = (cabaña) => {
      setCabanaSeleccionada(cabaña);
  
      if (mapContainerRef.current) {
        mapContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
  
    useEffect(() => {
      const consulta = "CALL verPartebaja";
      obtenerDatos(consulta).then(async (data) => {
        setDataCab(data[0]);
  
        const imagesObj = {}; // Objeto para almacenar imágenes por clave
  
        const fetchImagePromises = data[0].map(async (item) => {
          console.log(item.Clave_Cabaña);
          try {
            const response = await fetch(
              `${API_URL}/imagescabana/get/${item.Clave_Cabaña}`
            );
            const imageData = await response.json();
  
            // Almacena la imagen en el objeto usando la clave correspondiente
            imagesObj[item.Clave_Cabaña] = imageData;
  
            // Puedes eliminar este paso si no necesitas almacenar en el state también
            setImageLis((prevImages) => [...prevImages, imageData]);
          } catch (error) {
            console.error("Error al llamar a la API:", error);
          }
        });
  
        await Promise.all(fetchImagePromises);
  
        // Ahora, imagesObj contiene las imágenes organizadas por la clave
        console.log(imagesObj);
  
        // Puedes almacenar imagesObj en tu state si es necesario
        setImageLisObj(imagesObj);
      });
    }, []);
  
    /*dataCab.map(img =>{
      vewImage(img.Clave_Cabaña)
    })
    console.log(`liusta de imagenes ${imageLis}`)*/
  
    return (
      <>
        <BarraNav/>
        <div>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <div>
              <div>
                <h3>Parte Baja</h3>
                {dataCab.map((item, index) => (
                  <>
                    <div className="media bg-light shadow-sm rounded border-dark m-5">
                      <img
                        src={`http://localhost:3001/imagescabana/${
                          item.Clave_Cabaña
                        }/${
                          imageLisObj[item.Clave_Cabaña] &&
                          imageLisObj[item.Clave_Cabaña][0]
                        }`}
                        alt={`Imagen de ${item.Nombre_Cabaña}`}
                        className="align-self-start mr-3"
                        style={{
                          width: "100px", // Puedes cambiar el tamaño según tus necesidades
                          height: "100px",
                          clipPath: "inset(10% 10% 10% 10%)",
                        }}
                        onError={(e) => {
                          console.error("Error cargando la imagen:", e);
                          console.log("URL de la imagen:", item.Imagen_URL);
                          e.target.src =
                            "https://i0.wp.com/foodandpleasure.com/wp-content/uploads/2022/07/cabanas-enologicas.jpg?w=1200&ssl=1";
                        }}
                      />
                      <div className="media-body">
                        <h3 className="mt-05">{item.Nombre_Cabaña}</h3>
                        <p>{item.Descripcion_Cabaña}</p>
                        <p>${item.Precio_Cabaña} MXN</p>
                        <p className="card-text">
                          <small className="text-muted">
                            A Nombre de: {item.Nombre} {item.Apellido1}{" "}
                            {item.Apellido2}
                          </small>
                        </p>
                        <button
                          onClick={() => goTo(`/Cabaña/${item.Clave_Cabaña}`)}
                          className="btn btn-success m-2"
                        >
                          Ver mas detalles
                        </button>
                        <button
                          onClick={() => handleMostrarUbicacion(item)}
                          className="btn btn-success m-2"
                        >
                          Mostrar Ubicación
                        </button>
                      </div>
                    </div>
                  </>
                ))}
              </div>
  
              {cabanaSeleccionada && (
                <div ref={mapContainerRef}>
                  <h2>Ubicación de {cabanaSeleccionada.Nombre_Cabaña}</h2>
                  <Mapa
                    latitud={cabanaSeleccionada.Latitude}
                    longitud={cabanaSeleccionada.Longitude}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <Footer/>
      </>
    );
}

export default ParteBaja