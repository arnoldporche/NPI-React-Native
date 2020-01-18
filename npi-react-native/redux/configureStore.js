import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { individuals } from "./individuals";
import { comments } from "./comments";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers(individuals, comments),
    applyMiddleware(thunk, logger)
  );

  return store;
};
