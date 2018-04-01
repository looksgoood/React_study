import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    number: 0
};

export default function counter(state = initialState, action) {

    switch (action.type) {
        case types.INCREMENT:   // immutable js
            return update(
                state, {
                    number: {
                        $set: state.number + 1
                    }
                }
            );
        case types.DECREMENT:   // ES6 spred 
            return {
                ...state,
                number: state.number - 1
            };
        default:
            return state;
    }
} 