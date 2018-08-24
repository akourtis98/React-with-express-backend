import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import './resources/App.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import store from './store';

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


