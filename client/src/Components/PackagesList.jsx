import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { searchPackagesAdmin } from "../Redux/Packages/packagesActions";
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
  const [searchTerm, setSearchTerm] = useState("");

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
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reiniciar la página actual al cambiar el término de búsqueda
    dispatch(searchPackagesAdmin(event.target.value));
  };

  const filteredResults = searchResults.filter((tour) =>
    tour.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar los resultados según la página actual
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const currentResults =
    filteredResults.length > 0
      ? searchResults.slice(startIndex, endIndex)
      : packagesList.slice(startIndex, endIndex);

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="w-full ml-20 flex-grow bg-gray-200 items-center mt-10 justify-center">
        <div className="flex flex-row">
        <input
          type="text"
          placeholder="Buscar paquete..."
          className=" w-3/4 focus:outline-none rounded-xl h-[50px] border-gray-300 bg-white  p-2 m-2 text-sm   text-gray-700 fontPoppins ml-20"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <button className=" focus:outline-none rounded p-2 m-2">
            <FaSearch style={{ fontSize: "20px", color: "red" }} />
          </button>
        </div>
        </div>
      </div>

      <div className="m-10">
        <div className=" justify-center">
          <div>
          <table className="min-w-full divide-y divide-gray-200 ml-10">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-1 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                  id
                </th>
                <th className="px-1 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Nombre del Paquete
                </th>
                <th className="px-1 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-1 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Ciudad de Origen
                </th>
                <th className="px-1 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
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
                  <td className="px-3 py-2 whitespace-nowrap mr-10">
                    {tour.CityOrigin && tour.CityOrigin.name}
                  </td>
                  <td>
                    <Link
                      to={`/admin/packages/${tour.id}`}
                      className=" bg-red-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <div className="pt-0">
            {/* Número de la página actual */}
            <div className="flex justify-center items-center font-bold mt-4">
              {/* Botones de paginación */}
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className=" bg-red-600 rounded p-2 m-2 hover:bg-gray-500"
              >
                <FiChevronLeft style={{ fontSize: "20px", color: "white" }} />
              </button>

              <p className="mr-4 fontPoppins text-sm">
                Pagina {currentPage} de {totalPages}
              </p>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className=" bg-red-600 rounded p-2 m-2 fontPoppins hover:bg-gray-500"
              >
                <FiChevronRight style={{ fontSize: "20px", color: "white" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
