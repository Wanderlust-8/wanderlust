import axios from "axios";
export const FETCH_BILLS_REQUEST = 'FETCH_BILLS_REQUEST';
export const FILTER_SALES_BY_PRODUCTS = "FILTER_SALES_BY_PRODUCTS";



// Acción para obtener las facturas desde la base de datos
export const fetchBills = () => {
  return async (dispatch) => {
    try {

      const response = await axios.get("http://localhost:3002/bill");
      const data = await response.data;
      return dispatch({
        type: FETCH_BILLS_REQUEST,
        payload: data
      })


    } catch (error) {
      
      console.log(error)
    }
  };
};


export const filterSalesByProducts = () => {
  return async (dispatch) => {
    try {

      const response = await axios.get("http://localhost:3002/bill");
      const data = await response.data;
      return dispatch({
        type: FILTER_SALES_BY_PRODUCTS,
        payload: data
      })


    } catch (error) {
      
      console.log(error)
    }
  };
};

