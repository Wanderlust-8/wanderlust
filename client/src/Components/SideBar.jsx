import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Context/authContext";
import {
  // BsHouseDoor,
  BsBox,
  // BsGraphUp,
  // BsCardChecklist,
  BsPerson,
  BsBoxArrowInRight,
} from "react-icons/bs";

function Sidebar() {
  const { logout } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogoutClick = (event) => {
    logout();

    console.log("logout");
    navigate("/home");
  };

  
  return (
    <div className="flex flex-col justify-between w-64 min-h-screen bg-white text-black px-6 py-4 rounded-lg shadow-lg overflow-auto">
      <ul>
        <li className="mb-6 flex items-center">
          <BsBox className="mr-4" />
          <Link to="/userProfile/packages">Paquetes</Link>
        </li>
        {/* <li className="mb-6 flex items-center">
          <BsGraphUp className="mr-4" />
          <Link to="/activity">Actividades</Link>
        </li>
        <li className="mb-6 flex items-center">
          <BsCardChecklist className="mr-4" />
          <Link to="/itinerary">Itinerario</Link>
        </li> */}
        <li className="mb-6 flex items-center">
          <BsPerson className="mr-4" />
          <Link to="/userProfile/profile">Perfil</Link>
        </li>
      </ul>
      <ul>
        <li className="mb-6 flex items-center">
          <BsBoxArrowInRight className="mr-4" />
          <button onClick={() => {handleLogoutClick()}}>Cerrar Sesion</button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
