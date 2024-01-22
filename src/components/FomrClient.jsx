import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { obtenerDatos } from "../auth/GetData";
//import "../CSS/editcabana.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { API_URL } from "../auth/constans";

function FomrClient({ precioCab, clabeCab, onclose, fechas }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nights, setNights] = useState(0);
  const [precioReal, setPrecioReal] = useState(0);
  const [price, setPrice] = useState(0);
  const [clvB, setClvB] = useState("");
  const [blockedDates, setBlockedDates] = useState([]);
  const today = new Date();

  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startDay, setStartDay] = useState("");

  const [endYear, setEndYear] = useState("");
  const [endtMonth, setEndMonth] = useState("");
  const [endtDay, setEndDay] = useState("");

  const [curp, setCurp] = useState("");
  const idUser = sessionStorage.getItem('userId');
  const [results, setResults] = useState([{ result: "" }]);
  const [folioClient, setFolioClient] = useState("");
  

  const handleStartDateChange = (date) => {
    setStartDate(date);
    console.log(`fecha de entrada: ${date}`)
    setStartYear(date.getFullYear());
    setStartMonth((date.getMonth() + 1).toString().padStart(2, "0")); // Agrega cero a la izquierda si es necesario
    setStartDay(date.getDate().toString().padStart(2, "0")); // Agrega cero a la izquierda si es necesario
    calculateNightsAndPrice(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setEndYear(date.getFullYear());
    setEndMonth((date.getMonth() + 1).toString().padStart(2, "0")); // Agrega cero a la izquierda si es necesario
    setEndDay(date.getDate().toString().padStart(2, "0")); // Agrega cero a la izquierda si es necesario
    calculateNightsAndPrice(startDate, date);
  };

  const calculateNightsAndPrice = (start, end) => {
    if (start && end) {
      const nightsDifference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setNights(nightsDifference);
      const totalPrice = nightsDifference * precioReal;
      setPrice(totalPrice);
    }
  };

 

  useEffect(()=>{
    setPrecioReal(parseFloat(precioCab));
    setClvB(clabeCab);
    setBlockedDates(fechas)
  },[])


  const handleSubmitRes = async (e) => {
    e.preventDefault();
    setFolioClient(uuidv4());
    console.log(`id de usuario: ${idUser}`)
    const folioreserv = Date.now();
    try {
      console.log(folioClient);
      const reg = `call hacer_reservacion('${folioreserv}',${idUser},'${clvB}','${startYear}-${startMonth}-${startDay}','${endYear}-${endtMonth}-${endtDay}','${price}')`;
      console.log(reg)
      await obtenerDatos(reg);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isDateBlocked = (date) => {
    return blockedDates.some((block) => {
      const blockStartDate = new Date(block.Fecha_Entrada);
      const blockEndDate = new Date(block.Fecha_Salida);
      return date >= blockStartDate && date <= blockEndDate;
    });
  };

  return (
    <>
      <section>
        <div className="registro-caban">
          <form onSubmit={handleSubmitRes}>
                
                <div>
                  <label>Fecha de Entrada:</label>
                  <DatePicker
                    required
                    selected={startDate}
                    onChange={handleStartDateChange}
                    minDate={today} // No se puede seleccionar una fecha anterior a hoy
                    maxDate={
                      endDate
                        ? new Date(endDate.getTime() - 24 * 60 * 60 * 1000)
                        : null
                    } // No se puede seleccionar un día antes o el mismo día de la fecha de salida
                    filterDate={(date) => !isDateBlocked(date)}
                  />
                </div>
                <div>
                  <label>Fecha de Salida:</label>
                  <DatePicker
                    required
                    selected={endDate}
                    onChange={handleEndDateChange}
                    minDate={
                      startDate
                        ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
                        : today
                    } // No se puede seleccionar un día antes o el mismo día de la fecha de inicio
                    filterDate={(date) => !isDateBlocked(date)}
                  />
                </div>
                <div>
                  <label>Noches:</label>
                  <span>{nights}</span>
                </div>
                <div>
                  <label>Precio Total:</label>
                  <span>${price}</span>
                </div>
                <div>
                  <button type="submit">Reservar</button>
                </div>
              </form>
          <button onClick={onclose}>Cancelar</button>
        </div>
      </section>
    </>
  );
}

export default FomrClient;
