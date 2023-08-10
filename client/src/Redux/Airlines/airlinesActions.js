import axios from "axios";

export const FETCH_AIRLINES = "FETCH_AIRLINES";
export const ADD_AIRLINE = "ADD_AIRLINE";
export const GET_AIRLINE_BY_ID = "GET_AIRLINE_BY_ID";
export const SEARCH_AIRLINES = "SEARCH_AIRLINES";

export const fetchAirlines = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3002/airlines");
      const data = response.data;
      return dispatch({
        type: FETCH_AIRLINES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAirline = (newAirline) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/airlines",
        newAirline
      );
      const data = response.data;
      return dispatch({
        type: ADD_AIRLINE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAirlineById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3002/airlines/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_AIRLINE_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchAirlines = (word) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/airlines?title=${word}`
      );
      const data = response.data;
      return dispatch({
        type: SEARCH_AIRLINES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
