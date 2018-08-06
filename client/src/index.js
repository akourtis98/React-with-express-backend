import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './resources/App.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.render((
    <BrowserRouter> 
        <div>
            <App />
        </div>
    </BrowserRouter>
),
document.getElementById('root'));


