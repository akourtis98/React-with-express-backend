import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

class Article extends Component{
    constructor(props){
        super(props);
        this.state = {
            article: {}
        }
    }

    componentWillMount(){
        fetch("http://localhost:3001/article/" + this.props.match.params.title)
            .then(res => res.json())
            .then(article => {
                return this.setState({ article });
            }) 
        }

    render(){
        return(
            <div className="Articles-page-container">
                <Breadcrumb tag="nav">
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/articles'>See all articles</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/articles'>{this.state.article.title}</Link></BreadcrumbItem>
                </Breadcrumb>
                <h3>Article:</h3>
                <hr/>
                <h2>
                    {this.state.article.title}
                </h2>
                <p>
                    {this.state.article.body}
                </p>
                <br/>
                <p>
                    by: {this.state.article.author}
                </p>
            </div>
        )
    }
}

export default Article;