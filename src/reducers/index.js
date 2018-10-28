import { combineReducers } from 'redux';
import selectElement from './selectElement.reducer';
import timerState from './timer.reducer';
import elementDisable from './element.reducer';

export default combineReducers({
    selectElement,
    timerState,
    elementDisable,
});
