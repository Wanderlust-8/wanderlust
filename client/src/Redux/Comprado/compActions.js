import axios from "axios";

export const TRAER_FACTURAS_COMPRADAS = "TRAER_FACTURAS_COMPRADAS";

export const traerFacturas = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3002/bill/");
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
