import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import axios from 'axios';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                name: '',
                password: '',
                password2: '',
                avatar: '',
            },
            message: '',
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    createUser = () => {
        const newUser = this.state.user;
        this.props.registerUser(newUser, this.props.history);
    }

    handleChangeName = e => {
        this.setState({
            user: {
                ...this.state.user,
                name: e.target.value
            }
        });
        console.log(this.state.user.name)
    }

    handleChangePassword = e => {
        this.setState({
            user: {
                ...this.state.user,
                password: e.target.value
            }
        });
        console.log(this.state.user.password)
    }

    handleChangePassword2 = e => {
        this.setState({
            user: {
                ...this.state.user,
                password2: e.target.value
            }
        });
        console.log(this.state.user.password2)
    }

    handleChangeEmail = e => {
        this.setState({
            user: {
                ...this.state.user,
                email: e.target.value
            }
        });
        console.log(this.state.user.email)
    }


    render() {
        const { errors } = this.state;

        return (
            <div className="App">
                <form>
                    {/* // <!-- Register --> */}
                    <div className="register">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 m-auto">
                                    <h1 className="display-4 text-center">Sign Up</h1>
                                    <p className="lead text-center">Create your DevConnector account</p>
                                    <TextFieldGroup
                                        placeholder="Name"
                                        name="name"
                                        type="text"
                                        label="Enter name"
                                        info="Enter name"
                                        onChange={this.handleChangeName}
                                        error={errors.name}
                                    />

                                    <TextFieldGroup
                                        placeholder="Email Address"
                                        name="email"
                                        type="email"
                                        label="Name"
                                        info="Email Address"
                                        onChange={this.handleChangeEmail}
                                        error={errors.email}
                                    />


                                    <TextFieldGroup
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        label="Enter password"
                                        info="Enter password"
                                        onChange={this.handleChangePassword}
                                        error={errors.password}
                                    />

                                    <TextFieldGroup
                                        placeholder="Password"
                                        name="password2"
                                        type="password"
                                        label="Enter password againasd"
                                        info="Enter password again"
                                        onChange={this.handleChangePassword2}
                                        error={errors.password2}
                                    />

                                    <button type="button" onClick={this.createUser} className="btn btn-info btn-block mt-4">Sign up</button>
                                    <small id="inputSuccessHelp" className="form-text text-muted">{this.state.message}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

CreateUser.PropTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(CreateUser));