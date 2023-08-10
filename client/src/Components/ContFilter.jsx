import { useState } from "react";
import { Link } from "react-router-dom";

function ContFilter({ paquetes }) {
  const [filtrados, SetFiltrados] = useState([]);

  function filtradoPorCont(continente) {
    const filtroPaq = paquetes.filter(
      (paq) => paq.Continent.name === continente
    );
    SetFiltrados(filtroPaq.slice(0, 6));
  }

  return (
    <>
      <div className="grid grid-cols-1 ">
        <h1 className="text-2xl text-gray-800 fontPoppinsB">
          Descubre tu próximo destino
        </h1>
        <div className="flex justify-around mt-10">
          <button
            className="pl-7 pr-7 pt-2 pb-2 rounded bg-green-400 text-white font-bold hover:bg-green-500"
            onClick={() => {
              filtradoPorCont("Africa");
            }}
          >
            Africa
          </button>

          <button
            className="pl-7 pr-7 pt-2 pb-2 rounded bg-green-400 text-white font-bold hover:bg-green-500"
            onClick={() => {
              filtradoPorCont("América");
            }}
          >
            Americas
          </button>
          <button
            className="pl-7 pr-7 pt-2 pb-2 rounded bg-green-400 text-white font-bold hover:bg-green-500"
            onClick={() => {
              filtradoPorCont("Asia");
            }}
          >
            Asia
          </button>

          <button
            className="pl-7 pr-7 pt-2 pb-2 rounded bg-green-400 text-white font-bold hover:bg-green-500"
            onClick={() => {
              filtradoPorCont("Europa");
            }}
          >
            Europa
          </button>

          <button
            className="pl-7 pr-7 pt-2 pb-2 rounded bg-green-400 text-white font-bold hover:bg-green-500"
            onClick={() => {
              filtradoPorCont("Oceania");
            }}
          >
            Oceanía
          </button>
        </div>
        <div className="mt-7 w-[1000px]">
          <div className="grid grid-cols-3">
            {filtrados.length > 0
              ? filtrados.map((paq) => (
                  <Link
                    to={`/detail/${paq.id}`}
                    key={paq.id}
                    className="m-2 rounded shadow-2xl p-2 hover:bg-gray-400 hover:scale-y-105 transition"
                  >
                    <div>
                      <img
                        className="rounded w-[280px] h-[150px]"
                        src={paq.image}
                        alt=""
                      />
                      <h1 className="fontPoppinsB text-left m-1">
                        {paq.title}
                      </h1>

                      <h1 className="fontPoppins text-right m-1 text-xs">
                        {paq.duration} days for trip
                      </h1>
                    </div>
                  </Link>
                ))
              : paquetes.slice(0, 6).map((paq1) => (
                  <Link
                    to={`/detail/${paq1.id}`}
                    key={paq1.id}
                    className="m-2 rounded shadow-2xl p-2 hover:bg-gray-400 hover:scale-y-105 transition"
                  >
                    <div>
                      <img
                        className="rounded w-[280px] h-[150px]"
                        src={paq1.image}
                        alt=""
                      />
                      <h1 className="fontPoppinsB text-left m-1">
                        {paq1.title}
                      </h1>

                      <h1 className="fontPoppins text-right m-1 text-xs">
                        {paq1.duration} days for trip
                      </h1>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContFilter;
