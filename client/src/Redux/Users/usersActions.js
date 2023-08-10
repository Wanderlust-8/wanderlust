import axios from "axios";
import { userShopping } from "../ShoppingCart/shoppingCartActions";
export const FETCH_USERS = "FETCH_USERS";
export const ADD_USER = "ADD_USER";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const SEARCH_USERS = "SEARCH_USERS";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";
export const ADDUSER_SHOPPING = "USER_SHOPPING";
export const CHECKUSER_SHOPPING = "CHECKUSER_SHOPPING";
export const NEW_CART = "NEW_CART";

// export const userShopping = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3002/shoppingCar/user/${id}`
//       );
//       const data = response.data;
//       return dispatch({
//         type: CHECKUSER_SHOPPING,
//         payload: data.ItemsShoppingCars,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3002/users");
      const data = response.data;
      return dispatch({
        type: FETCH_USERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUser = (newUser) => {
  return async (dispatch) => {
    try {
      //console.log("ESTO ES USER:", newUser);
      const userResponse = await axios.post(
        "http://localhost:3002/users",
        newUser
      );
      const user = userResponse.data;

      dispatch({
        type: ADD_USER,
        payload: user,
      });
      const cartResponse = await axios.post(
        `http://localhost:3002/shoppingCar/user/${user.uid}`
      );
      dispatch(userShopping(user.uid));
      //   const response = await axios.get(
      //   `http://localhost:3002/shoppingCar/user/${user.id}`
      // );   const data = response.data;
      // console.log("esto es data de action:", data);
      // dispatch({
      //   type:CHECKUSER_SHOPPING,
      //   payload:

      // console.log("CARTTTT:", cart);
      // dispatch({
      //   type: NEW_CART,
      //   payload: cart,
      // });
      // console.log("CARTTTTT:", cart);
      return user;
    } catch (error) {
      console.log("EL ERROR::: ", error);
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3002/users/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_USER_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchUsers = (word) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/users?title=${word}`
      );
      const data = response.data;
      return dispatch({
        type: SEARCH_USERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`http://localhost:3002/users/${id}`);
      const data = response.data;
      return dispatch({
        type: DELETE_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editUser = (uid, user) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/users/${uid}`,
        user
      );
      const data = response.data;
      console.log("LO QUE SE GUARDA EN EL ESTADO", data.user);
      return dispatch({
        type: EDIT_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3002/users");
      const data = response.data;

      const user = data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        return dispatch({
          type: LOGIN_USER,
          payload: user,
        });
      } else {
        throw new Error("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: error.message,
      });
    }
  };
};
