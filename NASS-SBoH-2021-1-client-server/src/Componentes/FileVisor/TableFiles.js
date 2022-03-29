import 'bootstrap/dist/css/bootstrap.min.css';
import './TableFiles.css';
import React, {useState, useEffect} from 'react';
import {
    Table
} from 'react-bootstrap';
import HeadTableFiles from './HeadTableFiles';
import BodyTableFiles from './BodyTableFiles';
export default function TableFiles(props){
    const {
        deleteFile,
        usersToShare,
        updateShare,
        renameFile,
        downloadFile,
        titles,
        files,
        onClick
    } = props;

    return(
        <>
            <div className="talbe-scroll">
                <Table >
                    <HeadTableFiles titles={titles}/>
                    <BodyTableFiles
                        onClick={onClick}
                        usersToShare={usersToShare}
                        renameFile={renameFile}
                        updateShare={updateShare}
                        deleteFile={deleteFile}
                        downloadFile={downloadFile}
                        titles={titles} 
                        files={files} />
                </Table>
            </div>
        </>
    );
}