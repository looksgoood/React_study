import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from './ActionTypes';

import axios from 'axios';

/* LOGIN */
export function loginRequest(username, password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        //API REQUEST
        return axios.post('/api/account/signin', { username, password })
            .then((response) => {
                // Succeed
                dispatch(loginSuccess(username));
            })
            .catch((error) => {
                // Failed
                dispatch(loginFailure());
            });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}