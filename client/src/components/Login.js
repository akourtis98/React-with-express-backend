import React, { Component } from 'react';
import classnames from 'classnames';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            message: ''
        }
    }
    
    login = () => {
        fetch('http://localhost:3001/routes/api/user/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
                })
        })
        .then((res) => res.json())
        .then(data =>  {
            this.setState({ 
                errors: data,
                message: data.msg
            });
        })
        .catch(err =>  {console.log(err)})
    };

    handleChangeEmail = e => {
        this.setState({email: e.target.value});
    }

    handleChangePassword = e => {
        this.setState({password: e.target.value});
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

export default Login;