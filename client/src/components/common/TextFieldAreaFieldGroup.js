import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldAreaFieldGroup = ({
    name,
    placeholder,
    error,
    info,
    onChange,
}) => {
    return (
        <div className="form-group">
            <textarea
                name={name}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                onChange={onChange}
                placeholder={placeholder} />
            <small className="form-text text-muted">{info}</small>
            <div className="invalid-feedback">{error} </div>
        </div>
    );
};

TextFieldAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
}

export default TextFieldAreaFieldGroup;