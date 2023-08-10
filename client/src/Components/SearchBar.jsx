import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchPackagesByCountry } from "../Redux/Packages/packagesActions";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSearch = () => {
    if (country.trim() !== "") {
      // Si se ingresa un país en el campo de búsqueda, realizamos la búsqueda y navegamos a SearchResult
      dispatch(SearchPackagesByCountry(country));
      setCountry("");
      const isSearchResult = location.pathname === "/search";
      if (isSearchResult) {
        // Si la búsqueda se realiza desde SearchResult, simplemente actualizamos la página
        navigate(`/search?Country=${country}`, { replace: true });
      } else {
        // Si la búsqueda se realiza desde Home, redirigimos a SearchResult
        navigate(`/search?Country=${country}`);
      }
    } else {
      // Si no se ingresa un país, navegamos directamente a SearchResult para mostrar todos los paquetes
      navigate("/search");
    }
  };

  return (
    <div className="flex bg-white w-[400px] h-[50px] rounded justify-between items-center">
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Busca tu próximo destino..."
          className="focus:outline-none border-none bg-white rounded p-2 m-2 text-sm w-full  text-gray-700 fontPoppins"
          value={country}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button
          className=" focus:outline-none bg-green-400 rounded p-2 m-2"
          onClick={handleSearch}
        >
          <FaSearch style={{ fontSize: "20px", color: "white" }} />
        </button>
      </div>
    </div>
  );
}
