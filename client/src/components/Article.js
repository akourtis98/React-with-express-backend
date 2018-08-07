import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            <div>
                <h3>Article:</h3>
                <hr/>
                {this.state.article.body}
            </div>
        )
    }
}

export default Article;