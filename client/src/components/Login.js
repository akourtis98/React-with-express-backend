import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
        .then(data =>  console.log(data))
        .catch(err=>console.log(err))

        console.log("name: " + this.state.name + "\n" + "password: " + this.state.password);
    };

    handleChangeEmail = e => {
        this.setState({email: e.target.value});
        console.log(this.state.email)
    }

    handleChangePassword = e => {
        this.setState({password: e.target.value});
        console.log(this.state.password)
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
                    aria-describedby="emailHelp" 
                    placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your name with anyone else.</small>
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
                    aria-describedby="emailHelp"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <button type="button" onClick={this.login} className="btn btn-info">Log in</button>
    </form>
</div>
        );
    }
}

export default Login;