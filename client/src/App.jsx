import { Routes, Route, Redirect, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/navbar/Navbar';
import Registration from './components/registration/Registration';
import Authorization from './components/authorization/Authorization';

import './App.scss';
import { auth } from './services/user';
import Disk from './components/disk/Disk';


function App() {
    const { isAuth } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

    return (
        <div className="App">
            <Navbar />
            <div className='container'>
                {!isAuth ?
                    <Routes>
                        <Route path='/registration' element={<Registration />} />
                        <Route path='/login' element={<Authorization />} />
                        <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>
                    :
                    <Routes>
                        <Route path='/' element={<Disk />} />
                        <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>
                }
            </div>
        </div>
    );
}

export default App;
