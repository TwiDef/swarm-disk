import React from 'react';
import './Input.scss';

const Input = ({ type, placeholder, setValue, value }) => {
    return (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={type}
            placeholder={placeholder} />
    );
};

export default Input;