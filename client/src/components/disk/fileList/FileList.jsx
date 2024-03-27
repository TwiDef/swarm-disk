import React from 'react';
import './FileList.scss';
import { useSelector } from 'react-redux';
import File from './file/File';

const FileList = () => {

    const files = useSelector(state => state.file.files)

    return (
        <div className='filelist'>
            <div className='filelist-header'>
                <div className="filelist-name">Название</div>
                <div className="filelist-date">Дата</div>
                <div className="filelist-size">Размер</div>
            </div>
            {files.map((file, i) => <File key={i} file={file} />)}
        </div>

    );
};

export default FileList;