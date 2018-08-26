import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    label,
    type,
    error,
    info,
    onChange,
}) => {
    return (
        <div className="form-group">
            <label htmlFor="exampleInputEmail">{label}</label>
            <input
                type={type}
                name={name}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                onChange={onChange}
                placeholder={placeholder} />
            <small className="form-text text-muted">{info}</small>
            <div className="invalid-feedback">error: {error} </div>
        </div>
    );
};

TextFieldGroup.PropTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    error: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;