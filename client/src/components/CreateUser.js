import React, { Component } from 'react';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            password2: '',
            avatar: '',
            message: ''
        }
    }

    createUser = () => {
        fetch('http://localhost:3001/create/user', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.name,
            password: this.state.password,
            password2: this.state.password2,
            email: this.state.email,
            })
        })
        .then((res) => {
            this.setState({ message: "Success! " + "'" + this.state.name + "'" + " has been submitted."});
            console.log(res);
            return res.json();
        })
        .catch(err=>console.log(err))

        console.log("email: " + this.state.email + "\n" + "name: " + this.state.name + "\n" + "password: " + this.state.password);
    }

    handleChangeName = e => {
        this.setState({name: e.target.value});
        console.log(this.state.name)
    }

    handleChangePassword = e => {
        this.setState({password: e.target.value});
        console.log(this.state.password)
    }

    handleChangePassword2 = e => {
        this.setState({password2: e.target.value});
        console.log(this.state.password2)
    }

    handleChangeEmail = e => {
        this.setState({email: e.target.value});
        console.log(this.state.email)
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
                    <label htmlFor="exampleInputName">Name </label>
                        <input 
                        type="name" 
                        name="name"
                        className="form-control" 
                        onChange={this.handleChangeName} 
                        id="exampleInputName" 
                        aria-describedby="nameHelp" 
                        placeholder="Enter name"/>
                    <small id="nameHelp" className="form-text text-muted">We'll never share your name with anyone else.</small>
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
                            aria-describedby="passwordHelp"/>
                    <small id="passwordHelp" className="form-text text-muted">Between 6 to 30 char.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Password confirm </label>
                    <input 
                            name="password2"
                            type="password" 
                            onChange={this.handleChangePassword2} 
                            className="form-control" 
                            id="exampleInputPassword2" 
                            placeholder="Confirm password"
                            aria-describedby="password2Help"/>
                    <small id="password2Help" className="form-text text-muted">They have to match.</small>
                </div>
                <button type="button" onClick={this.createUser} className="btn btn-info">Sign up</button>
                message: {this.state.message}
        </form>
    </div>
        );
    }
}

export default CreateUser;