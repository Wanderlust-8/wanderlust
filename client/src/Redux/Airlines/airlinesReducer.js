import {
  FETCH_AIRLINES,
  ADD_AIRLINE,
  GET_AIRLINE_BY_ID,
  SEARCH_AIRLINES,
} from "./airlinesActions.js";

const initialState = {
  airlinesList: [],
  airlinesSearch: [],
  airlinesFiltered: [],
  airlineDetails: {},
};

const airlinesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AIRLINES:
      return {
        ...state,
        airlinesList: action.payload,
        airlinesFiltered: action.payload,
      };
    case ADD_AIRLINE:
      return {
        ...state,
      };
    case GET_AIRLINE_BY_ID:
      return {
        ...state,
        airlineDetails: action.payload,
      };
    case SEARCH_AIRLINES:
      return {
        ...state,
        airlinesSearch: action.payload,
      };
    default:
      return state;
  }
};

export default airlinesReducer;
