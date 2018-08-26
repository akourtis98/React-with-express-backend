import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateUser from '../Auth/Signup';
import CreateArticle from '../CreateArticle';
import Login from '../Auth/Login';
import Articles from '../Articles';
import Dashboard from '../Dashboard/dashboard';
import Article from '../Article';
import LandingPage from '../LandingPage';
import PrivateRoute from '../common/PrivateRoute';
import CreateProfile from '../CreateProfile';

class Routes extends Component {
    render() {
        return (
            <main>
                <Router>
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route exact path='/articles' component={Articles} />
                        <PrivateRoute exact path='/dashboard' component={Dashboard} />
                        <PrivateRoute exact path='/create/profile/' component={CreateProfile} />
                        <Route exact path='/create/user' component={CreateUser} />
                        <Route exact path='/article/:title' component={Article} />
                        <Route exact path='/create/article' component={CreateArticle} />
                        <Route exact path='/login' component={Login} />
                    </Switch>
                </Router>
            </main>
        )
    }
}


export default Routes;