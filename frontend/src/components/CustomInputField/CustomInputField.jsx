import React from 'react';
import './CustomInputField.css'

export const CustomInputField = ({ onChange, value, erros, name, ...props }) => (
    <div className="input-field-wrapper">
        <label htmlFor={name}>{props.label}</label>
        <input {...props} className='input' value={value} name={name} onChange={onChange} />
        {(erros || []).map(error => (
            <span key={error} className="input-field-error">{error}</span>
        ))}
    </div>
);