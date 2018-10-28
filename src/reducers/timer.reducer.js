import timerTypes from '../constants/timer.constants';

export default function timerState(state = false, action) {
    switch (action.type) {
    case timerTypes.START: {
        const newState = true;
        return newState;
    }
    case timerTypes.STOP: {
        const newState = false;
        return newState;
    }
    default:
        return state;
    }
}
