import {
  ADD_ACTIVITY,
  FETCH_ACTIVITYS,
  GET_ACTIVITY_BY_ID,
  SEARCH_ACTIVITYS,
  ADD_ACTIVITYS
} from "./activityActions";

const initialState = {
  activitysList: [],
  activitysSearch: [],
  activitysFiltered: [],
  activityDetails: {},
};

const activitysReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITYS:
      return {
        ...state,
        activitysList: action.payload,
        activitysFiltered: action.payload,
      };
    case ADD_ACTIVITY:
      return {
        ...state,
      };
      case ADD_ACTIVITYS:
        return{
          ...state,
        }
    case GET_ACTIVITY_BY_ID:
      return {
        ...state,
        activityDetails: action.payload,
      };
    case SEARCH_ACTIVITYS:
      return {
        ...state,
        activitysSearch: action.payload,
      };
    default:
      return state;
  }
};

export default activitysReducer;
