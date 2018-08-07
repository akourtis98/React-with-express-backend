import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Articles extends Component{
    constructor(props){
        super(props);
        this.state = {
            articles: [],
        }
    }

    componentWillMount(){
        fetch("http://localhost:3001/fetch/articles")
            .then(res => res.json())
            .then(articles => this.setState({ articles }))    
        }

    handleClick = id => {
        console.log(id);
    }

    render(){
        let articles = this.state.articles.map(article =>
            {
                let title = '/article/' + article.title;
                return <li onClick={() => this.handleClick(article._id)} key={article._id}><Link to={title}>{article.title}</Link></li>
            }
        );

        return(
            <div>
                <h3>Articles:</h3>
                <hr/>
                { articles }
            </div>
        )
    }
}

export default Articles;