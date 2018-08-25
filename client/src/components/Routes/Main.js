import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateUser from '../Auth/Signup';
import CreateArticle from '../CreateArticle';
import Login from '../Auth/Login';
import Articles from '../Articles';
import Article from '../Article';
import LandingPage from '../LandingPage';

class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route exact path='/articles' component={Articles} />
                    <Route exact path='/create/user' component={CreateUser} />
                    <Route exact path='/article/:title' component={Article} />
                    <Route exact path='/create/article' component={CreateArticle} />
                    <Route exact path='/login' component={Login} />
                </Switch>
            </main>
        )
    }
}

export default Main;