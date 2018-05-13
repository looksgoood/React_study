import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE
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

/* RIGISTER */
export function registerRequest(username, password) {
    console.log("in action register request");
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(register());

        console.log("id : "+ username + " pw : "+password);
        console.log(dispatch);
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
            });
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