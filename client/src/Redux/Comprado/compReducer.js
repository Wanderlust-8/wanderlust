// import { startOfMinute } from "date-fns";
import { TRAER_FACTURAS_COMPRADAS } from "./compActions";

const initialState = {
  comprados: [],
};

const compReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRAER_FACTURAS_COMPRADAS:
      return {
        ...state,
        comprados: action.payload,
      };
    default:
      return state;
  }
};
export default compReducer;
