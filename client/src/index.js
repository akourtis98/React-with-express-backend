import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutCurrentUser } from './actions/authActions';
import store from './store';
import App from './components/App';

import './resources/App.css';
import 'bootstrap/dist/css/bootstrap.css';

// Check for token
if(localStorage.jwttoken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwttoken);

    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwttoken);

    // Set user and is Authencticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutCurrentUser());

        // Clear current profile

        //  redirect to login
        window.location.href = '/login';
    }
}

ReactDOM.render((
    <Provider store={ store }>
        <BrowserRouter> 
            <div>
                <App />
            </div>
        </BrowserRouter>
    </Provider>
),
document.getElementById('root'));


