import elementTypes from '../constants/element.constant';

export default function elementDisable(state = false, action) {
    switch (action.type) {
    case elementTypes.DISABLE_ELEMENT: {
        const newState = true;
        return newState;
    }
    case elementTypes.ENABLE_ELEMENT: {
        const newState = false;
        return newState;
    }
    default:
        return state;
    }
}
