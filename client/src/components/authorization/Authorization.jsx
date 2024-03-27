import React, { useState } from 'react';
import Input from '../input/Input';
import './Authorization.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../services/user';

const Authorization = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    return (
        <div className='authorization'>
            <h2>Авторизация</h2>
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
                className='authorization-btn'
                onClick={() => dispatch(login(email, password))}>Войти</button>
        </div>
    );
};

export default Authorization;