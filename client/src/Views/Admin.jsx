import React, { useEffect, useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import SideBarAdmin from "../Components/SideBarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../Redux/Users/usersActions";
// import { authContext } from "../Context/authContext";

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user1 = useSelector((state) => state.users.usersList);

  const [habilitado, setHabilitado] = useState(true);
  let userEnStorage = JSON.parse(localStorage.getItem("user"));
  console.log("ESTO ES USER EN STORAGE LUEGO DE CERRAR SESION:", userEnStorage);
  useEffect(() => {
    dispatch(fetchUsers());
    if (user1) {
      if (!userEnStorage) {
        console.log("que onda");

        navigate("/home");
        setTimeout(function () {
          window.alert("Acceso bloqueado :)");
        }, 1000);
      } else if (userEnStorage.profile === 1) {
        console.log("entra en el segundod e admin");
        navigate("/home");
        setTimeout(function () {
          window.alert("Acceso bloqueado :)");
        }, 1000);
      }
    } else console.log("BIENVENIDO");
  }, []);

  return (
    <>
      {userEnStorage && userEnStorage.profile === 2 ? (
        <>
          <div className="relative bg-red-600 ">
            <NavBar />
          </div>
          <div>
            <SideBarAdmin />
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
export default Admin;
