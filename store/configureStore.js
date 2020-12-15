import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import reducer from "../reducers/index";
import rootSaga from "../sagas";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewared = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewared))
      : composeWithDevTools(applyMiddleware(...middlewared));

  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
