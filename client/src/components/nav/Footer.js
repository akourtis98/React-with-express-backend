import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <span className="text-muted">Place sticky footer content here.</span>
                </div>
            </div>
        )
    }
}

export default Footer;