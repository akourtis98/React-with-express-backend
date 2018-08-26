import axios from 'axios';

import {
    GET_PROFILE,
    GET_ERRORS,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('http://localhost:3001/routes/api/profile/')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: err.response.data
            })
        )
}

// Create profile
export const createProfile = (profileData, history) => dispatch => {
    axios.post('http://localhost:3001/routes/api/profile/', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: null
            })
        )
}

// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}