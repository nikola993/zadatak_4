import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import combineReducers from '../reducers/index';

const store = createStore(combineReducers, devToolsEnhancer({ realtime: true }));
export default store;
