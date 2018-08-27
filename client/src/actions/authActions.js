import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Types
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('http://localhost:3001/routes/api/user/signup', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios
        .post('http://localhost:3001/routes/api/user/login', userData)
        .then(res => {
            // Save to localStorage
            let { token } = res.data;

            token = token;

            // Set token to ls
            localStorage.setItem('jwttoken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Log out logged in user
export const logoutCurrentUser = () => dispatch => {
    // Remove item from localStorage
    localStorage.removeItem('jwttoken');

    // Remove Auth header
    setAuthToken(false);

    // Set current user to empty object which will set isAuthenicated to false
    dispatch(setCurrentUser({}));
};