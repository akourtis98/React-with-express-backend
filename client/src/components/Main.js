import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateUser from './CreateUser';
import CreateArticle from './CreateArticle';
import Login from './Login';
import Homepage from './Homepage';

class Main extends Component{
    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route path='/create/user' component={CreateUser}/>
                    <Route path='/create/article' component={CreateArticle}/>
                    <Route path='/login' component={Login}/>
                </Switch>
            </main>
        )
    }
}

export default Main;