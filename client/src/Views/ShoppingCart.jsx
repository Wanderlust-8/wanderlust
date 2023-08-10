import React, { useContext, useEffect} from "react";

import { authContext } from "../Context/authContext";
import { useNavigate, Link} from "react-router-dom";
import CartItem from "../Components/CartItem";
import NavBar from "../Components/NavBar";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  clean_cart,
  userShopping,
} from "../Redux/ShoppingCart/shoppingCartActions";
import {
  AiOutlineCheckCircle,
  AiOutlineShopping,
  AiOutlineDelete,
} from "react-icons/ai";
// import { selectCartTotal } from "../Redux/ShoppingCart/shoppingCartActions";

const ShoppingCart = () => {
  const { currentUser } = useContext(authContext);
  let cartItems = useSelector((state) => state.carrito.cart);
  // const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let localStorageItems = JSON.parse(localStorage.getItem("carrito"));

  const items = currentUser ? cartItems : localStorageItems || [];
  console.log('los items', items)

  

  useEffect(() => {
    if (currentUser) {
      dispatch(userShopping(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  const idCart = useSelector((state) => state.carrito.idCart);


  //
  // console.log("STO ES cartItems DESDE SHOPING CART ", cartItems);

  function clearCart() {
    if(items.length > 0) {
      const userConfirm = window.confirm(
        "Se eliminará todo el contenido del carrito. Quieres continuar?"
      );
      if (userConfirm && !currentUser) {
        localStorage.clear("carrito");
        toast.success("El carrito fue vaciado con éxito.");
        navigate("/shoppingCart");
      }
      if (userConfirm && currentUser) {
        dispatch(clean_cart(idCart))
          toast.success("El carrito fue vaciado con éxito.");
          navigate("/shoppingCart");
      } else return;
    }
  }

  function calculateTotal(items) {
    if (!items) {
      return 0;
    } else {
      const total = items?.reduce((acc, el) => {
        return acc + (el.unitPrice || 0) * (el.amount || 1);
      }, 0);
      return total;
    }
  }

  // console.log('current user' , currentUser)

  function handlePayment() {
    if (items.length === 0) {
      window.alert("Oops! Tu carrito está vacío.");
      return;
    }
  
    if (currentUser === null) {
      navigate("/login")
    }
    else {
      navigate("/checkout");
    }
  }
  


  return (
    <div>
      <div className="bg-verdeFooter ">
        <NavBar />
      </div>
      <div className="container mx-auto mt-5 px-5">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-4">
            {items?.map((el, index) => (
              <CartItem
                key={index}
                item={el}
                cart={idCart}
                amount={el.amount}
               
              />
            ))}
            <div className="flex justify-between items-center mt-5">
              <Link
                to="/search"
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-4 rounded flex items-center transition-colors duration-300"
              >
                <AiOutlineShopping className="mr-2" />
                Seguir comprando
              </Link>
              <button
                onClick={() => {
                  clearCart();
                }}
                className="text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center transition-colors duration-300"
              >
                <AiOutlineDelete className="mr-2" />
                Vaciar carrito
              </button>
            </div>
          </div>

          <div className="col-span-1">
            <div className="border border-gray-200 rounded p-4">
              <h1 className="text-lg font-bold mb-4">Resumen de compra</h1>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>$ {calculateTotal(items)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Impuestos (10%)</span>
                <span>$ {(calculateTotal(items) * 0.1).toFixed(2)}</span>
              </div>
              <hr className="border-t border-gray-200" />
              <div className="flex justify-between mt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  $ {(calculateTotal(items) * 1.1).toFixed(2)}
                </span>
              </div>
              
                <button
                  onClick={()=>{handlePayment()}}
                  className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 mt-5 w-full rounded flex items-center justify-center transition-colors duration-300"
                >
                  <AiOutlineCheckCircle className="mr-2" />
                  Completar el pago
                </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
