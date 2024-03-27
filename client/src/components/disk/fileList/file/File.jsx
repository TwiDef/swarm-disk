import React from 'react';
import folderLogo from './../../../../assets/img/folder.png';
import fileLogo from './../../../../assets/img/file.png';
import './File.scss';

const File = ({ file }) => {
    return (
        <div className='file'>
            <img className='file-img' src={file.type === 'dir' ? folderLogo : fileLogo} alt="logo" />
            <div className='file-name'>{file.name}</div>
            <div className='file-date'>{file.date.slice(0, 10)}</div>
            <div className='file-size'>{file.size}</div>
        </div>
    );
};

export default File;