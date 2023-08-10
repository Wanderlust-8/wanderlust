import {
  FETCH_CITIES,
  ADD_CITY,
  GET_CITY_BY_ID,
  SEARCH_CITIES,
  GET_CITY_ORIGIN,
  ADD_ORIGIN_CITY,
  FETCH_ORIGIN_CITIES
} from "./citiesActions";

const initialState = {
  citiesList: [],
  originCitiesList:[],
  citiesSearch: [],
  citiesFiltered: [],
  citiesOrigin:[],
  cityDetails: {},
};

const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITIES:
      return {
        ...state,
        citiesList: action.payload,
        citiesFiltered: action.payload,
      };

      case FETCH_ORIGIN_CITIES:
      return {
        ...state,
        originCitiesList: action.payload,
      }

    case ADD_CITY:
      return {
        ...state,
      };

      case ADD_ORIGIN_CITY:
        return {
          ...state,
        };

    case GET_CITY_BY_ID:
      return {
        ...state,
        cityDetails: action.payload,
      };
    case SEARCH_CITIES:
      return {
        ...state,
        citiesSearch: action.payload,
      };

      case GET_CITY_ORIGIN:
        return {
          ...state,
          citiesOrigin: action.payload,
        };
    default:
      return state;
  }
};

export default citiesReducer;
