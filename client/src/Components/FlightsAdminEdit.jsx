import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

const FlightsAdmin = ({
  tour,
  inputEdit,
  isEditing,
  handleInputChange,
  setIsEditing,
}) => {
  const { outboundFlight, returnFlight } = tour;

  const airlines = useSelector((state) => state.airlines.airlinesList);
  const airlineData = airlines.find((el) => el.id === tour.idAirline);
  const airlineName = airlineData ? airlineData.name : "Desconocida";

  if (!airlines) {
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        cargando...{" "}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start mt-10 ml-10 text-left font-sans">
      {isEditing ? (
        <div>
          <div className="mb-5">
            <button
              className="bg-green-400 w-12 hover:bg-gray-500 rounded item-center p-2 m-2 mt-2 px-3 py-2 text-white focus:outline-none ml-14 fontPoppins "
              onClick={() => setIsEditing(false)}
            >
              <AiOutlineCloseSquare size={22} color="white" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Resumen del vuelo
            </h2>

            <div>
              <label
                htmlFor="idAirline"
                className="block mb-2 text-sm font-bold text-gray-600"
              >
                Aerolinea:
              </label>
              <select
                name="idAirline"
                id="idAirline"
                value={inputEdit.idAirline}
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
            </div>
            <div>
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
                value={inputEdit.outboundFlight}
                onChange={handleInputChange}
                className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
              />
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
                value={inputEdit.returnFlight}
                onChange={handleInputChange}
                className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
              />
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
                value={inputEdit.initialDate}
                onChange={handleInputChange}
                className="w-3/4  px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
              />
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
                value={inputEdit.finalDate}
                onChange={handleInputChange}
                className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
              />
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
                value={inputEdit.duration}
                onChange={handleInputChange}
                className="w-3/4 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 fontPoppins text-sm"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Resumen del vuelo
          </h2>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Vuelas con {airlineName}
          </h3>
          <ol className="relative border-l border-gray-200">
            <li className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                Fecha de Salida
              </time>
              <h3 className="text-lg font-semibold text-gray-900">
                {outboundFlight}
              </h3>
            </li>
            <li className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                Fecha de Regreso
              </time>
              <h3 className="text-lg font-semibold text-gray-900">
                {returnFlight}
              </h3>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};
export default FlightsAdmin;