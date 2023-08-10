import axios from "axios";

export const FETCH_COUNTRIES = "FETCH_COUNTRIES";
export const ADD_COUNTRY = "ADD_COUNTRY";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";

export const fetchCountries = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3002/countries");
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
      const response = await axios.post(
        "http://localhost:3002/countries",
        newCountry
      );
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
      const response = await axios.get(`http://localhost:3002/countries/${id}`);
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
      const response = await axios.get(
        "http://localhost:3002/countries?title=${word}"
      );
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
