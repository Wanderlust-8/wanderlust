import axios from "axios";

export const TRAER_FACTURAS_COMPRADAS = "TRAER_FACTURAS_COMPRADAS";

const URL = "https://wanderlust-peach.vercel.app";
// const URL = "http://localhost:3002";

export const traerFacturas = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/bill/`);
      const data = response.data;
      return dispatch({
        type: TRAER_FACTURAS_COMPRADAS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
