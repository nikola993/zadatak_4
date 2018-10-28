import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import SelectedElements from '../actions/selectElement.actions';
import TimerActions from '../actions/timer.actions';
import ElementActions from '../actions/element.actions';

import GameElement from './element';
import Timer from './timer';

class MemoryGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // create new board with shuffled values
            boardElementsValue: this.shuffledElements(),
            guessedElements: [],
        };
        this.selectedElement = this.selectedElement.bind(this);
    }

    componentDidUpdate() {
        const { selectElement } = this.props;
        const { selectElementsAction } = this.props;
        const { timerActions } = this.props;
        const { elementActions } = this.props;
        const { guessedElements } = this.state;

        if (selectElement.size === 2) {
            const firstElement = selectElement.get(0);
            const secondElement = selectElement.get(1);
            if (firstElement.value === secondElement.value) {
                guessedElements.push(firstElement.activeIndex);
                guessedElements.push(secondElement.activeIndex);
                selectElementsAction.elementsCompared();
                if (guessedElements.length === 16) {
                    timerActions.stop();
                }
            } else {
                elementActions.disableElement();
                setTimeout(() => {
                    selectElementsAction.elementsCompared();
                    elementActions.enableElement();
                }, 1000);
            }
        }
    }

    selectedElement(index) {
        const { selectElement } = this.props;
        if (selectElement.size === 2) {
            const firstElement = selectElement.get(0);
            const secondElement = selectElement.get(1);
            if (firstElement.activeIndex === index || secondElement.activeIndex === index) {
                return true;
            }
        } else if (selectElement.size === 1) {
            const firstElement = selectElement.first();
            if (firstElement.activeIndex === index) {
                return true;
            }
        }
        return false;
    }

    handleClick(index, value) {
        const { timerActions } = this.props;
        timerActions.start();
        const { selectElementsAction } = this.props;
        selectElementsAction.selectField(index, value);
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

    render() {
        const { boardElementsValue } = this.state;
        const { guessedElements } = this.state;
        const { timerState } = this.props;
        const { elementDisable } = this.props;
        return (
            <div>
                <div id="gameBoard">
                    <div>
                        { boardElementsValue.map((element, index) => (
                            <GameElement
                                key={index.toString()}
                                index={index}
                                value={element}
                                onClick={() => this.handleClick(index, element)}
                                isActive={this.selectedElement(index)}
                                elementGuessed={guessedElements}
                                elementDisable={elementDisable}
                            />
                        ))
                        }
                    </div>
                </div>
                <div className="center">
                    <div><strong>Time: </strong></div>
                    <Timer
                        timerState={timerState}
                    />
                </div>
            </div>
        );
    }
}

MemoryGame.propTypes = {
    selectElementsAction: PropTypes.shape({}).isRequired,
    selectElement: PropTypes.shape({}),
    timerActions: PropTypes.shape({}).isRequired,
    timerState: PropTypes.bool.isRequired,
    elementActions: PropTypes.shape({}).isRequired,
    elementDisable: PropTypes.bool.isRequired,
};

MemoryGame.defaultProps = {
    selectElement: undefined,
};

function mapStateToProps(state) {
    const { selectElement } = state;
    const { timerState } = state;
    const { elementDisable } = state;
    return {
        selectElement,
        timerState,
        elementDisable,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        selectElementsAction: bindActionCreators(SelectedElements, dispatch),
        timerActions: bindActionCreators(TimerActions, dispatch),
        elementActions: bindActionCreators(ElementActions, dispatch),
    };
}

const game = connect(mapStateToProps, mapDispatchToProps)(MemoryGame);
export default game;
