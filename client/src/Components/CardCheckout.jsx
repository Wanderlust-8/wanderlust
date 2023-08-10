import React from "react";

const CardItem = ({ image, title, description, price }) => {
  return (
    <li className="flex justify-between">
      <div className="inline-flex">
        <img src={image} alt="" className="h-24 w-32 object-cover rounded-lg" />{" "}
        {/* Aquí hemos agregado la clase "w-16" */}
        <div className="ml-3">
          <p className="text-base font-semibold text-white">{title}</p>
          <p className="text-sm font-medium text-white text-opacity-80">
            {description}
          </p>
        </div>
      </div>
      <p className="text-sm font-semibold text-white">{price}</p>
    </li>
  );
};

export default CardItem;
