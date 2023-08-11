import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import {
  getPackageById,
  clearPackageDetails,
} from "../Redux/Packages/packagesActions";
import { AiOutlineSave } from "react-icons/ai";
import { fetchAirlines } from "../Redux/Airlines/airlinesActions";
import { fetchHotels } from "../Redux/Hotels/hotelsActions";
import FlightsAdmin from "../Components/FlightsAdminEdit";
// import Activities from "../Components/Activities";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import axios from "axios";
import { fetchContinents } from "../Redux/Continent/continentActions";
import { fetchCountries } from "../Redux/Country/countriesActions";
import { fetchCities } from "../Redux/Cities/citiesActions";
import { put_package } from "../Redux/Packages/packagesActions";

function DetailAdmin() {
  const { id } = useParams();

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const tour = useSelector((state) => state.packages.packageDetails);
  const hotels = useSelector((state) => state.hotels.hotelsList);
  const continents = useSelector((state) => state.continents.continentsList);
  const countries = useSelector((state) => state.countries.countriesList);
  const cities = useSelector((state) => state.cities.citiesList);

  const tipoPaquete =
    tour.TypePackage && tour.TypePackage.name
      ? tour.TypePackage.name
      : "Desconocido";
  // console.log(tipoPaquete)

  useEffect(() => {
    dispatch(getPackageById(id));
    dispatch(fetchContinents());
    dispatch(fetchCountries());
    dispatch(fetchCities());
    dispatch(fetchAirlines());
    dispatch(fetchHotels());

    return () => {
      dispatch(clearPackageDetails());
    };
  }, [id, dispatch]);

  const [isEditing, setIsEditing] = useState(false);

  const [inputEdit, setInputEdit] = useState({
    idTypePackage: tour.idTypePackage,
    title: tour.title,
    image: tour.image,
    description: tour.description,
    standarPrice: tour.standarPrice,
    promotionPrice: tour.promotionPrice,
    service: tour.service,
    totalLimit: tour.totalLimit,
    duration: tour.duration,
    qualification: tour.qualification,
    idAirline: tour.idAirline,
    initialDate: tour.initialDate,
    finalDate: tour.finalDate,
    outboundFlight: tour.outboundFlight,
    returnFlight: tour.returnFlight,
    idHotel: tour.idHotel,
    activitys: [],
    idContinent: tour.idContinent,
    idCountry: tour.idCountry,
    originCity: tour.originCity,
    idCity: tour.idCity,
  });

  useEffect(() => {
    // Actualiza inputEdit cuando cambian los detalles del paquete
    setInputEdit({
      idTypePackage: tour.idTypePackage,
      title: tour.title,
      image: tour.image,
      description: tour.description,
      standarPrice: tour.standarPrice,
      promotionPrice: tour.promotionPrice,
      service: tour.service,
      totalLimit: tour.totalLimit,
      duration: tour.duration,
      qualification: tour.qualification,
      idAirline: tour.idAirline,
      initialDate: tour.initialDate,
      finalDate: tour.finalDate,
      outboundFlight: tour.outboundFlight,
      returnFlight: tour.returnFlight,
      idHotel: tour.idHotel,
      activitys: [],
      idContinent: tour.idContinent,
      idCountry: tour.idCountry,
      originCity: tour.originCity,
      idCity: tour.idCity,
    });
  }, [tour]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (
      name === "idAirline" ||
      name === "promotionPrice" ||
      name === "qualification" ||
      name === "standarPrice" ||
      name === "totalLimit"
    ) {
      setInputEdit((prevInput) => ({ ...prevInput, [name]: parseInt(value) }));
    } else {
      setInputEdit((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const cloudName = "dro5aw3iy";
      const uploadPreset = "images";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        )
        .then((response) => {
          const imageUrl = response.data.secure_url;
          setInputEdit((prevInput) => ({
            ...prevInput,
            image: imageUrl,
          }));
        })
        .catch((error) => {
          console.error("Error uploading image to Cloudinary:", error);
        });
    }
  };
  const calculatePromotionPrice = () => {
    const standatPrice = parseFloat(inputEdit.standarPrice);
    const discountpercentage = 15;
    const promotionPrice = standatPrice * (1 - discountpercentage / 100);
    return promotionPrice.toFixed(2);
  };

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const handleContinentChange = (event) => {
    const selectedContinentId = parseInt(event.target.value);
    const filteredCountries = countries.filter(
      (country) => country.idContinent === selectedContinentId
    );
    setFilteredCountries(filteredCountries);
    setInputEdit((prevInput) => ({
      ...prevInput,
      idContinent: selectedContinentId,
      idCountry: "", // Reinicia el país seleccionado cuando cambia el continente
      idCity: "", // Reinicia la ciudad seleccionada cuando cambia el continente
    }));
  };

  const handleCountryChange = (event) => {
    const selectedCountryId = parseInt(event.target.value);
    const filteredCities = cities.filter(
      (city) => city.idCountry === selectedCountryId
    );
    setFilteredCities(filteredCities);
    setInputEdit((prevInput) => ({
      ...prevInput,
      idCountry: selectedCountryId,
      idCity: "", // Reiniciar la ciudad seleccionada cuando cambie el país})
    }));
  };

  const [filteredHotels, setFilteredHotels] = useState([]);

  const handleCityChange = (event) => {
    const selectedCityId = parseInt(event.target.value);
    const filteredHotels = hotels.filter(
      (hotel) => hotel.idCity === selectedCityId
    );
    setFilteredHotels(filteredHotels);
    setInputEdit((prevInput) => ({
      ...prevInput,
      idCity: selectedCityId,
      idHotel: "", // Reiniciar la ciudad seleccionada cuando cambie el país
    }));
  };

  const selectedHotel = hotels.find((hotel) => hotel.id === tour.idHotel);

  const [isSaved, setIsSaved] = useState(false);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    console.log("paquete actualizado:", inputEdit);
    try {
      await dispatch(put_package(id, inputEdit));
      setIsEditing(false);
      setIsSaved(true);
      alert("Package actualizado exitosamente!");
      dispatch(getPackageById(id));

     
      setActiveTabIndex(0);
    } catch (error) {
      console.error("Error de actualizacion de paquete:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="flex justify-center mb-5 mt-5 w-full rounded-xl shadow-xl mr-10">
          <Tabs
            className="fontPoppins mt-10 "
            selectedIndex={activeTabIndex}
            onSelect={(index) => setActiveTabIndex(index)}
          >
            <TabList className="font-bold text-lg justify-center rounded-xl  bg-red-600 text-white ">
              <Tab>Datos Generales</Tab>
              <Tab>Datos de Vuelo, alojamiento y servicios</Tab>
              {/* <Tab>Actividades</Tab> */}
            </TabList>

            <TabPanel className="fontPoppins col-span-3">
              {isEditing ? (
                <div>
                  <button
                    className="bg-red-600 w-12 hover:bg-gray-500 rounded item-center p-2 m-2 mt-2 px-3 py-2 text-white focus:outline-none ml-14 fontPoppins "
                    onClick={() => setIsEditing(false)}
                  >
                    <AiOutlineCloseSquare size={22} color="white" />
                  </button>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  {inputEdit.image && (
                    <img src={inputEdit.image} alt="Nueva imagen" />
                  )}

                  <label
                    htmlFor="totalLimit"
                    className="block mb-2 text-sm font-bold text-gray-600"
                  >
                    Nombre del paquete:
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleInputChange}
                    value={inputEdit.title}
                  />
                </div>
              ) : (
                <div>
                  <button onClick={() => setIsEditing(true)}>
                    <AiOutlineEdit />
                    Editar
                  </button>
                  <div className="w-3/4 h-80 relative">
                    {!tour.image ? (
                      <h2 className="text-2xl fontPoppin font-bold  bg-red-600inline-flex mt-20">
                        Cargando...
                      </h2>
                    ) : (
                      <img
                        src={tour.image}
                        className="w-full h-full object-cover"
                        alt="tour"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <h1 className="text-4xl text-white font-bold">
                        {tour.title}
                      </h1>
                    </div>
                  </div>
                </div>
              )}

              <div>
                {isEditing ? (
                  <div>
                    <label
                      htmlFor="totalLimit"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Descripción:
                    </label>
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Description"
                      maxLength="250"
                      value={inputEdit.description}
                      onChange={handleInputChange}
                      className="w-3/4 h-3/4 px-3 py-2  placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <label
                      htmlFor="totalLimit"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Cupos disponibles:
                    </label>

                    <input
                      type="number"
                      name="totalLimit"
                      id="totalLimit"
                      min="0"
                      value={inputEdit.totalLimit}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2  placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <label
                      htmlFor="standarPrice"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Precio:
                    </label>
                    <input
                      type="number"
                      name="standarPrice"
                      min="0"
                      id="standarPrice"
                      value={inputEdit.standarPrice}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <label
                      htmlFor="promotionPrice"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      precio de promoción:
                    </label>
                    <input
                      type="number"
                      name="promotionPrice"
                      id="promotionPrice"
                      value={calculatePromotionPrice()}
                      readOnly
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm  text-gray-600"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="fontPoppins mt-6">
                      <p className="text-lg text-left"> Descripción: </p>
                      <p className="text-sm text-left">{tour.description}</p>
                    </div>
                    <h2 className="text-lg font-semibold mt-6 ">
                      {" "}
                      Precio: USD {tour.standarPrice} -{tipoPaquete}
                    </h2>
                    <div className="fontPoppins mt-6">
                      <p className="text-lg text-left">
                        {" "}
                        Precio de promoción: {tour.promotionPrice} USD
                      </p>
                      <h2 className="text-xs">Incluye {tour.service}</h2>
                      <div className="fontPoppins mt-6">
                        <p className="text-lg text-left">
                          {" "}
                          Cupos disponibles: {tour.totalLimit}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabPanel>

            <TabPanel className="fontPoppins">
              <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 fontPoppins mt-6">
                <FlightsAdmin
                  tour={tour}
                  isEditing={isEditing}
                  inputEdit={inputEdit}
                  handleInputChange={handleInputChange}
                  setIsEditing={setIsEditing}
                />
              </div>

              <div className="mt-8">
                {isEditing ? (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                      Hotel
                    </h2>
                    <label
                      htmlFor="idContinent"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Continente:
                    </label>
                    <select
                      name="idContinent"
                      id="idContinent"
                      value={inputEdit.idContinent}
                      onChange={(event) => {
                        handleInputChange(event);
                        handleContinentChange(event);
                      }}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    >
                      <option value="">Seleccione un Continente </option>
                      {continents.map((continent) => (
                        <option key={continent.id} value={continent.id}>
                          {continent.name}
                        </option>
                      ))}
                    </select>

                    <label
                      htmlFor="idCountry"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      País de destino:
                    </label>

                    <select
                      name="idCountry"
                      id="idCountry"
                      value={inputEdit.idCountry}
                      onChange={(event) => {
                        handleInputChange(event);
                        handleCountryChange(event);
                      }}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    >
                      <option value="">Seleccione un País</option>
                      {filteredCountries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>

                    <label
                      htmlFor="idCity"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Ciudad de destino:
                    </label>
                    <select
                      name="idCity"
                      id="idCity"
                      value={inputEdit.idCity}
                      onChange={(event) => {
                        handleInputChange(event);
                        handleCityChange(event);
                      }}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    >
                      <option value="">Seleccione una ciudad</option>
                      {filteredCities &&
                        filteredCities.map((city) => {
                          console.log("Mapping city:", city); // Agrega el console.log aquí
                          return (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          );
                        })}
                    </select>
                    <label
                      htmlFor="idHotel"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Hotel:
                    </label>
                    <select
                      name="idHotel"
                      id="idHotel"
                      value={inputEdit.idHotel}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    >
                      <option value="">Seleccione un Hotel</option>
                      {filteredHotels.map((hotel) => {
                        console.log("Mapping hotel:", hotel);
                        return (
                          <option key={hotel.id} value={hotel.id}>
                            {hotel.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : (
                  <div className="mt-12 text-left fontPoppins">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                      Hotel
                    </h2>
                    {selectedHotel && (
                      <h1 className="text-2xl font-bold">
                        {selectedHotel.name}
                      </h1>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="bg-red-600 hover:bg-gray-500 rounded flex flex-row justify-between item-center p-2 m-2 mt-3 px-3 py-2 text-white focus:outline-none ml-14 fontPoppins "
                onClick={handleSaveChanges}
                disabled={isSaved}
              >
                <AiOutlineSave size={22} color="white" />{" "}
                {isSaved ? "Guardado" : "Guardar"}
              </button>
<div>
              <Link
                      to={`/admin/activitiesEdit/${tour.id}`}
                      className=" w-2/5 bg-red-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                       <AiOutlineEdit />
                    Ver actividades
                    </Link>
                    </div>
                   
                

            </TabPanel>

          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default DetailAdmin;
