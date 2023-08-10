import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authContext } from "../Context/authContext";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import {
  remove_one_from_cart,
  set_item,
} from "../Redux/ShoppingCart/shoppingCartActions";
import { fetchPackages } from "../Redux/Packages/packagesActions";



const CartItem = (props) => {
  const { item, amount} = props;
  const { currentUser } = useContext(authContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentAmount, setCurrentAmount] = useState(amount);
  const [totalPriceState, setTotalPrice] = useState(1);
  const idCart = useSelector((state) => state.carrito.idCart);
  const allpackages = useSelector((state) => state.packages.packagesList)

  const tour = allpackages && allpackages.find(el => el.id === item.idProduct)
  const totallimit = tour ? tour.totalLimit.toString() : "20"
  console.log('tour', tour)



  useEffect(() => {
    //captura el amount del LS y setea el input
    const storedAmount = localStorage.getItem("itemAmount_" + item.idProduct);
    if (storedAmount) {
      setCurrentAmount(parseInt(storedAmount));
      setTotalPrice(parseInt(item.unitPrice) * parseInt(storedAmount));
    }
  }, [item.idProduct, item.amount, item.unitPrice]);


  useEffect(() => {
      dispatch(fetchPackages())
  },[dispatch])


  //chequea que haya props, sino rompe.
  if (!item) {
    return <div>Cargando...</div>;
  }

  function handleAmountChange(idCart, itemToUpdate) {
    const numero = Number(item.unitPrice);
    // console.log("numerio", numero);
    if (currentUser) {
      dispatch(
        set_item(idCart, {
          amount: currentAmount,
          unitPrice: numero,
          totalPrice: numero * currentAmount,
          typeProduct: item.typeProduct,
          idProduct: item.idProduct,
          title: item.title,
          image: item.image,
        })
      );
    } else {
      const localStorageJSON = localStorage.getItem("carrito");
      let storedItems = [];

      if (localStorageJSON !== null) {
        storedItems = JSON.parse(localStorageJSON);
      }

      const findItem = storedItems.find(
        (el) => el.idProduct === itemToUpdate.idProduct
      );

      if (findItem) {
        findItem.amount = currentAmount;
        localStorage.setItem("itemAmount_" + item.idProduct, currentAmount);
        findItem.totalPrice = totalPriceState;
        const updatedItemsJSON = JSON.stringify(storedItems);
        localStorage.setItem("carrito", updatedItemsJSON);
      }
    }
  }

  //maneja el input de cantidad.
  const handleChange = (e) => {
    const newAmount = parseInt(e.target.value);
    const total = parseInt(item.unitPrice * newAmount);
    setCurrentAmount(newAmount);
    setTotalPrice(total);
    handleAmountChange(idCart, item);
    
  };

  const handleBlur = () => {
    handleAmountChange(idCart, item);
  };

  function clearItem(itemToRemove) {
    const userConfirm = window.confirm(
      "Se eliminará este item del carrito, quieres continuar?"
    );

    if (userConfirm && !currentUser) {
      let localStorageJSON = localStorage.getItem("carrito");
      let storedItems = [];
      if (localStorageJSON !== null) {
        storedItems = JSON.parse(localStorageJSON);
      }

      // console.log('item a remover', storedItems)

      const filteredCart = storedItems.filter(
        (item) => item.idProduct !== itemToRemove.idProduct
      );

      localStorage.clear("itemAmount_" + item.idProduct);
      const updatedItemsJSON = JSON.stringify(filteredCart);
      localStorage.setItem("carrito", updatedItemsJSON);
      toast.success("Item eliminado.");
      navigate("/shoppingCart");
    } else if (userConfirm && currentUser) {
      dispatch(remove_one_from_cart(item));
      toast.success("Item eliminado.");
      navigate("/shoppingCart");
    } else return;
  }

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 m-4">
      <div className="flex items-center justify-between border-b-2 border-gray-200 py-4">
        {/* Agregué un contenedor para la imagen y el título del producto */}
        <Link to={`/detail/${item.idProduct}`}>
          <div className="flex items-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <h2 className="text-lg">{item.title}</h2>
          </div>
        </Link>

        {/* Agregué un contenedor para la cantidad y el precio */}
        <div className="flex items-center">
          <div className="mr-4">
            <label className="block text-sm">Cantidad:</label>
            <input
              type="number"
              min="1"
              max={totallimit}
              name="amount"
              value={currentAmount}
              onChange={(event) => handleChange(event)}
              onBlur={handleBlur}
              
              className="w-16 mt-1 border rounded-md p-1"
            />
          </div>
          <div>
            <p className="text-sm">Precio:</p>
            <p className="text-lg font-semibold">USD {item.unitPrice}</p>
          </div>
        </div>

        {/* Botón de eliminar */}
        <button
          className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
          onClick={() => clearItem(item)}
        >
          <FiTrash2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
