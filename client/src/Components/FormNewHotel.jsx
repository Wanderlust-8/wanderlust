import { fetchHotels} from "../Redux/Hotels/hotelsActions";
import { fetchCities } from "../Redux/Cities/citiesActions";
import React, { useEffect, useState} from "react";
import { useDispatch,useSelector} from "react-redux";
import { addHotels } from "../Redux/Hotels/hotelsActions";
import { AiOutlineCloseSquare} from 'react-icons/ai'
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";



export default function FormNewHoltel({onHideForm,selectedCityId}){
    const dispatch = useDispatch();
    const cities = useSelector((state) => state.cities.citiesList)

    useEffect(() => {
        dispatch(fetchCities())
      }, [dispatch]);
    
    

    const [newHotel, setNewHotel] = useState({
        name:"",
        image:[],
        calification:0,
        stars:0,
        details:"",
        idCity:selectedCityId
      }); 



      async function uploadImageToCloudinary(imageFile) {
        const cloudName = "dro5aw3iy";
        const uploadPreset = "images";
    
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", uploadPreset);
    
        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
            {
              headers: {
                "X-Requested-With": "XMLHttpRequest",
              },
            }
          );
    
          return response.data.secure_url;
        } catch (error) {
          console.error("Error al subir imagen a Cloudinary:", error);
          return null;
        }
      }
    
      async function handleSubmit(e) {
        e.preventDefault();
    
        const imageUrls = await Promise.all(
          newHotel.image.map(async (image) => {
            if (typeof image === "string") {
              return image;
            } else {
              const imageUrl = await uploadImageToCloudinary(image);
              return imageUrl;
            }
          })
        );
    
        const newHotelWithUrls = {
          ...newHotel,
          image: imageUrls,
        };
    
        dispatch(addHotels(newHotelWithUrls));
    
        setNewHotel({
          name: "",
          image: [],
          calification: 0,
          stars: 0,
          details: "",
          idCity: 0,
        });
    
        alert("Hotel creado correctamente");
        dispatch(fetchHotels());
        onHideForm();
      }
    
      function handleImageChange(event) {
        const { files } = event.target;
        const imageFiles = Array.from(files);
        setNewHotel({
          ...newHotel,
          image: [...newHotel.image, ...imageFiles],
        });
      } 
   
  
    function handleHotelChange(e) {
      const { name, value } = e.target;
      setNewHotel({
        ...newHotel,
        [name]: value,
      });
    }
    
    function handleRemoveImage(index) {
      const updatedImages = newHotel.image.filter((_, i) => i !== index);
      setNewHotel({
        ...newHotel,
        image: updatedImages,
      });
      document.getElementById('imageInput').value = '';
    }
    

function handleCancel() {
    onHideForm(); // Llama a la función para ocultar el formulario sin enviar datos.
  }

  return(
    <div>
      <div className="flex  flex-col justify-end items-center rounded-xl m-2 shadow-xl">
        <div className="mt-5 h-1/5 mr-56 flex ">
        <button className="bg-green-400 w-12 hover:bg-gray-500 rounded item-center p-2 m-2 mt-2 px-3 py-2 text-white focus:outline-none ml-14 fontPoppins " onClick={handleCancel}>
                    <AiOutlineCloseSquare size={22} color= "white"/>
                </button>
        </div>
        <form action="NewHotel">
       
                <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="name" 
               >Nombre del hotel:</label>
                <input
          type="text"
          name="name"
          placeholder="Nombre ..."
          value={newHotel.name}
          onChange={handleHotelChange}
          className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
        />

<label htmlFor="calification"
className="block mb-2 text-sm font-bold text-gray-600"
>Calificación:</label>
        <input
          type="number"
          min="0"
          max="10"
          step="0.5"
          name="calification"
          value={newHotel.calification}
          onChange={handleHotelChange}
          className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
          />
        <label htmlFor="stars"
        className="block mb-2 text-sm font-bold text-gray-600">Estrellas:</label>
        <input
          type="number"
          name="stars"
          min="0"
          max="5"
          value={newHotel.stars}
          onChange={handleHotelChange}
          className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
        />
        <label htmlFor="details"
        className="block mb-2 text-sm font-medium text-gray-600">Detalles:</label>
        <textarea
          name="details"
          placeholder="Indique los detalles sobre el hotel aqui...."
          value={newHotel.details}
          onChange={handleHotelChange}
          className="w-3/4  px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
        />

<div className="mb-5">
        <label
          htmlFor="idCity"
          className="block mb-2 text-sm font-bold text-gray-600"
        >
          Ciudad del hotel:

        </label>
        <select
                name="idCity"
                id="idCity"
                value={newHotel.idCity || selectedCityId}
                onChange={handleHotelChange}
                className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
              >
                <option value="">Seleccione una ciudad</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
      </div>

<div>
      <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor={`image`}>Imagen:</label>
            <input
            id="imageInput"
              type="file" 
              accept="image/*" 
              name= "image"
              multiple
              onChange={handleImageChange}
              className="w-3/4 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm  text-gray-600"
            />
          

          {newHotel.image.map((image, index) => (
            <div key={index} className="flex items-center mb-2">
    <img
      key={index}
      src={typeof image === 'string' ? image : URL.createObjectURL(image)}
      style={{ maxWidth: '300px', marginRight: '10px' }}
      alt={`Imagen ${index}`}
    />
    <div className="item-center">
     <button type="button"
        className="bg-green-400  text-white px-2 py-1 rounded  hover:bg-gray-500 mr-5 "
        onClick={() => handleRemoveImage(index)}
      >
        <AiOutlineDelete size={22} color="white"/>
      </button>
      </div>
    </div>
  ))}
          
        </div>

<div className="aling-center justify-center mb-5">
      <button className="bg-green-400 rounded  hover:bg-gray-500 flex flex-row justify-between item-center p-2 mt-3 px-3 py-2 text-white focus:outline-none  ml-56 fontPoppins "onClick={handleSubmit}>
               Crear
            </button>
            </div>

        </form>
        </div>
    </div>
  )

}

    