import React, { Component } from 'react';
import './App.css';
import request from 'request';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        password: '',
        users: []
    }
}

  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
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
        name: this.state.name,
        password: this.state.password
      })
    })
      .then((res) => res.json())
      .then(data =>  console.log(data))
      .catch(err=>console.log(err))

      console.log("name: " + this.state.name + "\n" + "password: " + this.state.password);
    };

  signup = e => {
    fetch('http://localhost:3001/register', {
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
      <ul>
        {this.state.users.map(user => 
        <li key={user.id}> {user.username}</li>
        )}
      </ul>
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
      <button type="button" onClick={this.signup} className="btn btn-info">Sign up</button>
      <button type="button" onClick={this.login} className="btn btn-info">Log in</button>
    </form>
</div>
    );
  }
}

export default App;
