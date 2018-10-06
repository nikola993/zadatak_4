import { List } from 'immutable';
import types from '../actions/action_type';

export default function memoryGame(state = List(), action) {
    switch (action.type) {
    case types.SELECT_FIELD: {
        const newState = action.elementSelected;
        return state.push(newState);
    }
    case types.IS_EQUAL: {
        const newState = List();
        return newState;
    }
    case types.NOT_EQUAL: {
        const newState = List();
        return newState;
    }
    default:
        return state;
    }
}
