import axios from "axios";

export const SEND_EMAIL = "SEND_EMAIL";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_ERROR = "SEND_EMAIL_ERROR";

const URL = "https://backwanderlust-production-2b66.up.railway.app";
// const URL = "http://localhost:3002";
export const startSendEmail = (name, email, phone, message) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/contact/`, {
        name,
        email,
        phone,
        message,
      });
      const data = response.data;
      dispatch({
        type: SEND_EMAIL_SUCCESS, // Cambiado a SEND_EMAIL_SUCCESS
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: SEND_EMAIL_ERROR, // Manéjalo en tu reducer
        payload: error.message,
      });
    }
  };
};
