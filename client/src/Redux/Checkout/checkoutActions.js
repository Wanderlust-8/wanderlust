import axios from "axios";

export const POST_BILL = "POST_BILL";
export const CREATE_ORDER = "CREATE_ORDER";
export const GET_ALL_BILLS = "GET_ALL_BILLS";
export const CREATE_ITINERARY = "CREATE_ITINERARY";

const URL = "https://wanderlust-peach.vercel.app";
// const URL = "http://localhost:3002";

//crear la factura
export const post_bill = (datos) => {
  // console.log('el idCart en action', datos)
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/bill/`, datos);
      const data = response.data;
      console.log("la factura", data);

      return dispatch({
        type: POST_BILL,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

//crea la orden de pago
export const create_order = (order) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/payment/create-order`, order);
      const paymentLink = response.data;

      window.location.href = paymentLink;

      return dispatch({
        type: CREATE_ORDER,
        payload: paymentLink,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const get_all_bills = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/bill/`);
      const data = response.data;
      console.log("all bills", data);

      return dispatch({
        type: GET_ALL_BILLS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const create_itinerary = (info) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/itinerary/`, info);
      const data = response.data;
      console.log("res action itinerario", data);
      return dispatch({
        type: CREATE_ITINERARY,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
