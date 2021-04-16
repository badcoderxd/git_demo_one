import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];
const initialState = {};

const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
sagaMiddleware.run(sagas);

export default store;