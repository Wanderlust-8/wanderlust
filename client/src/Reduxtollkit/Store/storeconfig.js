import { configureStore } from "@reduxjs/toolkit";

import airlinesReducer from "../airlinesSlice";
import citiesReducer from "../citiesSlice";
import commentsReducer from "../commentsSlice";
import continentsReducer from "../continentsSlice";
import countriesReducer from "../countriesSlice";
import typepackagesReducer from "../typepackagesSlice";
import usersReducer from "../usersSlice";
import hotelsreducer from "../hotelsSlice";
import packagesReducer, { searchReducer } from "../packagesSlice";
import activitysReducer from "../activitysSlice";



export const store = configureStore({
  reducer: {
    packages: packagesReducer,
    users: usersReducer,
    comments: commentsReducer,
    cities: citiesReducer,
    countries: countriesReducer,
    continents: continentsReducer,
    typepackages: typepackagesReducer,
    airlines: airlinesReducer,
    search: searchReducer,
    hotels: hotelsreducer,
    activitys: activitysReducer,
  },
});

export default store;
