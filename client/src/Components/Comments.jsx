import { useState, useEffect } from "react";
import { ImLocation } from "react-icons/im";
import { AiFillCalendar } from "react-icons/ai";

function Sale({ paquetes }) {
  console.log(paquetes[0]);
  const [filtrados, SetFiltrados] = useState([]);

  const filtrado = paquetes.slice(0, 3);

  console.log(filtrado);
  //   function filtradoPorOf() {
  //     const sorte = paquetes.sort(() => Math.random() - 0.5);
  //     const filtroPaq = sorte.slice(0, 3);
  //     SetFiltrados(filtroPaq);
  //   }
  //   useEffect(() => {
  //     filtradoPorOf();
  //   }, []);

  return (
    <div className="mt-7 w-[1000px]">
      <h1 className="text-2xl text-gray-800 fontPoppinsB">Flash Deals</h1>
      <div className="grid grid-cols-3">
        {filtrado.map((paquete) => (
          <div
            key={paquete.idTypePackage}
            className="m-2 rounded shadow-2xl p-2"
          >
            {/* <img
              className="rounded w-[280px] h-[150px]"
              src={paquete.image}
              alt=""
            /> */}
            <h1 className=" fontPoppinsB text-left m-1">{paquete.title}</h1>
            {/* 
            <h6 className="text-gray-600 text-2xs">
              <ImLocation className="w-3 text-gray-600" /> {paquete.City.name}{" "}
              {paquete.duration}
              {" days"}
            </h6> */}
            <h6 className="text-gray-600 text-2xs flex items-center">
              <ImLocation className="w-3  text-gray-600" /> {paquete.City.name}
              {""}
              <AiFillCalendar className="w-3 text-gray-600" />
              {paquete.duration} days
            </h6>

            <h1 className="fontPoppinsB mt-3 mr-[250px] text-gray-600 text-xs line-through">
              {" "}
              {"$" + paquete.standarPrice}
            </h1>
            <span className="  fontPoppinsB text-left m-1  text-red-600">
              {"USD$" + " " + paquete.promotionPrice + ",00"}
            </span>
            <span className=" text-xs text-gray-600">/Per person</span>

            <h1 className="text-orange-600 fontPoppinsB bg-orange-200 w-12 rounded-[6px]">
              -15%
            </h1>

            <h1 className="fontPoppins text-right m-1 text-xs">
              {paquete.duration} days for trip
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sale;
