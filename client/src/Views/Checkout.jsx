import React, { useContext, useEffect } from "react";
import { authContext } from "../Context/authContext";
import { GrPaypal } from "react-icons/gr";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { CgDanger } from "react-icons/cg";
import CardItem from "../Components/CardCheckout";
import { useAuth } from "../Context/authContext";
import { useSelector, useDispatch } from "react-redux";
import { userShopping } from "../Redux/ShoppingCart/shoppingCartActions";
import { create_order } from "../Redux/Checkout/checkoutActions";

export default function Checkout() {
  const { currentUser } = useContext(authContext);
  // console.log('el user en checkout', currentUser.uid)
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(userShopping(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  // const idCart = useSelector((state) => state.carrito.idCart);
  const cartItems = useSelector((state) => state.carrito.cart);
  // console.log("STO ES cartItems DESDE SHOPING CART ", cartItems);
  // console.log("STO ES idCart DESDE SHOPING CART ", idCart);
  const vatPercentage = 10; // Porcentaje del impuesto
  let totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.totalPrice),
    0
  );
  const vatAmount = (totalPrice * vatPercentage) / 100; // Cálculo del impuesto
  const finalPrice = totalPrice + vatAmount; // Suma el impuesto al precio total
  const precioFormateado = finalPrice.toFixed(2); // Precio total con impuestos
  const vatFormateado = vatAmount.toFixed(2); // Impuesto formateado
  const precioJSON = precioFormateado.toString(); //precio para colocar en la order
  // console.log("precio final json", precioJSON);

  const itemTitles = cartItems
    .map((el) => el.title)
    .concat()
    .toString();
  // console.log("items a enviar", itemTitles);

  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: precioJSON,
        },
        description: itemTitles,
      },
    ],
    application_context: {
      brand_name: "wanderlust.com",
      landing_page: "LOGIN",
      user_action: "PAY_NOW",
      return_url: "http://localhost:3002/payment/pay-order",
      cancel_url: "http://localhost:3002/payment/cancel-order",
      current_user: currentUser.uid, //ACÁ HAY QUE TRAER EL UUID DEL CURRENT USER.
    },
  };

  function send_order() {
    dispatch(create_order(order));
  }

  return (
    <div>
      <div className="bg-verdeFooter">
        <NavBar />
      </div>
      <div class="relative mx-auto w-full bg-white">
        <div class="grid min-h-screen grid-cols-10">
          <div class="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div class="mx-auto w-full max-w-lg">
              <h1 class="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                Checkout Seguro
                <span class="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
              </h1>
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-500 p-4 my-4"
                role="alert"
              >
                <div className="flex">
                  <div className="py-1">
                    <CgDanger className="mr-2 text-2xl" />
                  </div>
                  <div>
                    <p className="font-bold">Atención</p>
                    <p className="text-sm">
                      Momentáneamente, el único método de pago en funcionamiento es PayPal.
                    </p>
                  </div>
                </div>
              </div>
              <form action="" class="mt-10 flex flex-col space-y-4">
                <div>
                  <label
                    for="email"
                    class="text-xs font-semibold text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div class="relative">
                  <label
                    for="card-number"
                    class="text-xs font-semibold text-gray-500"
                  >
                    Número de tarjeta
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    placeholder="1234-5678-XXXX-XXXX"
                    class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                  <img
                    src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                    alt=""
                    class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div>
                  <p class="text-xs font-semibold text-gray-500">
                    Fecha de vencimiento
                  </p>
                  <div class="mr-6 flex flex-wrap">
                    <div class="my-1">
                      <label for="month" class="sr-only">
                        Selecciona el mes de vencimiento
                      </label>
                      <select
                        name="month"
                        id="month"
                        class="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Mes</option>
                      </select>
                    </div>
                    <div class="my-1 ml-3 mr-6">
                      <label for="year" class="sr-only">
                        Selecciona el año de vencimiento
                      </label>
                      <select
                        name="year"
                        id="year"
                        class="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="">Año</option>
                      </select>
                    </div>
                    <div class="relative my-1">
                      <label for="security-code" class="sr-only">
                        Código de seguridad
                      </label>
                      <input
                        type="text"
                        id="security-code"
                        name="security-code"
                        placeholder="Security code"
                        class="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label for="card-name" class="sr-only">
                    Nombre de tarjeta
                  </label>
                  <input
                    type="text"
                    id="card-name"
                    name="card-name"
                    placeholder="Name on the card"
                    class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </form>
              <p class="mt-10 text-center text-sm font-semibold text-gray-500">
                Al comprar esta orden, aceptas los{" "}
                <a
                  href="#"
                  class="whitespace-nowrap text-teal-400 underline hover:text-teal-600"
                >
                  Términos y Condiciones
                </a>
              </p>
              <button
                type="submit"
                onClick={() => {
                  send_order();
                }}
                className="mt-4 inline-flex w-full items-center justify-center rounded bg-paypalYellow py-2.5 px-4 text-base font-semibold tracking-wide text-paypalBlue outline-none ring-offset-2 transition focus:bg-paypalYellow sm:text-lg"
              >
                <GrPaypal className="mr-2 text-paypalBlue" />
                Pagar con PayPal
              </button>
            </div>
          </div>
          <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 class="sr-only">Resumen de compra</h2>
            <div>
              <img
                src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                alt=""
                class="absolute inset-0 h-full w-full object-cover"
              />
              <div class="absolute inset-0 h-full w-full bg-gradient-to-t from-green-400 to-green-800 opacity-95"></div>
            </div>
            <div class="relative">
              <ul class="space-y-5">
                {cartItems.map((item, index) => (
                  <CardItem
                    key={index}
                    image={item.image}
                    title={item.title}
                    description={`Amount: ${item.amount}, Unit Price: ${item.unitPrice}`}
                    price={`$${item.totalPrice}`}
                  />
                ))}
              </ul>
              <div class="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div class="space-y-2">
                <p class="flex justify-between text-sm font-medium text-white">
                  <span>IVA: {vatPercentage}%</span>
                  <span>USD{vatFormateado}</span>
                </p>
                <p class="flex justify-between text-lg font-bold text-white">
                  <span>Precio total (incl. IVA):</span>
                  <span>USD{precioFormateado}</span>
                </p>
              </div>
            </div>
            <div class="relative mt-10 text-white">
              <h3 class="mb-5 text-lg font-bold">Atención al cliente</h3>
              <p class="text-sm font-semibold">
                +01 653 235 211 <span class="font-light">(Internacional)</span>
              </p>
              <p class="mt-1 text-sm font-semibold">
                support@wanderlust.com <span class="font-light">(Email)</span>
              </p>
              <p class="mt-2 text-xs font-medium">
                Contáctanos ahora por cuestiones relacionadas al pago.
              </p>
            </div>
            <div class="relative mt-10 flex">
              <p class="flex flex-col">
                <span class="text-sm font-bold text-white">
                  Garantía de devolución del dinero
                </span>
                <span class="text-xs font-medium text-white">
                  dentro de los 30 días de la compra.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
