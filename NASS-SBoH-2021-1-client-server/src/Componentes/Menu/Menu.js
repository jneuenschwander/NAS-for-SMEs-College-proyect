import React, {useState, useRef} from 'react';
import login from '../../static/login.svg';
import exit from '../../static/box-arrow-right.svg';
import gear from '../../static/gear.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Auth} from '../../Request';
import {useHistory } from "react-router-dom";
import {
    Navbar, 
    Image,
    NavDropdown, 
    Button, 
    Nav, 
    Modal,
    Form
} from 'react-bootstrap';
import './Menu.css';

export default function Menu(props) {
    const history = useHistory();
    const [user, setUser] = useState(props.user);
    const [changePasswd, setChangePasswd] = useState(false);
    const [newPasswd, setNewPasswd] = useState({
        contraseña:"",
        rcontraseña:""
    });
    const handleCerrarSesion = () => {
        localStorage.removeItem('user');
        history.push('/login');

    }
    const contraseñaRef = useRef(null);
    const rcontraseñaRef = useRef(null);

    const closeChangePasswd = () => {
        contraseñaRef.current.style.borderColor = "#ced4da";
        rcontraseñaRef.current.style.borderColor = "#ced4da";
        setChangePasswd(false);
        setNewPasswd({
            contraseña:"",
            rcontraseña:""
        });
        
    }

    const openChangePasswd = () => {
        setChangePasswd(true);
    }

    const handleChangePasswd = () => {
        if(newPasswd.contraseña != "" && newPasswd.rcontraseña != ""){
            if(newPasswd.contraseña == newPasswd.rcontraseña){
                setNewPasswd({
                    contraseña:"",
                    rcontraseña:""
                });
                
                
                Auth.changePasswd(newPasswd.contraseña)
                .then(() => {
                    contraseñaRef.current.style.borderColor = "#ced4da";
                    rcontraseñaRef.current.style.borderColor = "#ced4da";
                    setChangePasswd(false);
                })
                .catch((err) => {
                    contraseñaRef.current.style.borderColor = "red";
                    contraseñaRef.current.style.borderColor = "red";
                    console.log(err);
                });
                
            }
            else{
                contraseñaRef.current.style.borderColor = "red";
                contraseñaRef.current.style.borderColor = "red";
            }
        }
        else{
            contraseñaRef.current.style.borderColor = "red";
            rcontraseñaRef.current.style.borderColor = "red";
        }
    }

    const handleChangeInputsPasswd = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewPasswd({...newPasswd,[name]:value})
    }
    

    
    return(
        <>
            <Navbar bg="primary" variant="dark" className="menu-nav">
                
                <Navbar.Brand href="/home">
                    <Image className="Logo" src={login}/>
                    NASS-SBoH
                </Navbar.Brand>
                <Nav className="mr-auto">
                
                </Nav>
                <Nav>
                <NavDropdown 
                    
                    alignRight
                    title={
                        <Button variant="outline-light">
                        <Image className="icon-exit" src={gear}/>
                        
                    </Button>
                    } 
                    id="collasible-nav-dropdown"
                    >
                    {
                        user.username &&
                        <NavDropdown.Header>
                            {user.username}
                        </NavDropdown.Header>
                    }
                    <NavDropdown.Item onClick={openChangePasswd}>Cambiar contraseña</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleCerrarSesion}>Cerrar sesión</NavDropdown.Item>
                    <NavDropdown.Divider />
                    {
                        user.type_user &&
                        <NavDropdown.Item disabled>{user.type_user}</NavDropdown.Item>
                    }
                    
                </NavDropdown>
                </Nav>
                
            </Navbar>
            <Modal
                show={changePasswd}
                onHide={closeChangePasswd}
                backdrop="static"
            >
                <Modal.Header closeButton >
                    <Modal.Title>Cambiar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group >
                        <Form.Label>Nueva contraseña</Form.Label>
                        <Form.Control 
                            id="contraseña"  
                            name="contraseña" 
                            type="password" 
                            placeholder="Password"
                            ref={contraseñaRef}
                            onChange={handleChangeInputsPasswd} />
                        <Form.Label>Repetir contraseña</Form.Label>
                        <Form.Control 
                            id="rcontraseña"  
                            name="rcontraseña" 
                            type="password" 
                            placeholder="Password"
                            ref={rcontraseñaRef}
                            onChange={handleChangeInputsPasswd} />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeChangePasswd}>
                            Cerrar
                        </Button>
                    <Button variant="primary" onClick={handleChangePasswd}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} 