import React, { Component } from 'react';
import classnames from 'classnames';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            password2: '',
            avatar: '',
            message: '',
            errors: {}
        }
    }

    createUser = () => {
        fetch('http://localhost:3001/routes/api/user/signup', {
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
        .then((res) => res.json())
        .then(data =>  {
            this.setState({ 
                errors: data,
                message: data.msg
            });
        })
        .catch(err=>console.log(err))
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

export default CreateUser;