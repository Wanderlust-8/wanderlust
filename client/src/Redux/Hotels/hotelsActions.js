import axios from "axios";

export const FETCH_HOTELS = "FETCH_HOTELS";
export const ADD_HOTEL = "ADD_HOTEL";
export const GET_HOTEL_BY_ID = "GET_HOTEL_BY_ID";
export const SEARCH_HOTELS = "SEARCH_HOTELS";

export const fetchHotels = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3002/hotels");
      const data = response.data;
      return dispatch({
        type: FETCH_HOTELS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addHotels = (newHotel) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/hotels",
        newHotel
      );
      const data = response.data;
      return dispatch({
        type: ADD_HOTEL,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getHotelById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3002/hotels/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_HOTEL_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchHotels = (word) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:3002/hotels?title=${word}"
      );
      const data = response.data;
      return dispatch({
        type: SEARCH_HOTELS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
