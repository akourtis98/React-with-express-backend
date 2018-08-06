import React, { Component } from 'react';

class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            articles: []
        }
    }

    componentWillMount(){
        fetch("http://localhost:3001/fetch/articles")
            .then(res => res.json())
            .then(articles => this.setState({ articles }));
        }

    render(){
        console.log("should be here: " + this.state.articles);

        let articles = this.state.articles.map(article => 
            <li key={article.id}> {article.title}</li>
            );
            

        return(
            <div>
                <h3>Homepage</h3>
                <hr/>
                <b>Articles:</b>
                { articles }
            </div>
        )
    }
}

export default Homepage;