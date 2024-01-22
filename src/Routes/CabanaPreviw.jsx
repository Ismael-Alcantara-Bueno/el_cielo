import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import BarraNav from "../components/BarraNav";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { obtenerDatos } from "../auth/GetData";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../CSS/cabanapreview.css";
import { API_URL } from "../auth/constans";
import FomrClient from "../components/FomrClient";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CabanaPreviw = () => {
  const rol = sessionStorage.getItem("rol");
  const goTo = useNavigate();
  const [visble, setVisible] = useState(false);
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const idUser = sessionStorage.getItem("userId");
  const userId = Cookies.get("user");
  const [datos, setDatos] = useState([]);
  const [dates, setDates] = useState([]);
  const [dates2, setDates2] = useState([]);
  const [imageLis, setImageLis] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [precobt, setprecobt] = useState(0);
  const [fav, setFav] = useState("");
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

  const chetFav = async () => {
    try {
      const response = await obtenerDatos(
        `call chectFav ('${idUser}','${id}')`
      );
      setFav(response[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const chfav = fav.length > 0 ? fav : [{ dnulo: "" }, { dnulo: "" }];

  const addFav = async () => {
    if (chfav[0].results == "0") {
      try {
        await obtenerDatos(
          `call addFav ('${idUser}_${id}','${idUser}','${id}')`
        );
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        await obtenerDatos(`call deleteFav ('${idUser}','${id}')`);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    chetFav();
  };

  useEffect(() => {
    const consulta = `CALL cabanaPreveiw('${id}')`;
    const consulta2 = `CALL verCaracteristicas('${id}')`;

    obtenerDatos(consulta)
      .then((data) => {
        setDatos(data);
        console.log(`datos obtenidos ${JSON.stringify(data[1], null, 2)}`);
        setDates(data[1]);
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
      .then((crt) => {
        setCaracteristicas(crt);
      })
      .catch((error) => console.error("Error:", error));
    vewImage();
    //console.log(`dato ${JSON.stringify(imageLis, null, 2)}`);
    chetFav();
    console.log(`favorito? ${JSON.stringify(fav, null, 2)}`);
    //console.log(`favorito2? ${JSON.stringify(fav, null, 2)}`)
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

  const openpop = () => {
    if (!idUser) {
      goTo("/InicioSecion");
    } else {
      setprecobt(formulario.precio);
      setDates(dates);
      setVisible(true);
    }
  };

  const dataC =
    caracteristicas.length > 0
      ? caracteristicas
      : [{ dnulo: "" }, { dnulo: "" }];

  return (
    <>
      <BarraNav />
      <section>
        <Container className="mt-4">
          <h1>{formulario.nombre}</h1>
          <Carousel className="mb-4 m-n4">
            {imageLis.length > 0 ? (
              imageLis.map((item, index) => (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:3001/imagescabana/${id}/${item}`}
                    alt={`Imagen ${index + 1}`}
                  />
                </Carousel.Item>
              ))
            ) : (
              <>
                <h3>Cargando...</h3>
              </>
            )}
          </Carousel>
          <Row>
            <Col>
              <p className="lead">{formulario.descripcion}</p>
            </Col>
            {!idUser ? (
              <></>
            ):(
              <Col className="text-rigth">
              <Button variant="link" onClick={addFav}>
                {chfav[0].results == "0" ? (
                  <FaHeart size="2rem" />
                ) : (
                  <FaHeart color="red" size="2rem" />
                )}
              </Button>
            </Col>
            )}
            
          </Row>

          <Row>
            <Col>
              <p>
                <strong>Precio por noche: </strong>
                {formulario.precio}
              </p>
              <p>
                <strong>Ubicación: </strong>
                {formulario.ubicacion}
              </p>
              <p>
                <strong>Capacidad: </strong>
                {formulario.capacidad} personas maximo
              </p>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <h5>Caracteristicas</h5>
              <ListGroup>
                {dataC[0].length > 0 ? (
                  dataC[0].map((item, index) => (
                    <ListGroup.Item key={index}>
                      {item.Descripcion}
                    </ListGroup.Item>
                  ))
                ) : (
                  <></>
                )}
              </ListGroup>
            </Col>
          </Row>

          <Button className="m-5" variant="success" onClick={() => openpop()}>
            Reservar
          </Button>
        </Container>
      </section>
      {visble && (
        <FomrClient
          precioCab={precobt}
          onclose={() => setVisible(false)}
          clabeCab={id}
          fechas={dates}
        />
      )}

      <Footer />
    </>
  );
};

export default CabanaPreviw;
