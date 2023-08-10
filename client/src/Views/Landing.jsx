import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import landinggif from "../assets/landinggif.gif";

const LandingPage = () => {
  const navigate = useNavigate();
  const [exitAnimation, setExitAnimation] = useState(false);

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
