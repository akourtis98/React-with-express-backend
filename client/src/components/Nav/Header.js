import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutCurrentUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Header extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutCurrentUser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a
                        href='#'
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="rounded-circle"
                            title="You must have a Gravatar connected to your email to display an image."
                            style={{ width: '25px', marginRight: '5px' }}
                        />
                        Log out</a>
                </li>
            </ul>
        )

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href='/register'>Sign Up</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href='/login'>Login</a>
                </li>
            </ul>
        )

        return (
            <header>
                {/* <!-- Navbar --> */}
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <a className="navbar-brand" href="/">DevConnector</a>
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
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

Header.PropTypes = {
    logoutCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutCurrentUser, clearCurrentProfile })(Header);