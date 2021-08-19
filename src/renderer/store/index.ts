import { initialState as controlInitialState } from './ducks/control/reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './sagas';

import { reducer as controlReducer } from './ducks/control';
const reducer = combineReducers({
  // serialport: serialportReducer,
  control: controlReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const initialStore = {
  control: controlInitialState,
};

const store = createStore(
  reducer,
  // initialStore,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
