import React, { useEffect, useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import SideBarAdmin from "../Components/SideBarAdmin";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { authContext } from "../Context/authContext";

function Admin() {
  // const { currentUser } = useContext(authContext);
  const navigate = useNavigate();
  // const user1 = useSelector((state) => state.users.usersList);
  // const find = user1.find((us) => us.uid === currentUser.uid);
  // const profileStorage = find;
  // localStorage.setItem("profileStorage", JSON.stringify(profileStorage));
  // const getProfileStorage = localStorage.getItem("profileStorage");
  const [habilitado, setHabilitado] = useState(true);

  // useEffect(() => {
  //   // const getProfileStorage = localStorage.getItem("profileStorage");
  //   const getProfileStorage = JSON.parse(
  //     localStorage.getItem("profileStorage")
  //   );

  //   console.log(getProfileStorage);
  //   if (!getProfileStorage || getProfileStorage.profile === 1) {
  //     navigate("/home");
  //     window.alert("No tiene permiso");
  //   } else {
  //     navigate("/admin");
  //     setHabilitado(true);
  //     console.log("usuario no bloqueado");
  //   }
  // }, []);

  return (
    <>
      {habilitado ? (
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
