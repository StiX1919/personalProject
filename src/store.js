import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware'

import reducer from './ducks/reducer';

import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducer, composeWithDevTools(applyMiddleware(promiseMiddleware())))