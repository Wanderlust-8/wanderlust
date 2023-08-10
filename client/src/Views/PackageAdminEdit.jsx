import React from "react";
import NavBar from "../Components/NavBar";
import SideBarAdmin from "../Components/SideBarAdmin";
import { useParams } from "react-router-dom";
// ...

export default function PackageEdit() {
  const { id } = useParams(); // Recuperar el ID del paquete de la ruta
  // ...

  // Usa el ID para obtener los detalles del paquete y mostrarlos en el formulario de edición

  return (
    <>
    <div className="relative bg-verdeFooter">
        <NavBar />
      </div>
      <div className="flex max-h-screen overflow-auto">
        <SideBarAdmin />
        
        
      </div></>
    // ...
    // Formulario de edición/modificación del paquete
    // ...
  )
}
