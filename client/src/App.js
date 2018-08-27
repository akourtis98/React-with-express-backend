import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutCurrentUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';


// import Routes from './components/Routes/Routes';
import Header from './components/Nav/Header';
import Footer from './components/Nav/Footer';
import Landing from './components/LandingPage';
import Register from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';

import './resources/style/App.css';
import 'bootstrap/dist/css/bootstrap.css';

// Check for token
if (localStorage.jwttoken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwttoken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwttoken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 555000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutCurrentUser());
        // Clear current Profile
        store.dispatch(clearCurrentProfile());
        // Redirect to login
        window.location.href = '/login';
    }
}


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <div className="container">
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path="/create-profile"
                                    component={CreateProfile}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path="/edit-profile"
                                    component={EditProfile}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path="/add-experience"
                                    component={AddExperience}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path="/add-education"
                                    component={AddEducation}
                                />
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/feed" component={Posts} />
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/post/:id" component={Post} />
                            </Switch>
                            <Route exact path="/not-found" component={NotFound} />
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}


export default App;