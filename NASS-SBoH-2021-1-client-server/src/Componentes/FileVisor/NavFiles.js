import React, {useState, useRef} from 'react';
import * as Icon from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    Form,
    Button,
    Nav,
    Modal

} from 'react-bootstrap';
export default function NavFiles(props){
    const {
        onNewFolderClick,
        size,
        onSyncClick,
        newFile
    } = props;
    const [showNewFolder, setShowNewFolder] = useState(false);
    const [showNewFile, setShowNewFile] = useState(false);
    const folderName = useRef(null);
    const newFileUp = useRef(null);

    let showCreateFolder = () => {
        setShowNewFolder(!showNewFolder)
    }
    let handleCreateFolder = () => {
        if(folderName.current.value){
            var newFolder = {
                name:folderName.current.value,
                children:[]
            }
            onNewFolderClick(newFolder);
        }
        showCreateFolder()
    }

    let showCreateFile = () => {
        setShowNewFile(!showNewFile)
    }
    let handleCreateFile = () => {
        showCreateFile();
        newFile(newFileUp.current.files[0])
    }
    
    return(
        <>
            <Navbar bg="light" expand="lg" style={{ position: "sticky", top: 0, }}>
                <Form>
                    <Button variant="outline-primary" onClick={showCreateFolder}>
                        <Icon.FolderPlus size={25}/>
                        Folder
                    </Button>{' '}
                    <Button variant="outline-primary" onClick={showCreateFile}>
                        <Icon.FileEarmarkArrowUp size={25}/>
                        Upload
                    </Button>{' '}
                    <Button variant="outline-primary" onClick={onSyncClick}>
                        <Icon.ArrowClockwise size={25}/>
                        Sync
                    </Button>
                </Form>
                <Nav className="mr-auto">
                
                </Nav>
                <Navbar.Brand>{(100*size.size/size.maxsize).toFixed(1)}% in use</Navbar.Brand>
                
                

                
            </Navbar>
            <Modal show={showNewFolder} onHide={showCreateFolder}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Icon.FolderPlus size={25}/> {' '}
                        New folder
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Folder name
                            </Form.Label>
                            <Form.Control type="text" placeholder="Name" ref={folderName}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showCreateFolder}>
                            Cerrar
                        </Button>
                    <Button variant="primary" onClick={handleCreateFolder}>
                        Aceptar
                    </Button>
                </Modal.Footer>
                
            </Modal>
            <Modal show={showNewFile} onHide={showCreateFile}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Icon.FileEarmarkCheck size={25}/> {' '}
                        New file
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.File id="file" label="Selec one file to upload" ref={newFileUp}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={showCreateFile}>
                            Cerrar
                        </Button>
                    <Button variant="primary" onClick={handleCreateFile}>
                        Aceptar
                    </Button>
                </Modal.Footer>
                
            </Modal>
        </>
    );
}