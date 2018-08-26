import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
    name,
    error,
    placeholder,
    icon,
    label,
    value,
    onChange
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
            <label htmlFor="exampleInputEmail">{label}</label>
            <textarea
                name={name}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                onChange={onChange} />
            <div className="invalid-feedback">{error} </div>
        </div >
    );
};

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
}

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;