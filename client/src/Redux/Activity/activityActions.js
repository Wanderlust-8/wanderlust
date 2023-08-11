import axios from "axios";

export const FETCH_ACTIVITYS = "FETCH_ACTIVITYS";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const GET_ACTIVITY_BY_ID = "GET_ACTIVITY_BY_ID";
export const SEARCH_ACTIVITYS = "SEARCH_ACTIVITYS";
export const ADD_ACTIVITYS = "ADD_ACTIVITYS";

const URL = "https://wanderlust-peach.vercel.app";
// const URL = "http://localhost:3002";

export const fetchActivitys = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/activitys`);
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
      const response = await axios.post(`${URL}/activitys`, newActivity);
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
      const response = await axios.get(`${URL}/activitys/${id}`);
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

export const searchActivitys = (word) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL}/activitys?title=${encodeURIComponent(word)}`
      );
      const data = response.data;
      return dispatch({
        type: SEARCH_ACTIVITYS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
