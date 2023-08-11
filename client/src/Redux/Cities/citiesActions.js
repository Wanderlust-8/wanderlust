import axios from "axios";

export const FETCH_CITIES = "FETCH_CITIES";
export const ADD_CITY = "ADD_CITY";
export const GET_CITY_BY_ID = "GET_CITY_BY_ID";
export const SEARCH_CITIES = "SEARCH_CITIES";
export const GET_CITY_ORIGIN = "GET_CITY_ORIGIN";
export const ADD_ORIGIN_CITY = "ADD_ORIGIN_CITY";
export const FETCH_ORIGIN_CITIES = "FETCH_ORIGIN_CITIES";

const URL = "https://wanderlust-drab.vercel.app";
// const URL = "http://localhost:3002";

export const fetchCities = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/cities`);
      const data = response.data;
      return dispatch({
        type: FETCH_CITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchOriginCities = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/cities-origins`);
      const data = response.data;
      return dispatch({
        type: FETCH_ORIGIN_CITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addCities = (newCity) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/cities`, newCity);
      const data = response.data;
      return dispatch({
        type: ADD_CITY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCityById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/cities/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_CITY_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchCities = (word) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/cities?title=${word}`);
      const data = response.data;
      return dispatch({
        type: SEARCH_CITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCityOrigin = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/cities-origins`);
      const data = response.data;
      return dispatch({
        type: GET_CITY_ORIGIN,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addOriginCity = (newCity) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/cities-origins`, newCity);
      const data = response.data;
      return dispatch({
        type: ADD_ORIGIN_CITY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
