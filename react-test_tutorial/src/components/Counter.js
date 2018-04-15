import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {

};

const defaultProps = {

};

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        }
    }

    onIncrease = () => {
        this.setState(({value}) => ({value: value + 1}));
    }

    onDecrease = () => {
        this.setState(({value}) => ({value: value - 1}));
    }

    render() {
        const {value} = this.state;
        const { onIncrease, onDecrease } = this;
        return (
            <div>
                <h1>Counter</h1>
                <h2>{value}</h2>
                <button onClick={onIncrease}>+</button>
                <button onClick={onDecrease}>-</button>
            </div>
        );
    }

}

Counter.propTypes = propTypes;
Counter.defaultProps = defaultProps;

export default Counter;