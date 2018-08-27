import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LandingPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div>
                {/* <!-- Landing --> */}
                <div className="landing">
                    <div className="dark-overlay landing-inner text-light">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h1 className="display-3 mb-4">Developer Connector
                            </h1>
                                    <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                                    <hr />
                                    <a href="/register" className="btn btn-lg btn-info mr-2">Sign Up</a>
                                    <a href="/login" className="btn btn-lg btn-light">Login</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* // <!-- Footer -->
                <footer className="bg-dark text-white mt-5 p-4 text-center">
                    Copyright &copy; 2018 Dev Connector
                </footer> */}
            </div>
        )
    }
}

LandingPage.PropTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(LandingPage);