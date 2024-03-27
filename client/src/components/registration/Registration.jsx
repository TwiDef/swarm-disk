import React, { useState } from 'react';
import Input from '../input/Input';
import './Registration.scss';
import { registration } from '../../services/user';

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='registration'>
            <h2>Регистрация</h2>
            <Input
                setValue={setEmail}
                value={email}
                type={'text'}
                placeholder={'Введите адрес электронной почты...'} />
            <Input
                setValue={setPassword}
                value={password}
                type={'password'}
                placeholder={'Введите пароль...'} />
            <button
                className='registration-btn'
                onClick={() => registration(email, password)}>Зарегистрироватся</button>
        </div>
    );
};

export default Registration;