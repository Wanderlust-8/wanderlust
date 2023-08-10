import { fetchCountries } from "../Redux/Country/countriesActions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOriginCity, getCityOrigin } from "../Redux/Cities/citiesActions";
import { AiOutlineCloseSquare} from 'react-icons/ai'



export default function FormNewCityOrigin({onHideForm}){
    
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries.countriesList);

    const [newCityName, setNewCityName] = useState({
        name:"",
        idCountry:""
      }); // Estado para el nombre de la nueva ciudad


    useEffect(() => {
      dispatch(fetchCountries())
      }, [dispatch]);

    
  function handleNewCityInputChange (e){
    setNewCityName({
      ...newCityName,
      [e.target.name]:e.target.value
    })}

    async function handleSubmit(e) {
      e.preventDefault();
     dispatch(addOriginCity(newCityName));
      setNewCityName({
          name: "",
          idCountry: "",
      });
      alert("Ciudad creada correctamente");
      onHideForm();  // Ocultar el formulario antes de hacer fetchOriginCities
     dispatch(getCityOrigin());
  }

function handleCancel() {
    onHideForm(); // Llama a la función para ocultar el formulario sin enviar datos.
  }

  

return(
<div>
        <div className="flex flex-col justify-end items-center rounded-xl m-2 shadow-xl">
        <div className="mt-5 h-1/5 mr-56 flex ">
          <button className="bg-green-400 w-12 hover:bg-gray-500 rounded item-center p-2 m-2 mt-2 px-3 py-2 text-white focus:outline-none ml-14 fontPoppins " onClick={handleCancel}>
                    <AiOutlineCloseSquare size={22} color= "white"/>
                </button>
                </div>
          <form className="mb-5 mt-2">
            <div className="item-center ">
             
                <div>
            <label className="block mb-2 text-sm font-bold text-gray-600" >Nombre de la ciudad: </label>
            <input
            type="text"
            name="name"
            placeholder="Nombre de la ciudad"
            value={newCityName.name}
            onChange={handleNewCityInputChange}
            className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"/>

</div>

            <select name="idCountry" 
            id="countryOrigin"
            value={newCityName.idCountry}
            onChange={handleNewCityInputChange}
            className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm">
              <option value="">Seleccione un País </option>
            {countries.map((country)=>
            <option key={country.id} value={country.id}>{country.name}
            </option>)}
            </select>

          
            </div>
            <div className="aling-center justify-center ">
            <button className="bg-green-400 rounded  hover:bg-gray-500 flex flex-row justify-between item-center p-2 mt-3 px-3 py-2 text-white focus:outline-none  ml-56 fontPoppins "onClick={handleSubmit}> Crear
            </button>

            </div>
          </form>
          </div>
       

</div>
)
}