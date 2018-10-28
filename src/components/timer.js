import React from 'react';
import PropTypes from 'prop-types';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    componentDidUpdate(prevPorps) {
        const { timerState } = this.props;
        if (timerState !== prevPorps.timerState) {
            if (timerState === true) {
                this.startTimer();
            } else {
                this.stopTimer();
            }
        }
    }

    startTimer() {
        let { time } = this.state;
        this.timer = setInterval(() => {
            this.setState({ time: time += 1 });
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    resetTimer() {
        this.setState({ time: 0 });
    }

    render() {
        const { time } = this.state;
        return (
            <div>
                <h3>
                    { time }
                </h3>
            </div>
        );
    }
}

Timer.propTypes = {
    timerState: PropTypes.bool.isRequired,
};
