import gameTypes from '../constants/selectElement.constants';

function selectField(index, value) {
    return {
        type: gameTypes.SELECT_FIELD,
        index,
        value,
    };
}

function elementsCompared() {
    return {
        type: gameTypes.ELEMENTS_COMPARED,
    };
}

const gameActions = {
    selectField,
    elementsCompared,
};

export default gameActions;
