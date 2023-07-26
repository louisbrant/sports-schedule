// import { createStore, compose, applyMiddleware } from "redux";
// import { createWrapper } from "next-redux-wrapper";
// import createSagaMiddleware from "redux-saga";

// // root reducer
// import rootReducer from "./rootReducer";
// // root saga
// import rootSaga from "./sagas";

// // saga middleware
// const sagaMiddleware = createSagaMiddleware();
// const composeEnhancer =
//   (typeof window !== "undefined" &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const store = createStore(
//   rootReducer,
//   composeEnhancer(applyMiddleware(sagaMiddleware))
// );
// sagaMiddleware.run(rootSaga);

// const makeStore = () => store;
// export const wrapper = createWrapper(makeStore);

// export default store;
import { createStore, compose, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";

// root reducer
import rootReducer from "./rootReducer";
// root saga
import rootSaga from "./sagas";
import { logger } from "redux-logger";
// saga middleware
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV !== "production") {
  middlewares.push(logger);
}
const composeEnhancer =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);

export default store;
