import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import landinggif from "../assets/landinggif.gif";
import { useAuth } from "../Context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../Redux/Users/usersActions";
const LandingPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [exitAnimation, setExitAnimation] = useState(false);
  const user = useSelector((state) => state.users.user); // esto nunca se hace

  //
  if (currentUser) {
    dispatch(fetchUsers());
    localStorage.setItem("current", JSON.stringify(currentUser));
    console.log(currentUser);
    console.log("entra en el primero");
    // const getProfileStorage = JSON.parse(localStorage.getItem("current"));
  } else {
    console.log("entra aca y no hay current");
    console.log(currentUser);
  }
  //

  useEffect(() => {
    const timer = setTimeout(() => {
      setExitAnimation(true);
      setTimeout(() => navigate("/home"), 1000); // después de que la animación se complete, redirige
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: exitAnimation ? 0 : 1, scale: exitAnimation ? 4 : 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center h-screen bg-customGray"
    >
      <img
        src={landinggif}
        alt="Landing presentation"
        className="w-3/4 h-auto"
      />
    </motion.div>
  );
};

export default LandingPage;
