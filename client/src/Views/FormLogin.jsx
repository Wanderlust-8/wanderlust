import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authContext } from "../Context/authContext";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import logo from "../Utils/Img/logo.webp";
import sideImage from "../Utils/Img/side.webp";
import { loginUser } from "../Redux/Users/usersActions";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";
import { userShopping } from "../Redux/ShoppingCart/shoppingCartActions";
import { GrFormClose } from "react-icons/gr";
import { adminTrue } from "../Redux/UserAdmin/userAdminAction";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [emailModal, setEmailModal] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formFilled, setFormFilled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useContext(authContext);

  const user = useSelector((state) => state.users.user);
  const user1 = useSelector((state) => state.users.usersList);
  // const user2 = useSelector((state) => state.users.usersFiltered);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    login,
    error,
    currentUser,
    signInWithGoogle,
    signInWithGithub,
    resetError,
    resetPassword,
  } = useAuth();
  useEffect(() => {
    if (error) {
      setErrorMsg(error);
      toast.error(error);
    } else if (currentUser) {
      // const find = user1.find((us) => us.uid === currentUser.uid);
      // const profileStorage = find;
      // localStorage.setItem("profileStorage", JSON.stringify(profileStorage));
      // const getProfileStorage = JSON.parse(
      //   localStorage.getItem("profileStorage")
      // );
      // console.log("getProfileStorage", getProfileStorage);

      // //if(profileStorage.locked)  ???
      // if (getProfileStorage.locked) {
      //   logout();
      navigate("/home");
      //   toast.error("Usuario bloqueado", {
      //     position: toast.POSITION.TOP_CENTER,
      //     autoClose: 3000,
      //   });
      // } else {
      //   if (getProfileStorage.profile === 1) {
      //     toast.success(`Bienvenido ${currentUser.displayName}!`);

      //     navigate("/home");
      //   } else {
      //     toast.success(`Bienvenido ${currentUser.displayName}!`);

      //     dispatch(adminTrue(2));
      //     navigate("/admin");
      // }
      // }
    }
    return () => {
      setErrorMsg("");
      resetError();
    };
  }, [error, currentUser, navigate, resetError]);

  useEffect(() => {
    setFormFilled(email && password); // si email y password tienen valor, formFilled es true
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Regex for email validation
    const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    //validation email and password in firebase
    if (!email || !password) {
      setErrorMsg("Por favor, ingrese email y contraseña.");
      return;
    }

    // Validating the email
    if (!emailValidation.test(email)) {
      setErrorMsg("Por favor, ingrese un email válido.");
      return;
    }

    // Validating the password
    if (password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    try {
      await login(email, password);
      dispatch(loginUser(user), userShopping(currentUser.uid));
    } catch (error) {
      setErrorMsg(error.message);
      console.log(error);
    }
  };

  const handleResetPasswordmodal = () => {
    setIsModalOpen(true);
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(emailModal);
      setEmailModal("");
      setIsModalOpen(false);
    } catch (error) {
      setErrorMsg(error.message);
      console.log(error);
    }
  };
  // console.log("esto es currentuser:", currentUser);

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      dispatch(userShopping(currentUser.uid));
    } catch (error) {
      setErrorMsg(error.message);
      console.log(error);
    }
  };

  const handleGithub = async () => {
    try {
      await signInWithGithub();
      console.log("github");
    } catch (error) {
      setErrorMsg(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Columna Izquierda */}
      <div className="flex flex-col w-full lg:w-1/2">
        {/* Logo */}
        <div className="p-6">
          <img className="h-12" src={logo} alt="Logo" />
        </div>

        {/* Formulario */}
        <div className="mx-auto my-auto p-10 w-full md:w-2/3">
          {/* Titulos */}
          <div className="flex justify-between mb-5">
            <h2 className="text-gray-700 text-lg font-bold ">Ingresar</h2>
            <Link to="/register">
              <h2 className="text-blue-600 text-base font-normal tracking-wide hover:underline cursor-pointer">
                Registrarse
              </h2>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            {/* Inputs */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="px-4 py-3 border rounded border-gray-300  text-gray-500 text-sm font-normal h-12"
            />

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="px-4 py-3 border rounded w-full text-gray-500 text-sm font-normal h-12"
              />

              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiFillEye
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            {/* Botón Ingresar */}
            <button
              className="bg-gray-400 text-white py-2 rounded-md text-center h-12"
              style={{ backgroundColor: formFilled ? "#43B97F" : "#gray-400" }}
            >
              Ingresar
            </button>

            {/* Link Contraseña */}
            <h1
              className="mt-5 text-blue-500 text-center hover:underline cursor-pointer"
              onClick={handleResetPasswordmodal}
            >
              ¿Olvidaste tu contraseña?
            </h1>

            {isModalOpen && (
              <div className="fixed z-10 inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900">
                <div className="mx-4 bg-white rounded-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5 p-6">
                  <div className="flex justify-end">
                    <button onClick={() => setIsModalOpen(false)}>
                      <GrFormClose size={24} />
                    </button>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      ¿Olvidaste tu contraseña?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Ingresa tu correo electrónico y te enviaremos un enlace
                        para restablecer tu contraseña.
                      </p>
                      <input
                        value={emailModal}
                        onChange={(e) => setEmailModal(e.target.value)}
                        placeholder="Correo electrónico"
                        className="px-4 py-3 border rounded border-gray-300 text-gray-500 text-sm font-normal h-12 w-full mt-4"
                      />
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        onClick={handleResetPassword}
                      >
                        Enviar enlace de restablecimiento
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Espaciado */}
            <div className="mt-10">
              {/* Separador */}
              <div className="relative my-5">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-gray-300 text-sm font-normal tracking-wide p-4">
                    o inicia sesión con
                  </span>
                </div>
              </div>
              {/* Botones Redes Sociales */}

              <div className="flex flex-col space-y-5">
                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 w-full h-12"
                  onClick={handleGoogle}
                >
                  <FcGoogle className="h-5 w-5 mr-2" />
                  <span className="text-gray-700 font-bold text-sm">
                    Google
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 w-full h-12"
                  onClick={handleGithub}
                >
                  <GrGithub className="h-5 w-5 mr-2" />
                  <span className="text-gray-700 font-bold text-sm">
                    Github
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="hidden lg:block lg:w-1/2 p-8 overflow-hidden">
        <img
          className="object-contain rounded h-full w-full"
          src={sideImage}
          alt="Side"
        />
      </div>
    </div>
  );
};

export default LoginPage;
