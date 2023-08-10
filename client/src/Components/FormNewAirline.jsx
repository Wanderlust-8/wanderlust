import { fetchAirlines } from "../Redux/Airlines/airlinesActions";
import React, { useState} from "react";
import { useDispatch} from "react-redux";
import { addAirline } from "../Redux/Airlines/airlinesActions";
import { AiOutlineCloseSquare} from 'react-icons/ai'



export default function FormNewAirline({onHideForm}){
    
    const dispatch = useDispatch();
    

    const [newAirlineName, setNewAirlineName] = useState({
        name:"",
      }); // Estado para el nombre de la nueva aerolinea


       
  function handleNewAirlineChange (e){
    setNewAirlineName({
      ...newAirlineName,
      [e.target.name]:e.target.value
    })}

function handleSubmit (e){
    e.preventDefault();
    dispatch(addAirline(newAirlineName));
    setNewAirlineName({
        name: "",
      });
      alert("Aerolinea creada correctamente");
      dispatch(fetchAirlines ())
      onHideForm()
}


function handleCancel() {
    onHideForm(); // Llama a la función para ocultar el formulario sin enviar datos.
  }


return(
<div>
   
        <div className="flex  flex-col justify-end items-center rounded-xl m-2 shadow-xl">
          <div className="mt-5 h-1/5 mr-56 flex ">
<div>
<button  className="bg-green-400 w-12 hover:bg-gray-500 rounded item-center p-2 m-2 mt-2 px-3 py-2 text-white focus:outline-none ml-14 fontPoppins " onClick={handleCancel}>
                    <AiOutlineCloseSquare size={22} color= "white"/>
                </button>
</div>

          <form className="mb-5 mt-2">
          <div className="item-center ">
            <div>
            <label className="block mb-2 text-sm font-bold text-gray-600">Nombre de la aerolinea: </label>
            <input
            type="text"
            name="name"
            placeholder="Nombre de la ciudad"
            value={newAirlineName.name}
            onChange={handleNewAirlineChange}
            className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"/>
</div>
<div className="aling-center justify-center ">
            <button  className="bg-green-400 rounded  hover:bg-gray-500 flex flex-row justify-between item-center p-2 mt-3 px-3 py-2 text-white focus:outline-none  ml-56 fontPoppins "onClick={handleSubmit}>
              Crear
            </button>
</div>
            </div>
          </form>
          </div>
          </div>
       

</div>
)
}