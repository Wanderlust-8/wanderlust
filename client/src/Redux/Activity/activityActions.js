import axios from "axios";

export const FETCH_ACTIVITYS = "FETCH_ACTIVITYS";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const GET_ACTIVITY_BY_ID = "GET_ACTIVITY_BY_ID";
export const SEARCH_ACTIVITYS = "SEARCH_ACTIVITYS";
export const ADD_ACTIVITYS = "ADD_ACTIVITYS";

const URL = "https://backwanderlust-production-2b66.up.railway.app";
// const URL = "http://localhost:3002";

export const fetchActivitys = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/activity`);
      const data = response.data;
      return dispatch({
        type: FETCH_ACTIVITYS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addActivity = (newActivity) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/activity`, newActivity);
      const data = response.data;
      return dispatch({
        type: ADD_ACTIVITY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addActivities = (newActivities) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/activity/massive`,
        newActivities
      );
      const data = response.data;
      return dispatch({
        type: ADD_ACTIVITYS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getActivityById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/activity/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_ACTIVITY_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


