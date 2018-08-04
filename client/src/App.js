import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        pword: '',
        users: []
    }
}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  signup = e => {
    // save to db
  }

  handleChangeName = e => {
      this.setState({name: e.target.value});
      console.log(this.state.name)
  }

  handleChangePword = e => {
      this.setState({pword: e.target.value});
      console.log(this.state.pword)
  }
  render() {
    return (
      <div className="App">
        <ul>
          {this.state.users.map(user => 
            <li key={user.id}> {user.username}</li>
          )}
        </ul>
        <form method="POST" action="/register">
                    <div className="form-group">
                        <label htmlFor="exampleInputName">Name</label>
                        <input 
                        type="name" 
                        className="form-control" 
                        onChange={this.handleChangeName} 
                        id="exampleInputName" 
                        aria-describedby="nameHelp" 
                        placeholder="Enter name"/>
                        <small id="nameHelp" className="form-text text-muted">We'll never share your name with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                        type="password" 
                        onChange={this.handleChangePword} 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password"/>
                    </div>
                    <button type="button" onClick={this.signup} className="btn btn-info">Sign up</button>
                    </form>
      </div>
    );
  }
}

export default App;
