import { fetchCountries ,addCountries} from "../Redux/Country/countriesActions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AiOutlineCheckSquare,AiOutlineMinusSquare} from 'react-icons/ai'
import { fetchContinents } from "../Redux/Continent/continentActions";


export default function FormNewCountry({onHideForm}){

    const continents = useSelector((state) => state.continents.continentsList);

    const dispatch = useDispatch();

    const [newCountryName, setnewCountryName] = useState({
        name:"",
        calification:1,
        flag:"No aplica",
        idContinent:""
      }); 

     

      useEffect(() => {
        dispatch(fetchContinents())
        }, [dispatch]);

        function handleNewCountryInputChange (e){
            setnewCountryName({
              ...newCountryName,
              [e.target.name]:e.target.value
            })}

            function handleSubmit (e){
                e.preventDefault();
                dispatch(addCountries(newCountryName));
                setnewCountryName({
                    name:"",
        calification:1,
        flag:"No aplica",
        idContinent:""
                  });
                  alert("País creado correctamente");
                  dispatch(fetchCountries())
                  onHideForm()
            }

            function handleCancel() {
                onHideForm(); // Llama a la función para ocultar el formulario sin enviar datos.
              }

    return(
        <div>
            <div>
            <form action="createConuntry">

                <button className="bg-green-400 rounded p-2 m-2 mt-3 px-3 py-2 text-white focus:outline-none" onClick={handleCancel}>
                    <AiOutlineMinusSquare size={32} color= "white"/>
                </button>
                <label>Nombre del pais</label>
                <input type="text"
                name = "name"
                placeholder="Pais.."
                value={newCountryName.name}
                onChange={handleNewCountryInputChange}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>

                <label>Calificacion: </label>
                <input type="text"
                name="calification"
                value={newCountryName.calification}
                readOnly
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />

                <label>Bandera: </label>
                <input type="text"
                name="flag"
                value={newCountryName.flag}
                readOnly
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />

<select name="idContinent" 
            id="continent"
            value={newCountryName.idContinent}
            onChange={handleNewCountryInputChange}
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Seleccione un continente </option>
            {continents.map((continent)=>
            <option key={continent.id} value={continent.id}>{continent.name}
            </option>)}
            </select>
            <button className="bg-green-400 rounded p-2 m-2 mt-3 px-3 py-2 text-white focus:outline-none" onClick={handleSubmit}>
                <AiOutlineCheckSquare size={32} color= "white"/>
            </button>

    </form>  

            </div>
      
</div>
    )
}