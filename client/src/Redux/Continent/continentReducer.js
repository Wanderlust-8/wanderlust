import {
  FETCH_CONTINENTS,
  GET_CONTINENT_BY_ID,
  SEARCH_CONTINENTS,
} from "./continentActions";

const initialState = {
  continentsList: [],
  continentsSearch: [],
  continentsFiltered: [],
  continentDetails: {},
};

const continentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTINENTS:
      return {
        ...state,
        continentsList: action.payload,
        continentsFiltered: action.payload,
      };
    case GET_CONTINENT_BY_ID:
      return {
        ...state,
        continentDetails: action.payload,
      };
    case SEARCH_CONTINENTS:
      return {
        ...state,
        continentsSearch: action.payload,
      };
    default:
      return state;
  }
};

export default continentsReducer;
