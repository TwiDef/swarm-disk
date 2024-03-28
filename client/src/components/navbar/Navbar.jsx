import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { logOut } from '../../redux/slices/userSlice';
import './Navbar.scss'

const Navbar = () => {
    const { isAuth } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const authType = [
        {
            type: 'Войти',
            link: '/login',
            active: false
        },
        {
            type: 'Регистрация',
            link: '/registration',
            active: false
        }
    ]

    const setActiveLink = (item) => {
        authType.forEach((link) => {
            link.active = false
        })
        item.active = true
    }
    return (
        <div className="navbar">
            <div className='navbar-wrapper'>
                <div className="navbar-logo__block">
                    <img className='navbar-logo' src="https://cdn-icons-png.flaticon.com/512/543/543269.png" alt="" />
                    <p className='navbar-title'>swarm-disk</p>
                </div>
                <div className="navbar-auth">
                    {
                        !isAuth ?
                            authType.map((item, i) => {
                                return (
                                    <NavLink
                                        onClick={() => setActiveLink(item)}
                                        className={`navbar-auth__link${item.active ? 'active' : ''}`}
                                        key={i}
                                        to={item.link}>
                                        {item.type}
                                    </NavLink>
                                )
                            })
                            :
                            <NavLink
                                onClick={() => dispatch(logOut())}
                                className={'navbar-auth__link'}>
                                Выход
                            </NavLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;