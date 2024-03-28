import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../redux/slices/fileSlice';
import folderLogo from './../../../../assets/img/folder.png';
import fileLogo from './../../../../assets/img/file.png';

import './File.scss';

const File = ({ file }) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file)

    const openDirHandler = (file) => {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir.currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    return (
        <div className='file' onClick={() => openDirHandler(file)}>
            <img className='file-img' src={file.type === 'dir' ? folderLogo : fileLogo} alt="logo" />
            <div className='file-name'>{file.name}</div>
            <div className='file-date'>{file.date.slice(0, 10)}</div>
            <div className='file-size'>{file.size}</div>
        </div>
    );
};

export default File;