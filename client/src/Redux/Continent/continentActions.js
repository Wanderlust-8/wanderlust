import axios from "axios";

export const FETCH_CONTINENTS = "FETCH_CONTINENTS";
export const GET_CONTINENT_BY_ID = "GET_CONTINENT_BY_ID";
export const SEARCH_CONTINENTS = "SEARCH_CONTINENTS";

// const URL = "https://wanderlust-7ihj.vercel.app";
const URL = "http://localhost:3002";

export const fetchContinents = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/continents/`);
      const data = response.data;
      console.log("continents en action", data);
      return dispatch({
        type: FETCH_CONTINENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getContinentById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/continents/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_CONTINENT_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchContinents = (word) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/continents?title=${word}`);
      const data = response.data;
      return dispatch({
        type: SEARCH_CONTINENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
