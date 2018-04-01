import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
     color: [255, 255, 255]
};

export default function ui(state = initialState, action) {

    if (action.type === types.SET_COLOR) {
        return update(
            state, {
                color: {
                    $set: action.color
                }
            }
        );
    } else {
        return state; 
    }
} 