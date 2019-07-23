import axios from 'axios';

import { returnErrors } from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAILED,
    REGISTER_SUCCESS
} from './types'


// CHECK TOKEN AN LOAD
export const loadUser = () => (dispatch, getState) => {
    // UserLoading
    dispatch({ type: USER_LOADING })

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))

            dispatch({
                type: AUTH_ERROR
            })
        })

}


// Login User
export const login = (username, password) => dispatch => {

    // Headrs
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, password })

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))

            dispatch({
                type: LOGIN_FAILED
            })
        })

}


//REGISTER
export const register = ({ username, password, email }) => dispatch => {

    // Headrs
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, password, email })

    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))

            dispatch({
                type: REGISTER_FAILED
            })
        })

}



// LOGOUT
export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout/', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            })
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })

}


// SETUP Config w/ Token -- helper func
export const tokenConfig = getState => {
    // GET Token
    const token = getState().auth.token

    // Headrs
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Add token to header
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config

}
