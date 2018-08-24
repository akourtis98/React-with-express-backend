import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import PropTypes from 'prop-types';

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

    createUser = () => {
        this.props.registerUser(this.state.user);
        // fetch('http://localhost:3001/routes/api/user/signup', {
        // method: 'POST',
        // mode: 'cors',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({
        //     name: this.state.user.name,
        //     password: this.state.user.password,
        //     password2: this.state.user.password2,
        //     email: this.state.user.email,
        //     })
        // })
        // .then((res) => res.json())
        // .then(data =>  {
        //     this.setState({ 
        //         errors: data,
        //         message: data.msg
        //     });
        // })
        // .catch(err=>console.log(err))
    }

    handleChangeName = e => {
        this.setState({
            user: {
                ...this.state.user,
                name: e.target.value}
        });
        console.log(this.state.user.name)
    }

    handleChangePassword = e => {
        this.setState({
            user: {
                ...this.state.user,
                password: e.target.value}
        });
        console.log(this.state.user.password)
    }

    handleChangePassword2 = e => {
        this.setState({
            user: {
                ...this.state.user,
                password2: e.target.value}
        });
        console.log(this.state.user.password2)
    }

    handleChangeEmail = e => {
        this.setState({
            user: {
                ...this.state.user,
                email: e.target.value}
        });
        console.log(this.state.user.email)
    }


    render() {
        const { errors } = this.state;
        const { user } = this.props.auth;

        return (      
            <div className="App">
            {user ? user.name : null}
            <form>
            {/* // <!-- Register --> */}
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <div className="form-group">
                                        <input 
                                        type="name" 
                                        name="name"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.name
                                        })} 
                                        onChange={this.handleChangeName} 
                                        id="exampleInputName" 
                                        aria-describedby="nameHelp" 
                                        placeholder="Enter name"/>
                                    <small id="inputErrorHelp" className="form-text text-muted">{this.state.errors.name}</small>
                            </div>
                            <div className="form-group">
                                        <input 
                                        type="email" 
                                        name="email"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })} 
                                        onChange={this.handleChangeEmail} 
                                        id="exampleInputEmail" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Enter email address"/>
                                    <small id="inputErrorHelp" className="form-text text-muted">{this.state.errors.email}</small>
                                </div>
                                <div className="form-group">
                                    <input 
                                            name="password"
                                            type="password" 
                                            onChange={this.handleChangePassword} 
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.password
                                            })} 
                                            id="exampleInputPassword1" 
                                            placeholder="Enter password"
                                            aria-describedby="passwordHelp"/>
                                    <small id="inputErrorHelp" className="form-text text-muted">{this.state.errors.password}</small>
                                </div>
                                <div className="form-group">
                                    <input 
                                            name="password2"
                                            type="password" 
                                            onChange={this.handleChangePassword2} 
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.password2
                                            })} 
                                            id="exampleInputPassword2" 
                                            placeholder="Confirm password"
                                            aria-describedby="password2Help"/>
                                    <small id="inputErrorHelp" className="form-text text-muted">{this.state.errors.password2}</small>
                                </div>
                                <button type="button" onClick={this.createUser} className="btn btn-info btn-block mt-4">Sign up</button>
                                <small id="inputSuccessHelp" className="form-text text-muted">{ this.state.message }</small>
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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { registerUser })( CreateUser);