import { List } from 'immutable';
import gameTypes from '../constants/selectElement.constants';

export default function memoryGame(state = List(), action) {
    switch (action.type) {
    case gameTypes.SELECT_FIELD: {
        const newState = {
            activeIndex: action.index,
            value: action.value,
        };
        return state.push(newState);
    }
    case gameTypes.ELEMENTS_COMPARED: {
        const newState = List();
        return newState;
    }
    default:
        return state;
    }
}
