import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Routes/Error";
import Casa from "./Routes/Casa";
import Registro from "./Routes/Registro";
import InicioSesion from "./Routes/InicioSecion";
import SecionUsuario from "./Routes/SecionUsuario";
import "./CSS/nicepage.css";

import ProtectedRoute from "./Routes/ProtectedRoute";
import { AuthProvider } from "./auth/AuthProvider";
import SnakeGame from "./Routes/SnakeGame";
import ParteAlta from "./components/ParteAlta";
import MisCabanas from "./Routes/MisCabanas";
import { UserProvider } from "./auth/UserContext";
import RegistroCaban from "./Routes/RegistroCaban";
import EditCabana from "./Routes/EditCabana";
import CabanaPreviw from "./Routes/CabanaPreviw";
import MisReservas from "./Routes/MisReservas";
import ParteBaja from "./Routes/ParteBaja";
import Favoritos from "./Routes/Favoritos";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Casa />,
      errorElement: <Error />,
    },
    {
      path: "/InicioSecion",
      element: <InicioSesion />,
    },
    {
      path: "/Registro",
      element: <Registro />,
    },
    {
      path: "/partealta",
      element: <ParteAlta/>
    },
    {
      path:"/partebaja",
      element: <ParteBaja/>
    },
    {
      path:"/Favoritos",
      element: <Favoritos/>
    },
    {
      path: "/Cabaña/:id",
      element: <CabanaPreviw/>
    },
    {
      path: "/Mis Reservaciones",
      element: <MisReservas/>
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/SecionUsuario",
          element: <SecionUsuario />,
        },
        {
          path: "/Micabaña/",
          element: <MisCabanas/>
        },
        {
          path: "/RegistrodeCabañas",
          element: <RegistroCaban/>
        },
        {
          path: "/EditarCabaña/:id",
          element: <EditCabana/>
        }
        
      ],
    },
    {
      path:"/LaViborita",
      element:<SnakeGame/>
    }
  ]);
  return (
    <div className="u-body u-xl-mode">
      <AuthProvider>
        <RouterProvider router={router} />
        
      </AuthProvider>
    </div>
  );
}

export default App;
