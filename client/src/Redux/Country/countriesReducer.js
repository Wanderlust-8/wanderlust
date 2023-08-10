import {
  FETCH_COUNTRIES,
  ADD_COUNTRY,
  GET_COUNTRY_BY_ID,
  SEARCH_COUNTRIES,
} from "./countriesActions";

const initialState = {
  countriesList: [],
  countriesSearch: [],
  countriesFiltered: [],
  countryDetails: {},
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES:
      return {
        ...state,
        countriesList: action.payload,
        countriesFiltered: action.payload,
      };
    case ADD_COUNTRY:
      return {
        ...state,
      };
    case GET_COUNTRY_BY_ID:
      return {
        ...state,
        countryDetails: action.payload,
      };
    case SEARCH_COUNTRIES:
      return {
        ...state,
        countriesSearch: action.payload,
      };
    default:
      return state;
  }
};

export default countriesReducer;
