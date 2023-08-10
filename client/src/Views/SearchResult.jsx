import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../Components/SearchBar";
import Card from "../Components/CardPackageSearch";
import NavBar from "../Components/NavBar";
import { FaSync } from "react-icons/fa";
import {
  fetchPackages,
  SearchPackagesByCountry,
  FilterPackagesByCity,
  setDurationFilter,
  setPriceFilter,
  clearSearchView,
  setPriceRangeFilter,
  setClearPriceRangeFilter,
  FilterPackagesByOriginCity,
  fetchOriginCities,
  reset,
} from "../Redux/Packages/packagesActions";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fetchCities } from "../Redux/Cities/citiesActions";
import { fetchCountries } from "../Redux/Country/countriesActions";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const RESULTS_PER_PAGE = 3;

function normalizeString(str) {
  return str
    .normalize("NFD") // Normalizar la cadena para separar los caracteres diacríticos
    .replace(/[\u0300-\u036f]/g, "") // Eliminar los caracteres diacríticos
    .toLowerCase(); // Convertir a minúsculas
}

export default function SearchResult() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  const searchResults = useSelector((state) => state.packages.packagesSearch); // Renombrado packagesSearch a searchResults
  const packagesList = useSelector((state) => state.packages.packagesList);
  const cities = useSelector((state) => state.cities.citiesList);
  const searchQuery = new URLSearchParams(location.search).get("Country");
  // const filters = useSelector((state) => state.packages.filters);
  const countries = useSelector((state) => state.countries.countriesList);
  const [searchedCountry, setSearchedCountry] = useState(
    searchQuery ? normalizeString(searchQuery) : ""
  );

  const originCities = useSelector((state) => state.packages.originCitiesList);
  console.log("searchResults", searchResults);

  useEffect(() => {
    setSearchedCountry(searchQuery ? normalizeString(searchQuery) : "");
  }, [searchQuery]);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchPackages());
      if (searchQuery) {
        dispatch(SearchPackagesByCountry(searchQuery));
      }
    };
    loadData();

    return () => {
      dispatch(clearSearchView(true)); // Aquí despachamos la acción con "true" al desmontar
    };
  }, [dispatch, searchQuery]);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchOriginCities());
  }, [dispatch]);

  const filteredCities = searchedCountry
    ? cities.filter((city) => {
        const country = countries.find(
          (country) => normalizeString(country.name) === searchedCountry
        );
        return country && city.idCountry === country.id;
      })
    : cities;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCities());
  }, [dispatch]);

  function handleFilterByCity(e) {
    dispatch(FilterPackagesByCity(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterByOriginCity(e) {
    dispatch(FilterPackagesByOriginCity(e.target.value));
    setCurrentPage(1);
  }

  const handleDurationFilterChange = (e) => {
    dispatch(setDurationFilter(e.target.value));
  };

  const handlePriceFilterChange = (e) => {
    const selectedValue = e.target.value;
    dispatch(setPriceFilter(selectedValue));
  };

  const minPrice = 0.0;
  const maxPrice = 10000.0;
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const handlePriceRangeFilter = (selectedPriceRange) => {
    setPriceRange(selectedPriceRange);

    if (
      selectedPriceRange[0] === minPrice &&
      selectedPriceRange[1] === maxPrice
    ) {
      dispatch(setClearPriceRangeFilter()); // Despachar la acción para eliminar el filtro
    } else {
      dispatch(setPriceRangeFilter(selectedPriceRange)); // Despachar la acción con el nuevo valor del rango de precios
    }
  };

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

  useEffect(() => {
    dispatch(FilterPackagesByCity("Todos"));
    dispatch(setDurationFilter("Todos"));
    dispatch(setPriceFilter("precios"));
    dispatch(setClearPriceRangeFilter());
    dispatch(FilterPackagesByOriginCity("Todos"));
  }, [dispatch]);

  function handleReset() {
    dispatch(reset());
    dispatch(setClearPriceRangeFilter());
    setPriceRange([minPrice, maxPrice]);
  }

  return (
    <div>
      <div className="bg-verdeFooter">
        <NavBar />
      </div>
      <div className="my-10 flex justify-center">
        <SearchBar />
      </div>
      <div className="grid grid-cols-4 gap-6 px-10">
        <div className="col-span-1 bg-verdeFooter p-4 rounded-lg shadow-lg space-y-4">
          <button
            onClick={handleReset}
            className="bg-green-400 hover:bg-green-500 rounded w-full p-2 flex items-center justify-center text-white font-bold transition duration-200"
          >
            <FaSync className="mr-2" />
            Reiniciar Filtros
          </button>

          {/* Ciudad de destino */}
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
            <h2 className="font-semibold mb-2 text-sm">Ciudad de destino:</h2>
            <select
              className="w-full rounded p-2 border border-gray-200 appearance-none"
              onChange={handleFilterByCity}
            >
              <option value="">Todos</option>
              {filteredCities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ciudad de salida */}
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
            <h2 className="font-semibold mb-2 text-sm">Ciudad de salida:</h2>
            <select
              className="w-full rounded p-2 border border-gray-200 appearance-none"
              onChange={handleFilterByOriginCity}
            >
              <option value="">Todos</option>
              {originCities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Presupuesto */}
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
            <h2 className="font-semibold text-sm">Presupuesto:</h2>
            <Slider
              range
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={handlePriceRangeFilter}
              className="w-full"
            />
            <div className="text-sm">Precio mínimo USD: ${priceRange[0]}</div>
            <div className="text-sm">Precio máximo USD: ${priceRange[1]}</div>
          </div>

          {/* Duración */}
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
            <h2 className="font-semibold text-sm">Duración:</h2>
            <select
              className="w-full rounded p-2 border border-gray-200 appearance-none"
              onChange={handleDurationFilterChange}
            >
              <option value="Todos">---</option>
              <option value="Menor-Mayor">Mayor-Menor</option>
              <option value="Mayor-Menor">Menor-Mayor</option>
            </select>
          </div>

          {/* Precio */}
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
            <h2 className="font-semibold text-sm">Precio:</h2>
            <select
              className="w-full rounded p-2 border border-gray-200 appearance-none"
              onChange={handlePriceFilterChange}
            >
              <option value="precios">---</option>
              <option value="MenorPrecio">Mayor</option>
              <option value="MayorPrecio">Menor</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col col-span-3 space-y-12">
          {currentResults.map((tour) => (
            <Card key={tour.id} {...tour} />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-16 space-x-4 mb-10">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="bg-green-400 hover:bg-green-500 rounded p-2 transition duration-200"
        >
          <FiChevronLeft className="text-white" />
        </button>

        <p className="font-semibold text-sm">
          Página {currentPage} de {totalPages}
        </p>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-green-400 hover:bg-green-500 rounded p-2 transition duration-200"
        >
          <FiChevronRight className="text-white" />
        </button>
      </div>
      <Footer />
    </div>
  );
}
