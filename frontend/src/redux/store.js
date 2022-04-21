import {createStore, applyMiddleware, compose } from 'redux';
import allReducers from './reducers/reducerCollection';
import apiMiddleware from './middleware/apiMiddleware';

const store = createStore(allReducers, compose(applyMiddleware(apiMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;


