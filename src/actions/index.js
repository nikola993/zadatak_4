import types from './action_type';

export function selectField(gameState, elementSelected) {
    return {
        type: types.SELECT_FIELD,
        gameState,
        elementSelected,
    };
}

export function isEqual() {
    return {
        type: types.IS_EQUAL,
    };
}

export function notEqual() {
    return {
        type: types.NOT_EQUAL,
    };
}
