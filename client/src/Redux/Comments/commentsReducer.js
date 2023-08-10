// import { startOfMinute } from "date-fns";
import {
  FETCH_COMENTS,
  ADD_COMENT,
  GET_COMENT_BY_ID,
  SEARCH_COMENTS,
  GET_COMENT_BY_PACKAGE,
} from "./commentsActions";

const initialState = {
  comentsList: [],
  comentsSearch: [],
  comentsFiltered: [],
  comentsByPackage: [],
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMENT_BY_PACKAGE:
      return {
        ...state,
        comentsByPackage: action.payload
      }
    case FETCH_COMENTS:
      return {
        ...state,
        comentsList: action.payload,
        comentsFiltered: action.payload,
      };
    case ADD_COMENT:
      return {
        ...state,
      };
    case GET_COMENT_BY_ID:
      return {
        ...state,
        comentsDetails: action.payload,
      };
    case SEARCH_COMENTS:
      return {
        ...state,
        comentsSearch: action.payload,
      };
    default:
      return state;
  }
};

export default commentsReducer;
