import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useRef} from 'react';
import {
    Button,
    Row,
    Col,
    Dropdown,
    Modal,
    Form
} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import './RowTableFiles.css';

export default function RowTableFiles(props){
    const newNameFile = useRef(null);
    const [showRename, setShowRename] = useState(false);
    const unidadAlmacenamiento = [
        'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'
    ];
    const {
        titles,
        onClickShare,
        renameFile,
        downloadFile,
        file,
        keyId,
        onClick,
        deleteFile
    } = props;
    var icon = "";
    if(file.children){
        icon = "folder";
    }
    else{
        icon = "file";
    }
    let showModalRename = () => {
        setShowRename(!showRename);
    }
    let handleRename = () => {
        if(newNameFile.current.value && newNameFile.current.value != ""){
            const estrName = file.name.split('.')
            var realName = ""
            if(file._id){
                realName = newNameFile.current.value + "." + estrName[estrName.length - 1];
            }
            else{
                realName = newNameFile.current.value;
            }
            renameFile(keyId, file._id, realName);
            showModalRename();
        }
    }
    let showSize = (size) => {
        let contador = 0;
        let formatNumber = size
        var length = Math.log(formatNumber) * Math.LOG10E + 1 | 0;
        while(length >= 4){
            formatNumber = formatNumber / 1024;
            length = Math.log(formatNumber) * Math.LOG10E + 1 | 0;
            contador++;
            
        }
        
        return formatNumber.toFixed(2)+" "+unidadAlmacenamiento[contador];
    }

    let showDate = (date) => {
        const now = new Date(Date.now());
        const dateFile = new Date(date);
        var seconds = Math.floor((now - dateFile) / 1000);

        var interval = seconds / 31536000;
        if (interval > 1) {
            const month = dateFile.toLocaleString('default', { month: 'short' });; //months from 1-12
            const day = dateFile.getUTCDate();
            const year = dateFile.getUTCFullYear();
            return month+" "+day+", "+year
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    let onClickDeleteFile = () => {
        deleteFile(keyId,file._id)
    }

    let onClickDownload = () => {
        downloadFile(file);

    }

    let ifFolderShare = (file) => {
        if(!file.children){
            if(file.share && file.share.length > 0){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            var isShare = false;
            for (let j = 0; j < file.children.length; j++) {
                isShare = ifFolderShare(file.children[j]);
                if(!isShare) return isShare;
                
            }
            return isShare;
        }
    }
    let onShareFile = () => {
        onClickShare(keyId, file);
    }
    
    return(
        <>
            <tr>
                <td width="10px">
                    {
                        icon == "folder" ? (<Icon.Folder size={20}/>) : 
                        (<Icon.FileEarmark size={20}/>)
                    }
                </td>
                {
                    titles.map((title, i) => {
                        if(title == "name"){
                            return (
                                
                                    
                                <td 
                                    key={keyId+"-"+i+"-RowTableFiles"+file['_id']} 
                                    className="name-file">
                                    <Row style={{justifyContent:"flex-start"}}>
                                        <Col>
                                            <a className="name-file-a" onClick={() => onClick(keyId, file)}>
                                                {
                                                    file[title]
                                                }
                                            </a>
                                        </Col>
                                        <Col>
                                            <Dropdown className="file-option-drop">
                                                    <Dropdown.Toggle >
                                                        <Icon.ThreeDotsVertical color="black" className="file-option-button-svg "/>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={onClickDeleteFile}>
                                                            Delete
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={showModalRename}>
                                                            Rename
                                                        </Dropdown.Item>
                                                        {   file['share'] &&
                                                            <Dropdown.Item onClick={onShareFile}>
                                                                Share
                                                            </Dropdown.Item>
                                                        }

                                                        <Dropdown.Item onClick={onClickDownload}>
                                                            Download
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                
                                            </Dropdown>
                                        </Col>
                                    </Row>
                                    
                                </td>)
                        }
                        if(title == "size" && !file[title]){
                            return(
                                <td 
                                    key={keyId+"-"+i+"-RowTableFiles"+file['_id']}>
                                    {
                                        file.children.length == 1 ? 
                                            (file.children.length+" item") :
                                            (file.children.length+" items")
                                    }
                                </td>
                            );
                        }
                        else if(title == "size" && file[title]){
                            return(
                                <td 
                                    key={keyId+"-"+i+"-RowTableFiles"+file['_id']}>
                                    {
                                        showSize(file[title])
                                    }
                                </td> 
                            );
                        }
                        else if(title == "modified" && file[title]){
                            return(
                                <td 
                                    key={keyId+"-"+i+"-RowTableFiles"+file['_id']}>
                                    {
                                        
                                        showDate(file[title])
                                    }
                                </td> 
                            );
                        }
                        else if(title == "share" && file[title]){
                            return(
                                <td className="name-file-a"
                                    key={keyId+"-"+i+"-RowTableFiles"+file['_id']} onClick={onShareFile}>
                                    {
                                        ifFolderShare(file) > 0 ? "Shared" : "Private"
                                    }
                                </td> 
                            );
                        }
                        return (<td 
                                    key={keyId+"-"+i+"-RowTableFiles"+file['_id']}>
                                    {
                                        file[title]
                                    }
                                </td>);
                    })
                }
            </tr>
            <Modal show={showRename} onHide={showModalRename}>
                <Modal.Header closeButton>
                    <Modal.Title>
                            <Icon.Tools size={25}/> {' '}
                            Rename
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                                <Form.Label>
                                    New name
                                </Form.Label>
                                <Form.Control type="text" placeholder="Name without extension" ref={newNameFile}/>
                            </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showModalRename}>
                            Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleRename}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}