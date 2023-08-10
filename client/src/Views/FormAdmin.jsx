/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPackages } from "../Redux/Packages/packagesActions";
import { fetchAirlines } from "../Redux/Airlines/airlinesActions";
import { fetchCities } from "../Redux/Cities/citiesActions";
import { fetchContinents } from "../Redux/Continent/continentActions";
import { fetchCountries } from "../Redux/Country/countriesActions";
import { fetchHotels } from "../Redux/Hotels/hotelsActions";
import { fetchPackages } from "../Redux/Packages/packagesActions";
import { getCityOrigin } from "../Redux/Cities/citiesActions";
import { AiOutlinePlusSquare } from "react-icons/ai";
import FormNewCityOrigin from "../Components/FormNewCityOrigin";
import FormNewCityDestiny from "../Components/FormNewCityDestiny";
import FormNewAirline from "../Components/FormNewAirline";
import FormNewHoltel from "../Components/FormNewHotel";
import FormActivity from "../Components/FormActivitys";
import NavBar from "../Components/NavBar";
import SidebarAdmin from "../Components/SideBarAdmin";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import { validationCreateForm } from "./ValidationAdminForm";

const Form = () => {
  const continents = useSelector((state) => state.continents.continentsList);
  // console.log("Continents:", continents)
  const countries = useSelector((state) => state.countries.countriesList);
  const cities = useSelector((state) => state.cities.citiesList);
  // console.log("cities:", cities)
  const hotels = useSelector((state) => state.hotels.hotelsList);
  const airlines = useSelector((state) => state.airlines.airlinesList);
  // const activitys = useSelector((state) => state.activitys.activitysList);
  const cityOrigin = useSelector((state) => state.cities.citiesOrigin);
  // console.log("cityorigin:", cityOrigin)

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    initialDate: "",
    finalDate: "",
    totalLimit: "",
    standarPrice: "",
    promotionPrice: "",
    service: "",
    duration: "",
    originCity: "", //salida
    idAirline: "",
    outboundFlight: "",
    returnFlight: "",
    image: "",
    qualification: "",
    idContinent: "",
    idCountry: "",
    idCity: "", // destino
    idHotel: "",
    activitys: [],
  });

  useEffect(() => {
    dispatch(fetchAirlines());
    dispatch(fetchCities());
    dispatch(fetchContinents());
    dispatch(fetchCountries());
    dispatch(fetchHotels());
    dispatch(getCityOrigin());
  }, [dispatch]);

  const [input, setInput] = useState({
    idTypePackage: 1,
    title: "",
    description: "",
    initialDate: "",
    finalDate: "",
    totalLimit: 0,
    standarPrice: 0,
    promotionPrice: 0,
    service: "",
    duration: 0,
    originCity: 0, //salida
    idAirline: 0,
    outboundFlight: "",
    returnFlight: "",
    image: "",
    qualification: 0,
    idContinent: 0,
    idCountry: 0,
    idCity: 0, // destino
    idHotel: 0,
    activitys: [],
  });

  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleContinentChange = (event) => {
    const selectedContinentId = parseInt(event.target.value);
    const filteredCountries = countries.filter(
      (country) => country.idContinent === selectedContinentId
    );
    setFilteredCountries(filteredCountries);
    setInput({
      ...input,
      idContinent: selectedContinentId,
      idCountry: "", // Reinicia el país seleccionado cuando cambia el continente
      idCity: "", // Reinicia la ciudad seleccionada cuando cambia el continente
    });

    setErrors(
      validationCreateForm({
        ...input,
        idContinent: selectedContinentId,
      })
    );
  };

  const [filteredCities, setFilteredCities] = useState([]);

  const handleCountryChange = (event) => {
    const selectedCountryId = parseInt(event.target.value);
    const filteredCities = cities.filter(
      (city) => city.idCountry === selectedCountryId
    );
    setFilteredCities(filteredCities);
    setInput({
      ...input,
      idCountry: selectedCountryId,
      idCity: "", // Reiniciar la ciudad seleccionada cuando cambie el país
    });
    setErrors(
      validationCreateForm({
        ...input,
        idCountry: selectedCountryId,
      })
    );
  };

  const [filteredHotels, setFilteredHotels] = useState([]);

  const handleCityChange = (event) => {
    const selectedCityId = parseInt(event.target.value);
    const filteredHotels = hotels.filter(
      (hotel) => hotel.idCity === selectedCityId
    );
    setFilteredHotels(filteredHotels);
    setInput({
      ...input,
      idCity: selectedCityId,
      idHotel: "", // Reiniciar la ciudad seleccionada cuando cambie el país
    });
    setErrors(
      validationCreateForm({
        ...input,
        idCity: selectedCityId,
      })
    );
  };

  const handleInputPromotionPrice = (event) => {
    const { value } = event.target;
    const promotionPrice = calculatePromotionPrice(parseFloat(value));
    setInput({
      ...input,
      promotionPrice: promotionPrice,
    });
  };

  const handleInputChange = (event) => {

    const { name, value } = event.target;
    let parsedValue;
  

    if (name === "idCity") {
      const selectedCityId = parseInt(value);
      const selectedCity = cities.find((city) => city.id === selectedCityId);

      if (selectedCity) {
        setDestinationCity(selectedCity.name);

        const associatedCountry = countries.find(
          (country) => country.id === selectedCity.idCountry
        );

        if (associatedCountry) {
          setDestinationCountry(associatedCountry.name);
          parsedValue = {
            ...input,
            idCity: selectedCityId,
            idCountry: associatedCountry.id,
          };
        }
      }
    } else if (
      name === "qualification" ||
      name === "originCity" ||
      name === "idHotel" ||
      name === "idAirline" ||
      name === "standarPrice"||
      name === "duration" ||
      name === "totalLimit" 
    ) {
      parsedValue = {
        ...input,

        [name]: !isNaN(value) ? parseFloat(value) : value,
      };
    } else if (
      name === "title" ||
      name === "outboundFlight" ||
      name === "returnFlight" ||
      name === "description" ||
      name === "initialDate" ||
      name === "finalDate" ||
      name === "service"
    ) {
      parsedValue = {

        ...input,
        [name]: value,
      };
    }
  
     
    // Establecer los errores en el estado de errores
    const newErrors = validationCreateForm({
      ...input,
      [name]: parsedValue,
    });
    setErrors(newErrors)
    // Actualizar el estado de input después de completar el análisis
    setInput(parsedValue);
  };
  
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting package:", input);

    // const formErrors = validationCreateForm(input);
    // setErrors(formErrors);

    // Verificar si existen errores
    // if (Object.keys(formErrors).length === 0)
    {
      try {
        dispatch(addPackages(input));
        setInput({
          idTypePackage: 1,
          title: "",
          description: "",
          initialDate: "",
          finalDate: "",
          totalLimit: 0,
          standarPrice: 0,
          promotionPrice: 0,
          service: "",
          duration: 0,
          originCity: 0, //salida
          idAirline: 0,
          outboundFlight: "",
          returnFlight: "",
          image: "",
          qualification: 0,
          idContinent: 0,
          idCountry: 0,
          idCity: 0, // destino
          idHotel: 0,
          activitys: [],
        });
        alert("Paquete creado exitosamente");
        dispatch(fetchPackages());
        setFormSubmitted(true);
        setShowActivityForm(true);
      } catch (error) {
        console.error(error);
        alert("Ocurrio un error en la creación");
      }

    }
  };

  const calculatePromotionPrice = () => {
    const standatPrice = parseFloat(input.standarPrice);
    const discountpercentage = 15;
    const promotionPrice = standatPrice * (1 - discountpercentage / 100);
    return promotionPrice.toFixed(2);
  };

  // Estado para controlar la visibilidad del formulario de nueva ciudad de origen
  const [showNewCityForm, setShowNewCityForm] = useState(false);

  // Función para mostrar el formulario de nueva ciudad de origen
  const handleShowNewCityOriginForm = (e) => {
    e.preventDefault();
    setShowNewCityForm(true);
  };

  const handleHideNewCityOriginForm = () => {
    setShowNewCityForm(false);
  };

  // Estado para controlar la visibilidad del formulario de nueva ciudad de destino
  const [showNewCityDestinyForm, setShowNewCityDestinyForm] = useState(false);

  const [destinationCity, setDestinationCity] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");

  // Función para mostrar el formulario de nueva ciudad de origen
  const handleShowNewCityDestinyOriginForm = (e) => {
    e.preventDefault();
    setShowNewCityDestinyForm(true);
  };

  const handleHideNewCityDestinyForm = () => {
    setShowNewCityDestinyForm(false);
  };

  // Estado para controlar la visibilidad del formulario de nueva aerolinea
  const [showNewAirlineForm, setShowNewAirlineForm] = useState(false);

  // Función para mostrar el formulario de nueva Aerolinea
  const handleShowNewAirlineForm = (e) => {
    e.preventDefault();
    setShowNewAirlineForm(true);
  };

  const handleHideNewAirlineForm = () => {
    setShowNewAirlineForm(false);
  };

  // Estado para controlar la visibilidad del formulario de nuevo hotel
  const [showNewHotelForm, setShowNewHotelForm] = useState(false);

  // Función para mostrar el formulario de nuevo hotel
  const handleShowNewHotelForm = (e) => {
    e.preventDefault();
    setShowNewHotelForm(true);
  };

  const handleHideNewHotelForm = () => {
    setShowNewHotelForm(false);
  };

  // Estado para controlar la visibilidad del formulario de nueva actividad
  const [showActivityForm, setShowActivityForm] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleHideActivityForm = () => {
    setShowActivityForm(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Subir la imagen a Cloudinary y obtener la URL
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
          setInput({
            ...input,
            image: imageUrl,
          });
          const newErrors = validationCreateForm({
            ...input,
            image: imageUrl,
          });

          // Establecer los errores en el estado de errores
          setErrors(newErrors);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  return (
    <div>
      <div className="relative bg-red-600 ">
        <NavBar />
      </div>
      <div className="grid grid-cols-4  max-h-screen overflow-auto justify-center mb-10  ">
        <SidebarAdmin className="col-span-1" />
        <div className="flex justify-center col-span-3 mb-5 mt-5 w-full rounded-xl shadow-xl mr-10">
          <Tabs className="fontPoppins">
            <TabList className="font-bold text-lg justify-center rounded-xl bg-verdeFooter  text-white">
              <Tab>Datos Generales</Tab>
              <Tab>Ubicación</Tab>
              <Tab>Datos de Vuelo</Tab>
              <Tab>Alojamiento y Servicios</Tab>
            </TabList>

            <TabPanel className="fontPoppins">
              <div className="mt-10 ml-5 w-full">
                <h2 className="text-gray-700 text-lg font-bold">
                  ¡Creador de viajes!
                </h2>

                <div className="mt-10 grid grid-cols-2 gap-4 mr-5">
                  <div className="mb-5">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Nombre del viaje:
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Nombre..."
                      value={input.title}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.title}
                      </p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-600"
                      htmlFor="image"
                    >
                      Subir imagen:
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm  text-gray-600"
                    />
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.image}
                      </p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="description"
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
                      value={input.description}
                      onChange={handleInputChange}
                      className="w-3/4 h-3/4 px-3 py-2  placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.description}
                      </p>
                    </div>
                  </div>

                  {input.image && (
                    <img
                      src={input.image}
                      alt="Uploaded"
                      style={{ maxWidth: "100%" }}
                    />
                  )}

                  <div className="mb-5">
                    <label
                      htmlFor="initialDate"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Fecha de ida:
                    </label>
                    <input
                      type="date"
                      name="initialDate"
                      id="initialDate"
                      placeholder="Fecha de inicio ..."
                      value={input.initialDate}
                      onChange={handleInputChange}
                      className="w-3/4  px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.initialDate}
                      </p>
                    </div>
                  </div>

                  <div className="mb-5">
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
                      placeholder="Cupos ..."
                      min="0"
                      value={input.totalLimit}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2  placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.totalLimit}
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="finalDate"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Fecha de regreso:
                    </label>
                    <input
                      type="date"
                      name="finalDate"
                      id="finalDate"
                      placeholder="Fecha final..."
                      value={input.finalDate}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.finalDate}
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="duration"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Duración:
                    </label>
                    <input
                      type="number"
                      name="duration"
                      min="0"
                      id="duration"
                      placeholder="Cuantos dias..."
                      value={input.duration}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.duration}
                      </p>
                    </div>
                  </div>

                  <div className="mb-5">
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
                      placeholder="Standar Price"
                      value={input.standarPrice}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.standarPrice}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="qualification"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Calificacion del paquete
                    </label>
                    <input
                      type="number"
                      name="qualification"
                      id="qualification"
                      min="0"
                      step="0.5"
                      max="10"
                      placeholder="Vuelo de regreso..."
                      value={input.qualification}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.qualification}
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
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
                      placeholder="Promotion Price"
                      value={calculatePromotionPrice()}
                      readOnly
                      onChange={handleInputPromotionPrice}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm  text-gray-600"
                    />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel className="fontPoppins">
              <div className="mt-10 ml-5 w-full">
                <div className="mt-10 grid grid-cols-2 gap-4 mr-5 justify-start">
                  <div className="mb-5">
                    <label
                      htmlFor="originCity"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Ciudad de partida:
                    </label>
                    <select
                      name="originCity"
                      id="originCity"
                      value={input.originCity}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    >
                      <option value="">Seleccione una ciudad </option>
                      {cityOrigin.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.originCity}
                      </p>
                    </div>
                    <div>

                      <button
                        className="bg-green-400 hover:bg-gray-500 rounded flex flex-row justify-between item-center p-2 m-2 mt-3 px-3 py-2 text-white focus:outline-none ml-14 fontPoppins "
                        onClick={handleShowNewCityOriginForm}
                      >
                        <AiOutlinePlusSquare size={22} color="white" /> Nueva
                        ciudad
                      </button>

                      {showNewCityForm && (
                        <FormNewCityOrigin
                          onHideForm={handleHideNewCityOriginForm}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="idCountry"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      País de destino:
                    </label>

                    <select
                      name="idCountry"
                      id="idCountry"
                      value={input.idCountry}
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
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.idCountry}
                      </p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="idContinent"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Continente:
                    </label>
                    <select
                      name="idContinent"
                      id="idContinent"
                      value={input.idContinent}
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
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.idContinent}
                      </p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="idCity"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Ciudad de destino:
                    </label>
                    <select
                      name="idCity"
                      id="idCity"
                      value={input.idCity}
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
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.idCity}
                      </p>
                    </div>

                    <button
                      className="bg-green-400 hover:bg-gray-500  rounded flex flex-row justify-between item-center p-2 m-2 mt-3 px-3 py-2 text-white focus:outline-none ml-14 fontPoppins"
                      onClick={handleShowNewCityDestinyOriginForm}
                    >
                      <AiOutlinePlusSquare size={22} color="white" /> Nueva
                      ciudad
                    </button>

                    {showNewCityDestinyForm && (
                      <FormNewCityDestiny
                        onHideForm={handleHideNewCityDestinyForm}
                        selectedCountryId={input.idCountry}

                        filteredCities={filteredCities}
                        setFilteredCities={setFilteredCities}

                      />
                    )}
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel className="fontPoppins">
              <div className="mt-10 ml-5 w-full">
                <div className="mt-10 flex flex-col mr-5 justify-start">
                  <div className="mb-5">
                    <label
                      htmlFor="idAirline"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Aerolinea:
                    </label>
                    <select
                      name="idAirline"
                      id="idAirline"
                      value={input.idAirline}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    >
                      <option value="">Selecione una aerolinea </option>
                      {airlines.map((airline) => (
                        <option key={airline.id} value={airline.id}>
                          {airline.name}
                        </option>
                      ))}
                    </select>
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.idAirline}
                      </p>
                    </div>
                    <div>
                      <button
                        className="bg-green-400 hover:bg-gray-500 rounded flex flex-row justify-between item-center p-2 m-2 mt-3 px-3 py-2 text-white focus:outline-none ml-20 fontPoppins"
                        onClick={handleShowNewAirlineForm}
                      >
                        <AiOutlinePlusSquare size={22} color="white" /> Nueva
                        aerolinea
                      </button>

                      {showNewAirlineForm && (
                        <FormNewAirline onHideForm={handleHideNewAirlineForm} />
                      )}

                      <label
                        htmlFor="outboundFlight"
                        className="block mb-2 text-sm font-bold text-gray-600"
                      >
                        Detalles del vuelo de ida:
                      </label>
                      <input
                        type="text"
                        name="outboundFlight"
                        id="outboundFlight"
                        placeholder="Vuelo de ida..."
                        value={input.outboundFlight}
                        onChange={handleInputChange}
                        className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                      />
                      <div>
                        <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                          {errors.outboundFlight}
                        </p>
                      </div>

                      <label
                        htmlFor="returnFlight"
                        className="block mb-2 text-sm font-bold text-gray-600"
                      >
                        Detalles del vuelo de regreso:
                      </label>
                      <input
                        type="text"
                        name="returnFlight"
                        id="returnFlight"
                        placeholder="Vuelo de regreso..."
                        value={input.returnFlight}
                        onChange={handleInputChange}
                        className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                      />
                      <div>
                        <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                          {errors.returnFlight}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel className="fontPoppins">
              <div className="mt-10 ml-5 w-full">
                <div className="mt-10 grid grid-cols-2 gap-4 mr-5 justify-start">
                  <div className="mb-5">
                    <label
                      htmlFor="idHotel"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Hotel:
                    </label>
                    <select
                      name="idHotel"
                      id="idHotel"
                      value={input.idHotel}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    >
                      <option value="">Seleccione un Hotel</option>
                      {filteredHotels.map((hotel) => (
                        <option key={hotel.id} value={hotel.id}>
                          {hotel.name}
                        </option>
                      ))}
                    </select>
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.hotel}
                      </p>
                    </div>
                    <div>
                      <button
                        className="bg-green-400 rounded hover:bg-gray-500 flex flex-row justify-between item-center p-2 m-2 mt-3 px-3 py-2 text-white focus:outline-none ml-14 fontPoppins"
                        onClick={handleShowNewHotelForm}
                      >
                        <AiOutlinePlusSquare size={22} color="white" /> Nuevo
                        Hotel
                      </button>

                      {showNewHotelForm && (
                        <FormNewHoltel
                          onHideForm={handleHideNewHotelForm}
                          selectedCityId={input.idCity}
                        />
                      )}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="service"
                      className="block mb-2 text-sm font-bold text-gray-600"
                    >
                      Incluye:
                    </label>

                    <input
                      type="text"
                      name="service"
                      id="service"
                      placeholder="Servicios..."
                      value={input.service}
                      onChange={handleInputChange}
                      className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
                    />
                    <div>
                      <p className="text-red-500 text-xs font-bold fontPoppins mt-2 mb-5">
                        {errors.service}
                      </p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="w-3/4 px-3 py-4 hover:bg-gray-500 bg-green-400 text-white rounded-md focus:bg-green-600 focus:outline-none fontPoppins text-xl mt-70 "
                    >
                      Crear paquete
                    </button>
                  </div>
                </div>
              </div>
              {formSubmitted && showActivityForm && (
                <FormActivity
                  activitys={input.activitys}
                  onHideForm={handleHideActivityForm}
                />
              )}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Form;
