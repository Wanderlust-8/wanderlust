import axios from "axios";

export const FETCH_COMENTS = "FETCH_COMENTS";
export const ADD_COMENT = "ADD_COMENT";
export const GET_COMENT_BY_ID = "GET_COMENT_BY_ID";
export const SEARCH_COMENTS = "SEARCH_COMENTS";
export const GET_COMENT_BY_PACKAGE = "GET_COMENT_BY_PACKAGE";

const URL = "https://wanderlust-drab.vercel.app";
// const URL = "http://localhost:3002";

//obtiene todos los coments
export const fetchComents = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/comments/`);
      const data = response.data;
      return dispatch({
        type: FETCH_COMENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//crea un coment
export const addComents = (newComent) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/comments/`, newComent);
      const data = response.data;
      return dispatch({
        type: ADD_COMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//trae un coment por id
export const getComentById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/comments/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_COMENT_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//traer todos los coments de un mismo paquete
export const getComentByPackage = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/comments/package/${id}`);
      const data = response.data;
      console.log("coment en action", data);

      return dispatch({
        type: GET_COMENT_BY_PACKAGE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchComents = (word) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/coments?title=${word}`);
      const data = response.data;
      return dispatch({
        type: SEARCH_COMENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
