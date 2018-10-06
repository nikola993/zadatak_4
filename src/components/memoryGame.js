import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as gameActions from '../actions/index';
import store from '../store/configureStore';

class memoryGame extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            boardElementsValue: this.shuffledElements(),
        };
        this.onFieldClick = this.onFieldClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onFieldClick(event) {
        const gameState = store.getState();
        const { actions } = this.props;
        const elementSelected = event.target;
        elementSelected.classList.add('disabled');
        actions.selectField(gameState, elementSelected);
        this.handleChange();
    }

    handleChange() {
        const gameState = store.getState();
        const { actions } = this.props;
        if (gameState.memoryGame.size === 2) {
            const firstElement = gameState.memoryGame.first();
            const secondElement = gameState.memoryGame.last();
            if (firstElement.dataset.value === secondElement.dataset.value) {
                actions.isEqual();
            } else {
                const list = document.getElementsByClassName('fields');
                for (let i = 0; i < list.length; i += 1) {
                    list[i].classList.add('disabledAll');
                }
                setTimeout(() => {
                    for (let i = 0; i < list.length; i += 1) {
                        list[i].classList.remove('disabledAll');
                    }
                    firstElement.classList.remove('disabled');
                    secondElement.classList.remove('disabled');
                }, 1000);
                actions.notEqual();
            }
        }
    }

    shuffledElements() {
        const gameElements = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        let currentIndex = gameElements.length;
        let temporaryValue;
        let randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = gameElements[currentIndex];
            gameElements[currentIndex] = gameElements[randomIndex];
            gameElements[randomIndex] = temporaryValue;
        }
        return gameElements;
    }

    createBoard() {
        const { boardElementsValue } = this.state;
        const gameElements = boardElementsValue;
        const element = gameElements.map((elemet, index) => (
            <div className="fields" key={index.toString()} data-value={elemet} role="button" tabIndex={0}>
                {elemet}
            </div>));
        return (
            <div id="gameBoard" onClick={this.onFieldClick} aria-hidden="true">
                { element }
            </div>
        );
    }

    render() {
        return (
            this.createBoard()
        );
    }
}
memoryGame.propTypes = {
    actions: PropTypes.shape({
        type: PropTypes.string,
        gameState: PropTypes.object,
        elementSelected: PropTypes.node,
    }).isRequired,
};

function mapStateToProps(state) {
    return {
        elementSelected: state.memoryGame,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(gameActions, dispatch),
    };
}

const game = connect(mapStateToProps, mapDispatchToProps)(memoryGame);
export default game;
