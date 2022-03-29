import 'bootstrap/dist/css/bootstrap.min.css';
import RowTableFiles from './RowTableFiles';
import React, {useState, useRef, useEffect} from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Typeahead} from 'react-bootstrap-typeahead'; 
import './BodyTableFiles.css';
import {
    Button,
    Table,
    Modal,
    Form,
    InputGroup
} from 'react-bootstrap';

export default function BodyTableFiles(props){
    
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectFile, setSelectFile] = useState(null);
    const [index, setIndex] = useState(null);
    const [selectedUser, setSelectedUser] = useState([]);
    const [remove, setRemove] = useState([]);
    const {
        titles,
        deleteFile,
        renameFile,
        downloadFile,
        files,
        onClick
    } = props;
  
    return(
        <>
            <tbody className="overflow-auto">
                {
                    files.map((file, i) => {
                        return (
                            <RowTableFiles 
                                onClick={onClick}
                                keyId={i} 
                                key={i+"-BodyTableShared-"+file['_id']} 
                                name={i}
                                titles={titles}
                                downloadFile={downloadFile}
                                deleteFile={deleteFile}
                                renameFile={renameFile}
                                file={file} />
                                )
                    })
                }
            </tbody>
            
        </>
    );
}