import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
        };

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    componentDidUpdate(startTimerProp) {
        const { startTimer } = this.props;
        if (startTimer !== startTimerProp.startTimer) {
            if (startTimer === true) {
                this.startTimer();
            }
        } else if (startTimer === false) {
            this.stopTimer();
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
    startTimer: PropTypes.bool.isRequired,
};

export default Timer;
