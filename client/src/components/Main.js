import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateUser from './CreateUser';
import CreateArticle from './CreateArticle';
import Login from './Login';
import Articles from './Articles';
import Article from './Article';
import Homepage from './Homepage';

class Main extends Component{
    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route exact path='/articles' component={Articles}/>
                    <Route path='/create/user' component={CreateUser}/>
                    <Route path='/article/:title' component={Article}/>
                    <Route path='/create/article' component={CreateArticle}/>
                    <Route path='/login' component={Login}/>
                </Switch>
            </main>
        )
    }
}

export default Main;