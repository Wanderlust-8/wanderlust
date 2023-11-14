import axios from "axios";

export const FETCH_COUNTRIES = "FETCH_COUNTRIES";
export const ADD_COUNTRY = "ADD_COUNTRY";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";

const URL = "https://wanderlust-coral.vercel.app";
// const URL = "http://localhost:3002";

export const fetchCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/countries`);
      const data = response.data;
      return dispatch({
        type: FETCH_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addCountries = (newCountry) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/countries`, newCountry);
      const data = response.data;
      return dispatch({
        type: ADD_COUNTRY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCountryById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/countries/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_COUNTRY_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchCountries = (word) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/countries?title=${word}`);
      const data = response.data;
      return dispatch({
        type: SEARCH_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
