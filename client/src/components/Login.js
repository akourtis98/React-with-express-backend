import React, { Component } from 'react';

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
        fetch('http://localhost:3001/login', {
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
        .catch(errors =>  {})
    };

    handleChangeEmail = e => {
        this.setState({email: e.target.value});
    }

    handleChangePassword = e => {
        this.setState({password: e.target.value});
    }


    render() {
        return (
            <div className="App">
                <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail">Email </label>
                        <input 
                            type="email" 
                            name="email"
                            className="form-control" 
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
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Password"
                            aria-label="Name"
                            aria-describedby="inputErrorHelp"/>
                    <small id="inputErrorHelp" className="form-text text-muted">{ this.state.errors.password }</small>
                </div>
                <button type="button" onClick={this.login} className="btn btn-info">Log in</button>
                <small id="inputSuccessHelp" className="form-text text-muted">{ this.state.message }</small>
            </form>
        </div>
        );
    }
}

export default Login;