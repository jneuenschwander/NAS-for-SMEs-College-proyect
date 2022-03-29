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
        usersToShare,
        updateShare,
        deleteFile,
        renameFile,
        downloadFile,
        files,
        onClick
    } = props;
    let showShare =() => {
       setShowShareModal(!showShareModal);
       setSelectFile(null)
       setSelectedUser([])
       setIndex(null)
       setRemove([]);
        
        
    }
    
    let showShareFile = (index, file) => {
        setShowShareModal(!showShareModal);
        setSelectFile(file);
        setIndex(index);
    }

    let addUserToShare = () => {
        
        if(selectedUser.length>0){
            let tmpFile = {...selectFile};
            let share = [...tmpFile.share];
            let find = share.filter(element => {
                if(element.username == selectedUser[0].username) return element
            })
            
            if(find.length == 0){
                console.log(find)
                share.push({
                    user_id:selectedUser[0].username,
                    write:false
                });
                tmpFile.share = share;
                setSelectFile(tmpFile);
            }
            setSelectedUser([])
            

        }
        

    }
    let onChangeWrite = (e) => {
        let index = parseInt(e.currentTarget.name);
        let tmpFile = {...selectFile};
        let share = [...tmpFile.share];
        let tmp = {...share[index]};
        tmp.write = e.currentTarget.value
        share[index] = tmp;
        tmpFile.share = share;
        setSelectFile(tmpFile);
        
    }
    let onRemoveClick = (e) => {
        let index = parseInt(e.currentTarget.name);
        let tmpFile = {...selectFile};
        let tmpRemove = [...remove];
        let share = [...tmpFile.share];
        tmpRemove.push(share[index].user_id);
        share.splice(index, 1);
        tmpFile.share = share;
        setSelectFile(tmpFile); 
        setRemove(tmpRemove)
    }
    let onSaveChangeShareClick = () =>{
        updateShare(index, selectFile, remove);
        showShare()
    }
    return(
        <>
            <tbody className="overflow-auto">
                {
                    files.map((file, i) => {
                        return (
                            <RowTableFiles 
                                onClick={onClick}
                                keyId={i} 
                                key={i+"-BodyTableFiles-"+file['_id']} 
                                name={i}
                                onClickShare={showShareFile}
                                titles={titles}
                                downloadFile={downloadFile}
                                deleteFile={deleteFile}
                                renameFile={renameFile}
                                file={file} />
                                )
                    })
                }
            </tbody>
            {   selectFile &&
                <Modal show={showShareModal} onHide={showShare} style={{height:"100%", maxHeight:"90vh",overflowY:"hidden"}}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                                <Icon.Share size={25}/> {' '}
                                Share {selectFile ? selectFile.name : ""}
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <Form>
                            <Form.Group style={{height:"100%", maxHeight:"40vh",overflowY:"auto"}}>
                                <Table  >
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Write</th>
                                            <th>{' '}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            selectFile.share.map((user,i) => {
                                                return(
                                                    <tr key={`shareModal-${i}`} id={i}>
                                                        <td key={'1-'+i}>
                                                            {
                                                                user.user_id
                                                            }
                                                        </td>
                                                        <td key={'2-'+i}>
                                                            <Form.Check name={i} key={'write-'+i}
                                                                value={user.write}
                                                                onChange={(e) => onChangeWrite(e)}
                                                                type="radio"
                                                                />
                                                        </td>
                                                        <td key={'3-'+i}>
                                                            <Button name={i}
                                                                key={'remove-'+i}
                                                                onClick={(e) => onRemoveClick(e)}
                                                                variant="danger"
                                                                className="buttons-icon-user-select">
                                                                <Icon.PersonDash size={25}/>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </Table>     
                            </Form.Group>        
                        </Form>
                        <Form>
                        <Form.Label>User</Form.Label>
                        <Form.Group>
                        <InputGroup>
                        
                           
                                
                           <Typeahead style={{width:"90%"}}
                                   id="basic-typeahead-single"
                                   labelKey="username"
                                   onChange={(selected) => {setSelectedUser(selected)}}
                                   options={usersToShare.users}
                                   selected={selectedUser}
                                   placeholder="Choose user to share..."

                                   />
                            <InputGroup.Prepend>
                                <Button onClick={addUserToShare}
                                    variant="success"
                                    key="add"
                                    className="buttons-icon-user-select">
                                        
                                    <Icon.PersonPlus size={20} />
                                </Button>  
                            </InputGroup.Prepend>
                                   
                        </InputGroup>
                        </Form.Group>

                        </Form>

                        


                        
                            
                            
                        
                    </Modal.Body>
                    <Modal.Footer>


                    <Button variant="secondary" onClick={showShare}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={onSaveChangeShareClick}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
}