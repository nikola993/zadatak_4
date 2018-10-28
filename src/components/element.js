import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GameElement extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.className = this.className.bind(this);
    }

    handleClick() {
        const { onClick } = this.props;
        onClick();
    }

    className(isActive, elementGuessed, index, elementDisable) {
        if (elementGuessed.includes(index)) {
            return 'fields disabled';
        }
        if (isActive) {
            return 'fields disabled';
        }
        if (elementDisable) {
            return 'fields disabledAll';
        }
        return 'fields';
    }

    render() {
        const { value } = this.props;
        const { isActive } = this.props;
        const { index } = this.props;
        const { elementGuessed } = this.props;
        const { elementDisable } = this.props;
        return (
            <div
                className={this.className(isActive, elementGuessed, index, elementDisable)}
                role="button"
                onClick={this.handleClick}
                onKeyPress={this.handleClick}
                tabIndex={0}
            >
                { value }
            </div>
        );
    }
}

GameElement.propTypes = {
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    elementGuessed: PropTypes.arrayOf(PropTypes.number).isRequired,
    elementDisable: PropTypes.bool.isRequired,
};
