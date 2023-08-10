import React from "react";
import { Link,useLocation } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { LuPackageSearch } from "react-icons/lu";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { BsHouseDoor, BsBoxArrowInRight } from "react-icons/bs";
import { BsGraphUp } from "react-icons/bs";


function SidebarAdmin() {

  const location = useLocation();
  
  const isActiveLink = (path) => {
    return location.pathname === path;
  };
  return (

    <div className="flex flex-col justify-between w-64 min-h-screen  bg-white text-black px-6 py-4 rounded-lg shadow-xl overflow-auto fontPoppins text-sm mt-10 ">
      <ul>
        <li className={`mb-6 flex items-center ${isActiveLink("/home") ? "bg-gray-200 text-black" : ""}`}>
          <BsHouseDoor className="mr-4" />
          <Link to="/home">Home</Link>
        </li>

        <li className={`mb-6 flex items-center ${isActiveLink("/admin/users") ? "bg-gray-200 text-black" : ""}`}>
          <AiOutlineUser className="mr-4" />
          <Link to="/admin/users">Users</Link>
        </li>
        <li className={`mb-6 flex items-center ${isActiveLink("/admin/packages") ? "bg-gray-200 text-black" : ""}`}>
          <LuPackageSearch className="mr-4" />
          <Link to="/admin/packages">Packages</Link>
        </li>
        <li className={`mb-6 flex items-center ${isActiveLink("/admin/formPackages") ? "bg-gray-200 text-black" : ""}`}>
          <MdOutlineCreateNewFolder className="mr-4" />
          <Link to="/admin/formPackages">Create Packages</Link>

        </li>
        <li className={`mb-6 flex items-center ${isActiveLink("/admin/dashboard") ? "bg-gray-200 text-black" : ""}`}>
          <BsGraphUp className="mr-4" />
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
      </ul>
      <ul>
        <li className={`mb-6 flex items-center ${isActiveLink("/logout") ? "bg-gray-200 text-black" : ""}`}>
          <BsBoxArrowInRight className="mr-4" />
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default SidebarAdmin;
