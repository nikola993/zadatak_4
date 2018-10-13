import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as gameActions from '../actions/index';

import Timer from './timer';

class memoryGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // create new board with shuffled values
            boardElementsValue: this.shuffledElements(),
            numberOfRightGuesses: 0,
            startTimer: false,
        };
        this.onFieldClick = this.onFieldClick.bind(this);
    }

    componentDidUpdate() {
        const { gameState } = this.props;
        const { actions } = this.props;
        const { numberOfRightGuesses } = this.state;
        // if there are 2 element in state List check if equal
        if (gameState.size === 2) {
            // get elements from List
            const firstElement = gameState.first();
            const secondElement = gameState.last();
            if (firstElement.dataset.value === secondElement.dataset.value) {
                this.state.numberOfRightGuesses += 1;
                actions.isEqual();
                if (numberOfRightGuesses === 7) {
                    this.state.startTimer = false;
                }
            } else {
                // if elements are not equal get all elements and disable them
                const list = document.getElementsByClassName('fields');
                for (let i = 0; i < list.length; i += 1) {
                    list[i].classList.add('disabledAll');
                }
                // after 1 sec make them clickable
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

    onFieldClick(event) {
        this.state.startTimer = true;
        const { actions } = this.props;
        const elementSelected = event.target;
        // disable selected element
        elementSelected.classList.add('disabled');
        actions.selectField(elementSelected);
    }

    // get array of elements and shuffle them for board state
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

    // create a board with shuffled elements
    createBoard() {
        const { boardElementsValue } = this.state;
        const { startTimer } = this.state;
        const gameElements = boardElementsValue;
        const element = gameElements.map((elemet, index) => (
            <div className="fields" key={index.toString()} data-value={elemet} role="button" tabIndex={0}>
                {elemet}
            </div>));
        return (
            <div id="gameBoard" onClick={this.onFieldClick} aria-hidden="true">
                { element }
                <div>
                    <div><strong>Time: </strong></div>
                    <Timer startTimer={startTimer} />
                </div>
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
    actions: PropTypes.shape({}).isRequired,
    gameState: PropTypes.shape({}),
};

memoryGame.defaultProps = {
    gameState: undefined,
};

function mapStateToProps(state) {
    const { memoryGame: gameState } = state;
    return {
        gameState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(gameActions, dispatch),
    };
}

const game = connect(mapStateToProps, mapDispatchToProps)(memoryGame);
export default game;
