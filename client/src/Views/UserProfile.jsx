import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Nota que importamos Routes y Route en lugar de useRoutes
import { Link } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../Components/NavBar";
import Sidebar from "../Components/SideBar";
import UserDate from "../Components/Userprofile/UserDetail";
import Packages from "../Components/Userprofile/Packages";

const UserProfile = () => {
  const { currentUser, logout } = useAuth();

  const handleLogoutClick = (event) => {
    event.preventDefault();
    logout();
    console.log("logout");
  };

  return (
    <div className="overflow-hidden">
      <div className="relative bg-verdeFooter">
        <NavBar />
      </div>

      <div className="flex max-h-screen overflow-auto">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="packages" />} />{" "}
          {/* Redirección */}
          <Route path="profile" element={<UserDate />} />
          <Route path="packages" element={<Packages />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserProfile;
