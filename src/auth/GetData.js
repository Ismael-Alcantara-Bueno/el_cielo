
import { API_URL } from "./constans";

export const obtenerDatos = async (consulta) => {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(consulta)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
