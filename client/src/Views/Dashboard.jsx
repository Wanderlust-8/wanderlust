import React from "react";
import NavBar from "../Components/NavBar";
import SideBarAdmin from "../Components/SideBarAdmin";
import DashboardAdmin from "../Components/DashboardAdmin";

function Dashboard() {
  return (
    <>
      <div className="relative bg-red-600 ">
        <NavBar />
      </div>
      <div className="flex max-h-screen overflow-auto">
        <SideBarAdmin />
        <DashboardAdmin />
      </div>
    </>
  );
}

export default Dashboard;
