import React from "react";
import NavBar from "../Components/NavBar";
import SideBarAdmin from "../Components/SideBarAdmin";
import PackagesList from "../Components/PackagesList";

function PackagesAdmin() {
  return (
    <>
      <div className="relative bg-red-600 ">
        <NavBar />
      </div>
      <div className="flex max-h-screen overflow-auto">
        <SideBarAdmin />
        <PackagesList />
      </div>
    </>
  );
}

export default PackagesAdmin;
