import { createBrowserHistory } from "history";
import createSagaMiddleware from 'redux-saga'
import { createStore, compose, applyMiddleware} from 'redux';

import rootReducer from './reducer'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const store = createStore(
  rootReducer,
  enhancer
)
sagaMiddleware.run(function* rootSaga() {})

export { history };
export default store;