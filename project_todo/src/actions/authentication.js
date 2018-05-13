import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';

import axios from 'axios';

/* LOGIN */
export function loginRequest(username, password) {
    console.log("in action login request");
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        //API REQUEST
        return axios.post('/api/account/signin', { username, password })
            .then((response) => {
                // Succeed
                console.log("sign in success!");
                dispatch(loginSuccess(username));
            })
            .catch((error) => {
                // Failed
                console.log("sign in failed!");
                dispatch(loginFailure());
            }
        );
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

/* RIGISTER */
export function registerRequest(username, password) {
    console.log("in action register request");
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(register());

        //API REQUEST
        return axios.post('/api/account/signup', { username, password })
            .then((response) => {
                // Succeed
                console.log("sign up success!");
                dispatch(registerSuccess(username));
            })
            .catch((error) => {
                // Failed
                console.log("sign up failed!");
                dispatch(registerFail(error.response.data));
            }
        );
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export function registerFail(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

/* GET STATUS REQUEST */
export function getStatusRequest() {
    console.log("in action get status request");
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(getStatus());

        //API REQUEST
        return axios.get('/api/account/getinfo')
            .then((response) => {
                // Succeed
                dispatch(getStatusSuccess(response.data.info.username));
            })
            .catch((error) => {
                // Failed
                dispatch(getStatusFail());
            }
        );
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(username) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}

export function getStatusFail() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

/* LOGOUT */
export function logoutRequest() {
    console.log("in action logout request");
    return (dispatch) => {
        //API REQUEST
        return axios.post('/api/account/logout')
            .then((response) => {
                dispatch(logout());
            }
        );
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}