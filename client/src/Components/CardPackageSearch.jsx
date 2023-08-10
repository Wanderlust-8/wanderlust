import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCities } from "../Redux/Cities/citiesActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import RatingStars from "./RatingStars";

function Card({
  id,
  image,
  title,
  idCity,
  duration,
  totalLimit,
  standarPrice,
  qualification,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const navigate = useNavigate();
  const cities = useSelector((state) => state.cities.citiesList);
  const cityData = cities.find((city) => city.id === idCity);
  const cityName = cityData ? cityData.name : "Desconocida";

  function navigateHandler() {
    navigate(`/detail/${id}`);
  }

  return (
    <div
      onClick={navigateHandler}
      className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-2xl p-3 max-w-4xl mx-auto border border-white bg-white cursor-pointer hover:shadow-2xl transition duration-200 relative"
    >
      <div className="w-full md:w-2/5 grid place-items-center">
        <img
          src={image}
          alt={title}
          className="rounded-xl object-cover w-full h-64"
        />
      </div>

      <div className="w-full md:w-3/5 bg-white flex flex-col space-y-2 p-3 justify-between">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 font-medium">{cityName}</p>
            <div className="flex items-center">
              <RatingStars
                rating={qualification}
                className="h-5 w-5 text-yellow-500 mr-1"
              />
            </div>
          </div>
          <h3 className="font-black text-gray-800 md:text-3xl text-xl">
            {title}
          </h3>
          <p className="md:text-lg text-gray-500 text-base">
            Duración: {duration} días. Cupos: {totalLimit}
          </p>
        </div>

        <div className="self-end mt-3">
          <p className="text-2xl font-black text-gray-800 bg-yellow-300 px-2 py-1 rounded-md shadow-md">
            ${standarPrice}
            <span className="font-normal text-gray-600 text-lg">/persona</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
