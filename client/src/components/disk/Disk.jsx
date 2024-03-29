import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDir, setPopupDisplay, popFromState } from '../../redux/slices/fileSlice';
import { createDir, getFiles, uploadFile } from '../../services/file';
import './Disk.scss';
import FileList from './fileList/FileList';
import Popup from '../popup/Popup';


const Disk = () => {

    const [dragEnter, setDragEnter] = useState(false)
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

    const dragEnterHandler = (e) => {
        e.preventDefault(e)
        e.stopPropagation(e)
        setDragEnter(true)
    }
    const dragLeaveHandler = (e) => {
        e.preventDefault(e)
        e.stopPropagation(e)
        setDragEnter(false)
    }

    const dropHandler = (e) => {
        e.preventDefault(e)
        e.stopPropagation(e)
        const files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    return (!dragEnter ?
        <div className='disk'
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}>
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
        :
        <div className='drag-area'
            onDrop={dropHandler}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}>
            <h4>Перенесите файлы сюда...</h4>
        </div>
    );
};

export default Disk;