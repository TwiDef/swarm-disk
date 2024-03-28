import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDir, setPopupDisplay, popFromState } from '../../redux/slices/fileSlice';
import { createDir, getFiles, uploadFile } from '../../services/file';
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

    const fileUploadedHandler = (e) => {
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    return (
        <div className='disk'>
            <div className="disk-btns">
                <button className='disk-back' onClick={() => backClickHandler()}>Назад</button>
                <button className='disk-create' onClick={() => showPopupDisplay()}>Создать папку</button>
                <div className='disk-upload'>
                    <button>
                        <label
                            htmlFor="disk-upload__input"
                            className="disk-upload__label">
                            Загрузить файл
                        </label>
                    </button>
                    <input
                        onChange={(e) => fileUploadedHandler(e)}
                        multiple={true}
                        type="file"
                        id="disk-upload__input"
                        className="disk-upload__input" />
                </div>
            </div>
            <FileList />
            <Popup />
        </div>
    );
};

export default Disk;