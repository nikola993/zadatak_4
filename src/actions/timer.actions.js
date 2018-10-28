import timerTypes from '../constants/timer.constants';

function start() {
    return {
        type: timerTypes.START,
    };
}

function stop() {
    return {
        type: timerTypes.STOP,
    };
}

const timerActions = {
    start,
    stop,
};

export default timerActions;
