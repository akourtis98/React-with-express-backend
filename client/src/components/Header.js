import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <header>
                {/* <!-- Navbar --> */}
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                    <a className="navbar-brand" href="">DevConnector</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link"> Developers
                                </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a><Link className="nav-link" to='/create/user'>Sign Up</Link></a>
                        </li>
                        <li className="nav-item">
                            <a><Link className="nav-link" to='/login'>Login</Link></a>
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