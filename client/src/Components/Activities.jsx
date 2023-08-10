import React, { useContext } from "react";
import { authContext } from "../Context/authContext";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { add_to_cart } from "../Redux/ShoppingCart/shoppingCartActions";
import { userShopping } from "../Redux/ShoppingCart/shoppingCartActions";

function Activities({ activity }) {
  const { Activities } = activity;
  const dispatch = useDispatch();
  const idCart = useSelector((state) => state.carrito.idCart);
  // const car = useSelector((state) => state.carrito.cart);
  const { currentUser } = useContext(authContext);
  // console.log('el carrito logueada', car)

  //  console.log("actividades en Act: ", Activities); // aca llegan las 4 actividades

  const handleReserveActivity = (selectedActivity) => {
    //addNew(selectedActivity);
    const item = selectedActivity;
    console.log("actividad reservada", selectedActivity);

    if (currentUser) {
      dispatch(add_to_cart(item));
      guardarEnBDD(item);
      dispatch(userShopping(currentUser.uid));
    } else {
      addNewItem(item);
    }
  };

  const guardarEnBDD = async (item) => {
    const response1 = await fetch(
      `http://localhost:3002/shoppingCar/${idCart}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      }
    );
  };

  //agregar items al localStorage
  function addNewItem(item) {
    let localStorageJSON = localStorage.getItem("carrito");
    let storedItems = [];
    if (localStorageJSON !== null) {
      storedItems = JSON.parse(localStorageJSON); //convierte a JS
    }
    storedItems.push(item);
    const updatedItemsJSON = JSON.stringify(storedItems);
    localStorage.setItem("carrito", updatedItemsJSON); //lo convierte a json
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4 mt-8 text-left fontPoppins">
        Actividades
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {Activities?.map((el) => (
          <div
            key={el.id}
            className="block rounded-lg bg-white shadow-xl border border-gray-300 p-4 card transform hover:scale-105 hover:z-10 transition-all duration-200"
          >
            <a href="#!">
              <img
                className="rounded-t-lg w-full h-60 object-cover"
                src={
                  el.image
                    ? el.image
                    : "https://uss.com.ar/sitio/wp-content/themes/consultix/images/no-image-found-360x260.png"
                }
                alt="Activity"
              />
            </a>
            <div className="mt-4 text-center fontPoppins">
              <h5 className="text-lg font-bold leading-tight text-gray-800">
                {el.name}
              </h5>
              <p className="text-gray-500">
                {!el.included
                  ? `Duración: ${el.duration}`
                  : "Actividad incluida"}
              </p>
              {!el.included && (
                <div className="mt-4 flex flex-col">
                  <span className="text-lg fontPoppinsB text-red-600 mb-4 inline-block">
                    Reservalo YA pagando solo USD {el.price}!!!
                  </span>
                  <button
                    onClick={() => {
                      handleReserveActivity({
                        amount: 1,
                        unitPrice: Number(el.price),
                        totalPrice: Number(el.price),
                        typeProduct: 2,
                        idProduct: el.id,
                        title: el.name,
                        image: el.image,
                      });
                      toast.success("Actividad reservada");
                    }}
                    className="p-2 text-white fontPoppinsB text-sm rounded bg-red-600 hover:bg-red-700 transition-colors mt-2"
                  >
                    Reservar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Activities;
