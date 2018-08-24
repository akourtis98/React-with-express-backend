import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            },
            errors: {},
            message: ''
        }
    }
    
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }


    login = () => {
        const user = this.state.user;
        this.props.loginUser(user);
    };

    handleChangeEmail = e => {
        this.setState({
            user: {
                ...this.state.user,
                email: e.target.value}
        });
    }

    handleChangePassword = e => {
        this.setState({
            user: {
                ...this.state.user,
                password: e.target.value}
        });
    }


    render() {
        const { errors } = this.state;

        return (
            <div className="login">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your account</p>
                            <form className="form-signin">
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail">Email </label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })} 
                                        onChange={this.handleChangeEmail} 
                                        id="exampleInputEmail" 
                                        aria-describedby="inputErrorHelp" 
                                        placeholder="Enter email"/>
                                <small id="inputErrorHelp" className="form-text text-muted">{ this.state.errors.email }</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password </label>
                                        <input 
                                        name="password"
                                        type="password" 
                                        onChange={this.handleChangePassword} 
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password
                                        })} 
                                        id="exampleInputPassword1" 
                                        placeholder="Password"
                                        aria-label="Name"
                                        aria-describedby="inputErrorHelp"/>
                                <small id="inputErrorHelp" className="form-text text-muted">{ this.state.errors.password }</small>
                            </div>
                        </form>
                        <button type="button" onClick={this.login} className="btn btn-info btn-block mt-4">Log in</button>
                        <small id="inputSuccessHelp" className="form-text text-muted">{ this.state.message }</small>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

Login.PropTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps , { loginUser })(Login);