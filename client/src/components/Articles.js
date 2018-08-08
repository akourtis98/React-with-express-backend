import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

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
                <Breadcrumb tag="nav">
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/articles'>See all articles</Link></BreadcrumbItem>
                </Breadcrumb>
                <h3>Articles:</h3>
                <hr/>
                { articles }
            </div>
        )
    }
}

export default Articles;