import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import activitysReducer from "./Activity/activityReducer";
import airlinesReducer from "./Airlines/airlinesReducer";
import citiesReducer from "./Cities/citiesReducer";
import commentsReducer from "./Comments/commentsReducer";
import continentsReducer from "./Continent/continentReducer";
import countriesReducer from "./Country/countriesReducer";
import hotelsReducer from "./Hotels/hotelsReducer";
import packagesReducer from "./Packages/packagesReducer";
import usersReducer from "./Users/usersReducer";
import shoppingCartReducer from "./ShoppingCart/shoppingCartReducer";
import checkoutReducer from "./Checkout/checkoutReducer";
import compReducer from "./Comprado/compReducer";
import billReducer from "./Dashboard/dashboardReducer";
// import userAdminReducer from "./UserAdmin/userAdminReducer";

const rootReducer = combineReducers({
  packages: packagesReducer,
  comments: commentsReducer,
  cities: citiesReducer,
  countries: countriesReducer,
  continents: continentsReducer,
  airlines: airlinesReducer,
  hotels: hotelsReducer,
  activitys: activitysReducer,
  users: usersReducer,
  carrito: shoppingCartReducer,
  checkout: checkoutReducer,
  comprado: compReducer,
  bills: billReducer,
  // admin: userAdminReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
