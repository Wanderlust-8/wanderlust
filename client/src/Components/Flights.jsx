import React from "react";
import { useSelector } from "react-redux";

const Flights = ({ tour }) => {
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
  );
};
export default Flights;
