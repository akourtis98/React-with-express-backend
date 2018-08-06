import React, { Component } from 'react';

class CreateArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            body: '',
            message: ''
        }
    }

    createArticle = () => {
        let tempDate = new Date();
        const date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();

        fetch('http://localhost:3001/create/article', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: this.state.title,
            author: this.state.author,
            date: date,
            body: this.state.body
            })
        })
        .then(res => {
            this.setState({ message: "Success! " + "'" + this.state.title + "'" + " has been submitted."});
            return res.json();
        })
        .catch(err=>console.log(err))

        console.log("title: " + this.state.title + "\n" + "author: " + this.state.author + "\n" + "body: " + this.state.body);
    }

    handleChangeTitle = e => {
        this.setState({title: e.target.value});
        console.log(this.state.title)
    }

    handleChangeAuthor = e => {
        this.setState({author: e.target.value});
        console.log(this.state.author)
    }

    handleChangeBody = e => {
        this.setState({body: e.target.value});
        console.log(this.state.body)
    }


    render() {
        return (
            <div className="App">
            <form>
            <div className="form-group">
                <label htmlFor="inputTitle">Title</label>
                    <input 
                    type="title" 
                    name="title"
                    className="form-control" 
                    onChange={this.handleChangeTitle} 
                    id="inputTitle"
                    placeholder="Enter Title"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAuthor">Full name:</label>
                        <input 
                        type="author" 
                        name="author"
                        className="form-control" 
                        onChange={this.handleChangeAuthor} 
                        id="inputAuthor" 
                        placeholder="Enter the author's name"/>
                </div>
                <div className="form-group">
                <label htmlFor="inputBody">Body</label>
                <input 
                        name="body"
                        type="body" 
                        onChange={this.handleChangeBody} 
                        className="form-control" 
                        id="inputBody" 
                        placeholder="body"/>
                </div>
                <button type="button" onClick={this.createArticle} className="btn btn-info">Submit</button>
        </form>
        message: {this.state.message}
    </div>
        );
    }
}

export default CreateArticle;