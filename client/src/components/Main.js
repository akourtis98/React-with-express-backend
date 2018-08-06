import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Homepage from './Homepage';

class Main extends Component{
    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route path='/signup' component={Signup}/>
                    <Route path='/login' component={Login}/>
                </Switch>
            </main>
        )
    }
}

export default Main;