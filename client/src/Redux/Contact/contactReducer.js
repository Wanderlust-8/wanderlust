import {
  SEND_EMAIL,
  SEND_EMAIL_ERROR,
  SEND_EMAIL_SUCCESS,
} from "./contactActions";

const initialState = {
  email: {},
  error: null,
  loading: false,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_EMAIL:
      return {
        ...state,
        loading: true,
      };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        email: action.payload,
      };
    case SEND_EMAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
