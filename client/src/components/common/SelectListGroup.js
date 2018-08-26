import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
    name,
    error,
    value,
    label,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value} >
            {option.label}
        </option>
    ));
    return (
        <div className="form-group">
            <label htmlFor="exampleInputEmail">{label}</label>
            <select
                name={name}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                onChange={onChange}>
                {selectOptions}
            </select>
            <small className="form-text text-muted">{info}</small>
            <div className="invalid-feedback">error: {error} </div>
        </div>
    );
};

SelectListGroup.PropTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
}

export default SelectListGroup;