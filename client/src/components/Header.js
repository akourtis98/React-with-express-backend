import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <header>
                <nav>
                    <ul>
                        <li><Link to='/'>Homepage</Link></li>
                        <li><Link to='/articles'>See all articles</Link></li>
                        <li><Link to='/create/user'>Create User</Link></li>
                        <li><Link to='/create/article'>Create Article</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;