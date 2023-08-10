import React, { useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "./NavBar";
import Footer from "./Footer";
import { authContext } from "../Context/authContext";
import check from "../assets/Check.mp4";
import { userShopping } from "../Redux/ShoppingCart/shoppingCartActions";
import { post_bill } from "../Redux/Checkout/checkoutActions";
import { fetchPackages } from "../Redux/Packages/packagesActions";
// import { put_package } from "../Redux/Packages/packagesActions";
// import { fetchCities } from "../Redux/Cities/citiesActions";
// import { fetchCountries } from "../Redux/Country/countriesActions";
// import { fetchContinents } from "../Redux/Continent/continentActions";

function PaymentComplete() {
  const { currentUser } = useContext(authContext);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.carrito.status);
  const idCart = useSelector((state) => state.carrito.idCart);
  // console.log("idcart", idCart);
  const cart = useSelector((state) => state.carrito.cart);
  // console.log("el cart", cart);
  const bill = useSelector((state) => state.checkout.bill);
  const tours = useSelector((state) => state.packages.packagesList);
  // console.log("tours", tours);

  const [videoEnded, setVideoEnded] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const [userShoppingCompleted, setUserShoppingCompleted] = useState(false);
  // const [billCreated, setBillCreated] = useState(false);
  const videoRef = useRef(null);
  

  console.log("bill en payment complete", bill);
  // console.log("el carrito en payment:", cart);
  // console.log("paquete info", paqueteInfo);

  //objeto con el idCart para grabar la factura
  const datos = {
    idCar: idCart,
  };

  //filtrar solo los paquetes del carrito
  // const packageOnly = cart && cart.filter((el) => el.typeProduct === 1);
  // //sacar el id del paquete
  // const idPackage = packageOnly && packageOnly.map((el) => el.idProduct);
  // // console.log("id pack", idPackage);

  // //filtrar aquellos paquetes que tengan el id igual a los idPackage, por si compra paquetes distintos
  // const filteredTours = tours.filter((el) => idPackage.includes(el.id));
  // // console.log("los tours que matchean", filteredTours);
  

  // //generar los newtotallimit para cada paquete comprado

  // const toursmapeados = filteredTours.map(el => {
  //   return {
  //     ...el,
  //     totalLimit: Number(el.totalLimit) - 

  // }}) 



  // const dispatchNewTotalLimitPackage = async (cart) => {
  //   console.log('cart en dispatch', cart)
  //   const updatePromises = filteredTours.forEach(async (tour) => {
  //     const itemCart = cart && cart.find(el => el.idProduct === tour.idProduct);
  //     console.log('itemcart', itemCart)
  //     if (itemCart) {
  //       const amountBought = itemCart.amount;
  //       const limitNumber = Number(tour.totalLimit);
  //       const newTotalLimit = (limitNumber - amountBought).toString();
  
  //       const updatedItem = {
  //         ...tour,
  //         totalLimit: newTotalLimit
  //       };
  
  //       await dispatch(put_package(tour.idProduct, updatedItem));
  //     }
  //   });
  
  //   await Promise.all(updatePromises);
  // };
  
 
  
  // const dispatchNewTotalLimitPackage = (packageOnly) => {
  //   filteredTours.forEach((tour) => {
  //     const itemCart= packageOnly.find(el => el.idProduct === tour.idProduct)

  //       console.log('items del newtotallimitpackage', itemCart)
  //     const amountBought= itemCart.amount
  //     const limitNumber = Number(tour.totalLimit)
  //     const newtotalLimit = (limitNumber - amountBought).toString()
  //     console.log('newtotallimit', newtotalLimit)

  //     const item = {
  //       ...tour,
  //       totalLimit: newtotalLimit
  //     }

  //     console.log("newObj", item, "idProduct", tour.idProduct);

  //     //despachar cada uno
  //     dispatch(put_package(tour.idProduct, item));
  //   });
  // };



  useEffect(() => {
    if (videoEnded) {
      setTimeout(() => {
        setAnimationEnded(true);
      }, 700);
    }
    // dispatch(fetchCities());
    // dispatch(fetchContinents());
    // dispatch(fetchCountries());
    dispatch(fetchPackages());
  }, [videoEnded, dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(userShopping(currentUser.uid)).then(() => {
        setUserShoppingCompleted(true);
      });
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (userShoppingCompleted && idCart && state === 1) {
      dispatch(post_bill(datos))
    }    
  }, [userShoppingCompleted, idCart, state, dispatch]);
  
  // useEffect(() => {
  //   if (billCreated && packageOnly.length > 0){
  //     dispatchNewTotalLimitPackage(packageOnly)
  //   }
  // }, [billCreated])

  return (
    <>
      <div className="bg-verdeFooter">
        <NavBar />
      </div>
      <div className="flex flex-col items-center justify-center w-2/3 mx-auto">
        {videoEnded && animationEnded ? (
          <div className="bg-white p-8 rounded-2xl my-32 first-letter:rounded-xl shadow-lg animate-fade-up animate-once animate-ease-in-out animate-normal">
            <h1 className="text-gray-400 text-2xl mb-6 font-bold text-center">
              Ahora sí...
            </h1>
            <h2 className="text-4xl mb-6 font-bold text-center fontPoppins">
              Prepárate para tu próximo viaje!
            </h2>

            <p className="text-lg text-gray-500 text-center align-middle fontPoppins mb-6">
              Estamos emocionados por tu próxima aventura y queremos felicitarte
              por dar este paso hacia una experiencia inolvidable.
            </p>
            <p className="text-lg text-gray-500 text-center align-middle fontPoppins mb-6">
              Dentro de las próximas 24 horas recibirás un e-mail con los datos
              de tu compra.
            </p>

            <div className="mb-6 text-gray-500 fontPoppins">
              Número de transacción:
              <span className="text-black font-bold ">
                {bill ? " " + bill.idTransaction : null}
              </span>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <a
                href="/search"
                className="bg-verdeFooter text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
              >
                Continúa comprando
              </a>
              <a
                href="/"
                className="text-verdeFooter underline hover:text-green-700 transition duration-300"
              >
                Home
              </a>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={check}
            alt="Landing presentation"
            className={
              videoEnded
                ? "h-auto my-44 rounded-xl w-96 animate-jump-out animate-once animate-duration-1000 animate-ease-linear animate-normal"
                : "h-auto my-44 rounded-xl w-96"
            }
            autoPlay
            muted
            playsInline
            onEnded={() => setVideoEnded(true)}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default PaymentComplete;
