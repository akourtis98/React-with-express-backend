import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <header>
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                        <div className="container">
                            <a className="navbar-brand">My website</a>
                                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                            <i className="fa fa-bars"></i>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarResponsive">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/'>Homepage</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/articles'>See all articles</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/create/user'>Create User</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/create/article'>Create Article</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/login'>Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
            </header>
        )
    }
}

export default Header;