import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiWifi } from "react-icons/bi";
import {
  MdOutlineFreeBreakfast,
  MdOutlineLocalLaundryService,
  MdSmokeFree,
  MdOutlineAirportShuttle,
} from "react-icons/md/index.esm";
import { RiStarSFill } from "react-icons/ri";

function Hotels({ hotel }) {
  // console.log(hotel)
  const { name, calification, image, stars } = hotel;

  // stars del hotel
  const yellowstars = [];
  for (let i = 0; i < stars; i++) {
    yellowstars.push(
      <RiStarSFill
        key={i}
        className="text-yellow-500 text-xl mr-1 inline-flex"
      />
    );
  }

  return (
    <div className="mt-12 text-left fontPoppins">
      <h1 className="text-2xl font-bold">{name}</h1>
      <h3 className="text-lg">{yellowstars}</h3>
      <h3 className="text-xs font-semibold">Calificación: {calification}</h3>
      <h3 className="text-xs font-semibold">Pensión Completa</h3>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={true}
        showStatus={false}
        dynamicHeight={false}
        renderThumbs={(children) =>
          children.map((child) => (
            <img
              src={child.props.children.props.src}
              style={{ height: "80px", objectFit: "cover" }}
              alt=""
            />
          ))
        }
      >
        {image?.map((el, index) => (
          <div key={index}>
            <img
              src={el ? el : null}
              alt="Not found"
              style={{ width: "1000px", height: "600px", objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>

      <div className="font-medium ">
        <h3 className="text-l font-bold text-left mb-2 mt-8">
          Servicios destacados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="p-4 border rounded-md flex items-center space-x-2">
            <BiWifi className="text-green-500 text-xl" />
            <span className="text-m">Free WIFI en todas las intalaciones</span>
          </div>
          <div className="p-4 border rounded-md flex items-center space-x-2">
            <MdOutlineFreeBreakfast className="text-green-500 text-xl" />
            <span className="text-m">Desayuno incluído</span>
          </div>
          <div className="p-4 border rounded-md flex items-center space-x-2">
            <MdOutlineLocalLaundryService className="text-green-500 text-xl" />
            <span className="text-m">Lavandería de pago</span>
          </div>
          <div className="p-4 border rounded-md flex items-center space-x-2">
            <MdSmokeFree className="text-green-500 text-xl" />
            <span className="text-m">Habitaciones libres de humo</span>
          </div>
          <div className="p-4 border rounded-md flex items-center space-x-2">
            <MdOutlineAirportShuttle className="text-green-500 text-xl" />
            <span className="text-m">Transfer al aeropuerto</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotels;
