import React, { Component } from 'react';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
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
            password: this.state.password
        })
        })
        .then((res) => res.json())
        .then(data =>  console.log(data))
        .catch(err=>console.log(err))

        console.log("name: " + this.state.name + "\n" + "password: " + this.state.password);
    }

    handleChangeName = e => {
        this.setState({name: e.target.value});
        console.log(this.state.name)
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
                            aria-label="Name"
                            aria-describedby="emailHelp"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <button type="button" onClick={this.createUser} className="btn btn-info">Sign up</button>
        </form>
    </div>
        );
    }
}

export default CreateUser;