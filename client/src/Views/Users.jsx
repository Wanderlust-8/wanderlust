import React from "react";
import NavBar from "../Components/NavBar";
import SideBarAdmin from "../Components/SideBarAdmin";

import UserStadist from "../Components/UserStadist";

function Users() {
  return (
    <>
      <div className="relative bg-red-600 ">
        <NavBar />
        <div className="flex justify-start"></div>
      </div>
      <div className="flex flex-row">
        <div className="flex max-h-screen overflow-auto">
          <SideBarAdmin />
        </div>
        <div className="flex w-[100%] ">
          <div className="  w-[100%] ">
            <UserStadist />
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
