import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupDisplay } from '../../redux/slices/fileSlice';
import { createDir, getFiles } from '../../services/file';
import './Disk.scss';
import FileList from './fileList/FileList';
import Popup from '../popup/Popup';


const Disk = () => {

    const dispatch = useDispatch()
    const { currentDir } = useSelector(state => state.file)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    const showPopupDispkay = () => {
        dispatch(setPopupDisplay('flex'))
    }

    return (
        <div className='disk'>
            <div className="disk-btns">
                <button className='disk-back'>Назад</button>
                <button className='disk-create' onClick={() => showPopupDispkay()}>Создать папку</button>
            </div>
            <FileList />
            <Popup />
        </div>
    );
};

export default Disk;