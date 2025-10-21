import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, legacy_createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/index";
import { rootSaga } from "./saga/index";

const bindMiddleware = (middleware) => {
  return applyMiddleware(...middleware);
};
function initStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = legacy_createStore(
    rootReducer,
    initialState,
            composeWithDevTools(bindMiddleware([sagaMiddleware])),
  );
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

export default initStore();
