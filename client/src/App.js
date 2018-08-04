import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
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

handleChangeEmail = e => {
    this.setState({email: e.target.value});
    console.log(this.state.email)
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
        <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                        type="email" 
                        className="form-control" 
                        onChange={this.handleChangeEmail} 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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
