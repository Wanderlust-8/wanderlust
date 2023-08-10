import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchPackages,
  clearSearchView,
} from "../Redux/Packages/packagesActions";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "rc-slider/assets/index.css";

const RESULTS_PER_PAGE = 7;

export default function PackagesList() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const searchResults = useSelector((state) => state.packages.packagesSearch);
  const packagesList = useSelector((state) => state.packages.packagesList);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchPackages());
    };
    loadData();

    return () => {
      dispatch(clearSearchView(true));
    };
  }, [dispatch]);

  // Calcular la cantidad total de páginas disponibles
  const totalPages = Math.ceil(
    searchResults.length > 0
      ? searchResults.length / RESULTS_PER_PAGE
      : packagesList.length / RESULTS_PER_PAGE
  );

  // Función para manejar el botón "next"
  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Función para manejar el botón "previous"
  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Filtrar los resultados según la página actual
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const currentResults =
    searchResults.length > 0
      ? searchResults.slice(startIndex, endIndex)
      : packagesList.slice(startIndex, endIndex);

  return (
    <div className="pt-0">
      {/* Número de la página actual */}
      <div className="flex justify-center items-center font-bold mt-4">
        {/* Botones de paginación */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="bg-green-400 rounded p-2 m-2"
        >
          <FiChevronLeft style={{ fontSize: "20px", color: "white" }} />
        </button>

        <p className="mr-4 fontPoppins text-sm">
          Pagina {currentPage} de {totalPages}
        </p>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-green-400 rounded p-2 m-2 fontPoppins"
        >
          <FiChevronRight style={{ fontSize: "20px", color: "white" }} />
        </button>
      </div>

      <div className="m-10">
        <div className="border rounded">
          <table className="min-w-full divide-y divide-gray-200" >
            <thead className="bg-gray-50">
              <tr>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  id
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre del Paquete
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ciudad de Origen
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accion
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentResults.map((tour) => (
                <tr key={tour.id}>
                  <td className="px-3 py-4 whitespace-nowrap">{tour.id}</td>
                  <td className="px-3 py-4 whitespace-nowrap ">{tour.title}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span style={{ color: tour.active ? "green" : "red" }}>
                      {tour.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {tour.CityOrigin && tour.CityOrigin.name}
                  </td>
                  <td>
                    <Link to={`/admin/packages/${tour.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >Editar</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}