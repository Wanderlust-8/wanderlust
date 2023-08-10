import React from "react";
import NavBar from "../Components/NavBar";
import {
  FaPlane,
  FaHotel,
  FaMapMarkedAlt,
  FaSuitcaseRolling,
  FaCar,
  FaUmbrellaBeach,
} from "react-icons/fa";
import Statistic from "../Components/Statistic";
import Footer from "../Components/Footer";

function About() {
  return (
    <>
      <div className="bg-verdeFooter shadow-md text-white">
        <NavBar />
      </div>
      <div>
        <img
          src="https://wanderlust.com.ua/img/shop_background_new.jpg"
          alt=""
        />
      </div>
      <Statistic />
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 animate-fade-up">
        <div className="p-8 rounded shadow-xl sm:p-16">
          <div className="flex flex-col lg:flex-row">
            <div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
              <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Tu aventura comienza aquí
                <br className="hidden md:block " />
                <span className="inline-block text-textGH ">
                  Descubre, viaja y vive
                </span>{" "}
                experiencias únicas
              </h2>
            </div>
            <div className="lg:w-1/2 text-left">
              <p className="mb-4 text-base text-gray-700">
                En Wanderlust, nos apasiona viajar. Sabemos que cada viaje es
                una historia que contar, por eso nos dedicamos a garantizar que
                cada aventura sea única e inolvidable. Desde vuelos económicos,
                hoteles acogedores hasta actividades emocionantes, cuidamos cada
                detalle para que tú solo te preocupes de disfrutar. Con años de
                experiencia y un equipo dedicado, nos esforzamos por hacer que
                tus sueños viajeros se conviertan en realidad.
              </p>
              <a
                href="/home"
                aria-label=""
                className="text-textGH inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                Ver mas
              </a>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl xl:text-5xl">
              Descubre nuevas aventuras
            </h2>
            <p className="mt-4 text-base text-gray-700 sm:mt-8">
              Sumérgete en experiencias únicas y lugares inolvidables. Deja que
              tu espíritu aventurero nos elija. Con nuestros paquetes de viaje,
              la aventura está garantizada.
            </p>
          </div>

          <div className="sm:col-gap-12 row-gap-12 md:gap mt-10 grid grid-cols-1 sm:mt-16 sm:grid-cols-2 md:grid-cols-3 xl:mt-24">
            <div className="md:border-b-2 border-emerald-500 md:shadow-lg m-2 md:p-8 lg:p-12 animate-fade">
              <FaPlane
                className="mx-auto block align-middle text-textGH"
                size={46}
              />
              <h3 className="mt-12 text-xl font-bold text-slate-800">Vuelos</h3>
              <p className="mt-5 text-base text-gray-700">
                Conexiones aéreas a los destinos más buscados.
              </p>
            </div>

            <div className="md:border-b-2 border-emerald-500 md:shadow-lg m-2 md:p-8 lg:p-12 animate-fade">
              <FaHotel
                className="mx-auto block align-middle text-textGH"
                size={46}
              />
              <h3 className="mt-12 text-xl font-bold text-slate-800">
                Hospedajes
              </h3>
              <p className="mt-5 text-base text-gray-700">
                Las mejores opciones para descansar en tu viaje.
              </p>
            </div>

            <div className="md:border-b-2  border-emerald-500 md:shadow-lg m-2 md:p-8 lg:p-12 animate-fade">
              <FaMapMarkedAlt
                className="mx-auto block align-middle text-textGH"
                size={46}
              />
              <h3 className="mt-12 text-xl font-bold text-slate-800">
                Actividades y Tours
              </h3>
              <p className="mt-5 text-base text-gray-700">
                Descubre y reserva las mejores actividades.
              </p>
            </div>

            <div className="md:border-b-2 border-emerald-500 md:shadow-lg m-2 md:p-8 lg:p-12 animate-fade">
              <FaSuitcaseRolling
                className="mx-auto block align-middle text-textGH"
                size={46}
              />
              <h3 className="mt-12 text-xl font-bold text-slate-800">
                Paquetes
              </h3>
              <p className="mt-5 text-base text-gray-700">
                Combina y ahorra con nuestros paquetes de viaje.
              </p>
            </div>

            <div className="md:border-b-2 border-emerald-500 md:shadow-lg m-2 md:p-8 lg:p-12 animate-fade ">
              <FaCar
                className="mx-auto block align-middle text-textGH"
                size={46}
              />
              <h3 className="mt-12 text-xl font-bold text-slate-800">
                Alquiler de autos
              </h3>
              <p className="mt-5 text-base text-gray-700">
                Explora a tu ritmo con nuestras opciones de renta.
              </p>
            </div>

            <div className="md:border-b-2 border-emerald-500 md:shadow-lg m-2 md:p-8 lg:p-12 animate-fade">
              <FaUmbrellaBeach
                className="mx-auto block align-middle text-textGH"
                size={46}
              />
              <h3 className="mt-12 text-xl font-bold text-slate-800">Playas</h3>
              <p className="mt-5 text-base text-gray-700">
                Relájate en las playas más hermosas del mundo.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default About;
