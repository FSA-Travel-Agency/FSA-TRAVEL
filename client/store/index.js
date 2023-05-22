import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import flightReducer from './flight';
import signUp from './signUp';
import admin from './admin';
import addFlightReducer from './addFlight';
import addCartReducer from './addCart';

const reducer = combineReducers({
  auth,
  flightReducer,
  signUp,
  admin,
  addFlightReducer,
  addCartReducer,
});

//commenting loggermiddle ware if we need it back later
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
// );
//removing logger so there's no console log in deployed
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, middleware);

export default store;
export * from './auth';
