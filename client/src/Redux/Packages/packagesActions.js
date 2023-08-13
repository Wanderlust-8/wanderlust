import axios from "axios";
import diacritics from "diacritics";
export const FETCH_PACKAGES = "FETCH_PACKAGES";
export const ADD_PACKAGE = "ADD_PACKAGE";
export const GET_PACKAGE_BY_ID = "GET_PACKAGE_BY_ID";
export const SEARCH_PACKAGES = "SEARCH_PACKAGES";
export const CLEAR_PACKAGE_DETAILS = "CLEAR_PACKAGE_DETAILS";
export const SET_CITY_FILTER = "SET_CITY_FILTER";
export const SET_DURATION_FILTER = "SET_DURATION_FILTER";
export const SET_PRICE_FILTER = "SET_PRICE_FILTER";
export const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
export const CLEAR_SEARCH_VIEW = "CLEAR_SEARCH_VIEW";
export const RESET = "RESET";
export const SET_PRICE_RANGE_FILTER = "SET_PRICE_RANGE_FILTER";
export const SET_CLEAR_PRICE_RANGE_FILTER = "SET_CLEAR_PRICE_RANGE_FILTER";
export const SET_ORIGIN_CITY_FILTER = "SET_ORIGIN_CITY_FILTER";
export const FETCH_ORIGIN_CITIES = "FETCH_ORIGIN_CITIES";
export const PUT_PACKAGE = "PUT_PACKAGE";
export const SEARCH_PACKAGES_ADMIN = "SEARCH_PACKAGES_ADMIN";
export const FULL_PACKAGE = "FULL_PACKAGE";

// const URL = "https://wanderlust-7ihj.vercel.app";
const URL = "http://localhost:3002";

export const fetchPackages = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/packages`);
      const data = response.data;
      return dispatch({
        type: FETCH_PACKAGES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPackages = (newPackage) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/packages`, newPackage);
      const data = response.data;
      return dispatch({
        type: ADD_PACKAGE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPackageById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/packages/${id}`);
      const data = response.data;

      return dispatch({
        type: GET_PACKAGE_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchOriginCities = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/cities-origins`);
      const data = response.data;
      return dispatch({
        type: FETCH_ORIGIN_CITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchallPackages = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/packages/all`);
      const data = response.data;
      return dispatch({
        type: FULL_PACKAGE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const SearchPackagesByCountry = (country) => {
  return async (dispatch, getState) => {
    try {
      const { packagesList } = getState().packages;
      const searchQuery = diacritics.remove(country.toLowerCase());

      // Realizar la búsqueda local por país
      const searchResult = packagesList.filter((pkg) =>
        diacritics.remove(pkg.Country.name.toLowerCase()).includes(searchQuery)
      );

      // Si hay una consulta de búsqueda, actualizamos los resultados de búsqueda
      if (searchQuery) {
        dispatch({
          type: SEARCH_PACKAGES,
          payload: searchResult,
        });
      } else {
        // Si no hay consulta de búsqueda, restablecemos los resultados de búsqueda a un array vacío
        dispatch({
          type: SEARCH_PACKAGES,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearPackageDetails = () => {
  return {
    type: CLEAR_PACKAGE_DETAILS,
  };
};

export const clearSearchView = (isUnmounting) => {
  return {
    type: CLEAR_SEARCH_VIEW,
    isUnmounting,
  };
};

export const FilterPackagesByCity = (payload) => {
  return {
    type: SET_CITY_FILTER,
    payload,
  };
};

export const FilterPackagesByOriginCity = (payload) => {
  return {
    type: SET_ORIGIN_CITY_FILTER,
    payload,
  };
};

export const setDurationFilter = (payload) => ({
  type: SET_DURATION_FILTER,
  payload,
});

export const setPriceFilter = (payload) => ({
  type: SET_PRICE_FILTER,
  payload,
});

export const setPriceRangeFilter = (payload) => ({
  type: SET_PRICE_RANGE_FILTER,
  payload,
});

export const setClearPriceRangeFilter = (payload) => ({
  type: SET_CLEAR_PRICE_RANGE_FILTER,
  payload,
});

export function reset() {
  return { type: RESET };
}

export const put_package = (idProduct, item) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL}/packages/${idProduct}`, item);
      const data = response.data;
      console.log(data);
      return dispatch({
        type: PUT_PACKAGE,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const searchPackagesAdmin = (searchTerm) => ({
  type: SEARCH_PACKAGES_ADMIN,
  payload: searchTerm,
});
