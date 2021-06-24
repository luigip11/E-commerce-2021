import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

// import createSagaMiddleware from '@redux-saga/core';
// import { fetchCollectionsStart } from './shop/shop.saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
// eslint-disable-next-line
export default { store, persistor };
