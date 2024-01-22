import { useContext, createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { API_URL } from "./constans";
const AuthContext = createContext({
  isAuthenticate: false,
  login: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticate, setIsAuthenticate] = useState(true);

  const checkAuth = async () => {
    const clientCurrentTime = new Date();
    console.log("Fecha actual del cliente:", clientCurrentTime);

    try {
      const accesTokenC = Cookies.get("accessToken");
      //console.log(`cookie obtenida: ${accesTokenC}`);
      console.log(accesTokenC);
      /*if (accesTokenC) {
        const response = await fetch(`${API_URL}/check-auth`, {
          method: "POST",
          headers: {
            "Content-Type": "aplication/json",
            Authorization: `Bearer ${accesTokenC}`,
          },
        });
        if (response.ok) {
          setIsAuthenticate(true);
        } else {
          setIsAuthenticate(false);
          Cookies.remove("accesToken");
        }
      } else {
        setIsAuthenticate(false);
      }*/
    } catch (error) {
      console.error("Error al verificar la autenticacion: ", error);
    }
  };

  useEffect(() => {
    //checkAuth();
  });

  const login = (getAccestoken) => {
    //console.log(getAccestoken.user);
    setIsAuthenticate(true);
    Cookies.set("accessToken", getAccestoken.accessToken, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("user", getAccestoken.user.id, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticate, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
