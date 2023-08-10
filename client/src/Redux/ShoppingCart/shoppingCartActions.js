import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const CLEAN_CART = "CLEAN_CART";
export const CHECKUSER_SHOPPING = "CHECKUSER_SHOPPING";
export const SAVE_ITEM_DB = "SAVE_ITEM_DB";
export const SET_ITEM = "SET_ITEM";

//agrega el item al estado global
export const add_to_cart = (item) => {
  // console.log("esto es item en add to cart:", item);
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const set_item = (idCart, item) => {
  return async (dispatch) => {
    try {
      await axios.put(`http://localhost:3002/shoppingCar/${idCart}`, item);
      return dispatch({
        type: SET_ITEM,
        payload: item,
      });
    } catch (error) {
      console.log('error', error.message);
    }
  };
};

//trae la info de X carrito
export const userShopping = (uid) => {
  // console.log("uid en ACTION:", uid);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/shoppingCar/user/${uid}`
      );
      const data = response.data;
      // console.log("esto es data de usershopping:", data);
      return dispatch({
        type: CHECKUSER_SHOPPING,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//elimina un item
export const remove_one_from_cart = (item) => {
  // console.log("ESTO ES item en la action DELETE", item);
  const { id } = item;
  // console.log("ESTO ES item en la action DELETE", id);

  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/shoppingCar/item/${id}`
      );
      // console.log("LA RESP DE LA ELIMINACION", response.data);
      return dispatch({
        type: REMOVE_ONE_FROM_CART,
        payload: response.data.ItemsShoppingCars,
      });
    } catch (error) {
      window.alert('No se pudo eliminar el item.')
      // console.log(error);
    }
  };
};

//vacía el carrito
export const clean_cart = (idCart) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3002/shoppingCar/${idCart}`);
      // const data = response.data;
      return dispatch({
        type: CLEAN_CART,
      });
    } catch (error) {
      window.alert('No se pudo vaciar el carrito.')
      console.log(error);
    }
  };
};

