import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";
import { authContext } from "../Context/authContext";
import { CgProfile } from "react-icons/cg";
// import { useAuth } from "../Context/authContext";
// import UserProfile from "../Views/UserProfile";
import { useNavigate } from "react-router-dom";
// import { adminTrue } from "../Redux/UserAdmin/userAdminAction";
// import { useDispatch } from "react-redux";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

function NavBar() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.carrito.cart);
  // const admin = useSelector((state) => state.admin.admin);
  // const user1 = useSelector((state) => state.users.usersList);
  console.log("cartItems", cartItems);
  const { currentUser, setCurrentUser, logout } = useContext(authContext);
  const [isOpen, setIsOpen] = useState(false);
  // const [profileAdmin, setProfileAdmin] = useState(false);
  // const getProfileStorage = JSON.parse(localStorage.getItem("profileStorage"));
  // console.log("ADMIN", admin);

  const handleLogoutClick = (event) => {
    event.preventDefault();
    // noAdmin();
    // logOutLocalStorage();
    logout();

    console.log("logout");
    navigate("/home");
  };

  // function logOutLocalStorage() {
  //   // const profileStorage = 3;
  //   localStorage.removeItem("profileStorage");

  //   // localStorage.setItem("profileStorage", JSON.stringify(profileStorage));
  // }

  let localStorageJSON = localStorage.getItem("carrito");
  // console.log('JSON', localStorageJSON)
  let storedItems = [];
  if (localStorageJSON !== null) {
    storedItems = JSON.parse(localStorageJSON); //convierte a JS
  }
  // console.log("el js", storedItems.length);
  let cantidadEnCarro = 0;

  if (currentUser) {
    // Si hay un usuario logueado
    if (cartItems && cartItems.length > 0) {
      cantidadEnCarro = cartItems.length;
    }
  } else {
    // Si no hay usuario logueado, verificar localStorage
    let localStorageJSON = localStorage.getItem("carrito");
    if (localStorageJSON !== null) {
      let storedItems = JSON.parse(localStorageJSON);
      cantidadEnCarro = storedItems.length;
    }
  }
  // function noAdmin() {
  //   dispatch(adminTrue(3));
  // }
  // console.log("ADMIN? ==", getProfileStorage.profile);
  return (
    <div className="flex flex-row p-5 h-24 z-50">
      <div className="flex flex-col">
        <div className="mt-0 flex h-full w-[280px]    logo"></div>
        {/* {getProfileStorage && getProfileStorage.profile === 2 ? ( */}
        <div className="flex items-end justify-end ">
          <span className=" text-xl fonte flex  text-gray-100 -my-1 fontPoppins ml-[10%]">
            <MdOutlineAdminPanelSettings className="mr-1" />
            Administrador
          </span>
        </div>
        {/* // ) : ( // "" // )} */}
      </div>

      <div className="basis-1/2">
        <ul className="flex flex-row justify-center">
          <li className="p-2 mr-5 ml-5 tracking-wider flex-none transition duration-200 hover:scale-110">
            <Link
              className="text-m text-white fontPoppins hover:fontPoppinsB font-bold"
              to="/home"
            >
              Home
            </Link>
          </li>
          <li className="p-2 mr-5 ml-5 tracking-wider flex-none transition duration-200 hover:scale-110">
            <Link
              className="text-m text-white fontPoppins hover:fontPoppinsB font-bold"
              to="/search"
            >
              Descubre
            </Link>
          </li>
          <li className="p-2 mr-5 ml-5 tracking-wider flex-none transition duration-200 hover:scale-110">
            <Link
              className="text-m text-white fontPoppins hover:fontPoppinsB font-bold"
              to="/about"
            >
              Nosotros
            </Link>
          </li>
          <li className="p-2 mr-5 ml-5 tracking-wider flex-none transition duration-200 hover:scale-110">
            <Link
              className="text-m text-white fontPoppins hover:fontPoppinsB font-bold "
              to="/contact"
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>
      <div className="basis-1/4">
        <ul className="flex flex-row justify-end items-center">
          {currentUser ? (
            <li className="mr-5 relative">
              <button
                className="flex flex-row justify-end items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    className="rounded-full w-10 h-10"
                    alt="user"
                  />
                ) : (
                  <CgProfile className="text-4xl text-white" />
                )}
                <span className="text-white ml-2">
                  {currentUser.displayName}
                </span>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                  <Link
                    to="/userProfile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-verdeFooter hover:text-white"
                    //onclick close modal
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Perfil
                  </Link>
                  {
                    // getProfileStorage && getProfileStorage.profile === 2 ? (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-verdeFooter hover:text-white"
                    >
                      Administrador
                    </Link>
                    // ) : (
                    //   ""
                    // )
                  }
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-verdeFooter hover:text-white"
                    onClick={handleLogoutClick}
                  >
                    Salir
                  </Link>
                </div>
              )}
            </li>
          ) : (
            <>
              <li className="p-2 mr-5 tracking-wider flex-none transition duration-200 hover:scale-110">
                <Link
                  className="text-m text-white fontPoppins hover:fontPoppinsB font-bold"
                  to="/login"
                >
                  Ingresar
                </Link>
              </li>
              <li className="p-2 mr-5 ml-5 tracking-wider flex-none transition duration-200 hover:scale-110">
                <Link
                  className="text-m text-black fontPoppins hover:fontPoppinsB rounded bg-white p-1 mt-1 "
                  to="/register"
                  style={{
                    padding: "10px 24px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    background: "var(--neutrals, #FFF)",
                  }}
                >
                  Regístrate
                </Link>
              </li>
            </>
          )}
          <li className="ml-5 relative">
            {
              // !getProfileStorage || getProfileStorage.profile === 1 ? (
              <Link to="/shoppingCart">
                <BsCart4 className="text-3xl text-white" />
                {cantidadEnCarro > 0 && (
                  <div className="absolute top-0 right-0 text-white bg-red-400 rounded-full w-6 h-6 flex items-center justify-center fontPoppinsB text-sm border border-solid border-white transform translate-x-1/2 -translate-y-1/2">
                    {cantidadEnCarro}
                  </div>
                )}
              </Link>
              // ) : (
              //   ""
              // )
            }
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
