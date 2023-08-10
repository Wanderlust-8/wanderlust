import {
  FETCH_HOTELS,
  ADD_HOTEL,
  GET_HOTEL_BY_ID,
  SEARCH_HOTELS,
} from "./hotelsActions";

const initialState = {
  hotelsList: [],
  hotelsSearch: [],
  hotelsFiltered: [],
  hotelDetails: {},
};

const hotelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOTELS:
      return {
        ...state,
        hotelsList: action.payload,
        hotelsFiltered: action.payload,
      };
    case ADD_HOTEL:
      return {
        ...state,
      };
    case GET_HOTEL_BY_ID:
      return {
        ...state,
        hotelDetails: action.payload,
      };
    case SEARCH_HOTELS:
      return {
        ...state,
        hotelsSearch: action.payload,
      };
    default:
      return state;
  }
};

export default hotelsReducer;
