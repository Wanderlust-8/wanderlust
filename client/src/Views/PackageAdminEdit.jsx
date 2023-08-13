import React from "react";
import NavBar from "../Components/NavBar";
import SideBarAdmin from "../Components/SideBarAdmin";
import DetailAdmin from "../Components/DetailEditionAdmin"

// ...

export default function PackageEdit() {

  return (
    <>
    <div className="bg-red-600">
        <NavBar className="mt-10"/>
      </div>
      <div className=" grid grid-cols-2 max-h-screen overflow-auto justify-center mb-10">
        <div className="flex  overflow-auto">
        <SideBarAdmin className="col-span-1" />
        </div>
        <div >
        <DetailAdmin className="col-span-1" />
        </div>
      </div>
      </>
   
  )
}
