import React, { useEffect, useContext } from "react";
import { authContext } from "../Context/authContext";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPackageById,
  clearPackageDetails,
} from "../Redux/Packages/packagesActions";
// import { fetchComents } from "../Redux/Comments/commentsActions";
import { fetchAirlines } from "../Redux/Airlines/airlinesActions";
import { fetchHotels } from "../Redux/Hotels/hotelsActions";
import Flights from "../Components/Flights";
import Hotels from "../Components/Hotels";
import Activities from "../Components/Activities";
import Review from "../Components/Review";
import NavBar from "../Components/NavBar";
import { userShopping } from "../Redux/ShoppingCart/shoppingCartActions";
// import { AiFillCloseCircle } from "react-icons/ai";

function Detail() {
  const { currentUser } = useContext(authContext);
  const { id } = useParams();

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const tour = useSelector((state) => state.packages.packageDetails);
  const idCart = useSelector((state) => state.carrito.idCart);
  const car = useSelector((state) => state.carrito.cart);

  console.log('tour', tour)
  // console.log("EL ID", idCart);
  // console.log("EL CART DE MIERDA ", car);
  // console.log('comments', comments)

  // console.log('eltour', tour)
  // const coment = comments ? comments: "desconocido";

  // console.log('el coment', coment)

  //reviews
  // const reviewData = comments ? comments : "Desconocido";

  //hotelInfo
  const hotels = useSelector((state) => state.hotels.hotelsList);
  const hotel = hotels.find((el) => el.id === tour.idHotel);
  const hotelData = hotel ? hotel : "Desconocido";
  // console.log("hotel", hotelData);

  const tipoPaquete = tour.TypePackage ? tour.TypePackage.name : "Desconocido";
  // console.log(tipoPaquete)

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPackageById(id));
    dispatch(fetchAirlines());
    dispatch(fetchHotels());
    // dispatch(getComentByPackage(id))
    // dispatch(fetchComents())

    if (currentUser) {
      dispatch(userShopping(currentUser.uid));
    }
    // dispatch(fetchComments())
    return () => {
      dispatch(clearPackageDetails());
    };
  }, [id, dispatch, currentUser]);

  // item para guardar en el carrito
  const item = {
    amount: 1,
    unitPrice: tour.standarPrice,
    totalPrice: tour.standarPrice,
    typeProduct: 1,
    idProduct: tour.id,
    title: tour.title,
    image: tour.image,
  };

  //agregar items al localStorage
  function addNewItem(item) {
    let localStorageJSON = localStorage.getItem("carrito");
    localStorage.setItem("itemAmount_" + item.idProduct, item.amount);
    // console.log('JSON', localStorageJSON)
    let storedItems = [];
    if (localStorageJSON !== null) {
      storedItems = JSON.parse(localStorageJSON); //convierte a JS
      // console.log("js", storedItems);
    }
    storedItems.push(item);
    const updatedItemsJSON = JSON.stringify(storedItems);
    // console.log("asi queda el json final", updatedItemsJSON);
    localStorage.setItem("carrito", updatedItemsJSON); //lo convierte a json
    // console.log("js", storedItems);
  }

  //! german
  async function guardarEnBDD(parametro) {
    // console.log("item desde actvity", parametro);
    if (idCart) {
      await fetch(
        `http://localhost:3002/shoppingCar/${idCart}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parametro),
        }
      );
      //      console.log(response1);
    }
  }

  function changeNavigate(parametro) {
    if (currentUser) {
      // console.log("EsTO ES CURRENTUSER:", currentUser);
      if (!car.some((el) => el.idProduct === item.idProduct)) {
        guardarEnBDD(parametro);
        dispatch(userShopping(currentUser.uid));
      } else {
        guardarEnBDD({ ...parametro, amount: parametro.amount + 1 });
        dispatch(userShopping(currentUser.uid));
      }
    } else {
      addNewItem(parametro);
      // console.log('detail', localStorage)
    }
  }

 
  if (!tour.id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-verdeFooter text-3xl font-bold">Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-verdeFooter">
        <NavBar />
      </div>

      <div className="w-full h-80 relative">
        {!tour.image ? <h2 className="text-2xl fontPoppin font-bold text-verdeFooter inline-flex mt-20">Cargando...</h2>
        :
        <img
          src={tour.image}
          className="w-full h-full object-cover"
          alt="tour"
        />
        
      }

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl text-white font-bold">{tour.title}</h1>
        </div>
      </div>

      <div className="container mx-auto p-4 m-2 lg:w-2/3 sm:w-full">
        <div className="fontPoppins mt-6">
          <p className="text-lg text-left">{tour.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 fontPoppins mt-6">
          <Flights tour={tour} />

          <div className="text-right w-full flex flex-col justify-between bg-white mt-4 p-4 rounded-lg shadow-xl">
            <h2 className="text-base">{tour.duration} días en {tour.City.name}</h2>
            <h2 className="text-base">Salida el {tour.initialDate.split("/").reverse().join("/")}</h2>
            {tour.CityOrigin ? (
              <h2 className="text-base">desde {tour.CityOrigin.name} </h2>
            ) : null}
           
            {Number(tour.qualification) !== 0 ?
            <h2 className="text-base">
              Calificación de otros viajeros: {tour.qualification}
            </h2>
            :  <h2 className="text-base">
            Aún no tiene calificación.
          </h2>
          }
            <h2 className="text-lg font-semibold mt-6 ">
              USD {tour.standarPrice} -{tipoPaquete}-
              </h2>
              <h2 className="text-xs">Incluye {tour.service}</h2>
            <h2 className="text-base mb-8">
              Cupos disponibles: {tour.totalLimit}
            </h2>

            <div>
              <button
                onClick={() => {
                  changeNavigate(item);
                  toast.success("Has agregado un paquete al carrito.");
                }}
                className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded w-full font-semibold"
              >
                AGREGAR AL CARRITO
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Hotels hotel={hotelData} />
        </div>

        <hr className="mt-8"></hr>

        <Activities activity={tour} />

        <hr className="mt-8"></hr>

        <Review tour={tour} />
      </div>

      <Footer />
    </>
  );
}

export default Detail;
