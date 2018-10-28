import elementTypes from '../constants/element.constant';

function enableElement() {
    return {
        type: elementTypes.ENABLE_ELEMENT,
    };
}

function disableElement() {
    return {
        type: elementTypes.DISABLE_ELEMENT,
    };
}

const elementActions = {
    enableElement,
    disableElement,
};

export default elementActions;
