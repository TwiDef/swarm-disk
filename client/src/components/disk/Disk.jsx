import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDir, setPopupDisplay, popFromState } from '../../redux/slices/fileSlice';
import { createDir, getFiles } from '../../services/file';
import './Disk.scss';
import FileList from './fileList/FileList';
import Popup from '../popup/Popup';


const Disk = () => {

    const dispatch = useDispatch()
    const { currentDir, diskStack } = useSelector(state => state.file)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    const showPopupDisplay = () => {
        dispatch(setPopupDisplay('flex'))
    }

    const backClickHandler = () => {
        dispatch(popFromState(diskStack))
    }

    return (
        <div className='disk'>
            <div className="disk-btns">
                <button className='disk-back' onClick={() => backClickHandler()}>Назад</button>
                <button className='disk-create' onClick={() => showPopupDisplay()}>Создать папку</button>
            </div>
            <FileList />
            <Popup />
        </div>
    );
};

export default Disk;