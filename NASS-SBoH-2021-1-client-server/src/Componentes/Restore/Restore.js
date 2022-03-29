import {useParams, useHistory} from "react-router-dom";
import React, {useState, useRef} from 'react';
import {Auth} from '../../Request';
import { 
    Button, 
    Modal,
    Form
} from 'react-bootstrap';

export default function Restore() {
    const { id } = useParams();
    const [stateForgot , setStateForgot] = useState(true);
    const contraseñaRef = useRef(null);
    const rcontraseñaRef = useRef(null);
    const history = useHistory();
    const forgotPassword = () => {
        history.push('/login');
    }
    const handleChangepassword = () => {
        const contraseña = contraseñaRef.current.value;
        const rcontraseña = rcontraseñaRef.current.value;
        console.log(contraseña, " ",rcontraseña)
        if(contraseña == ""){
            contraseñaRef.current.style.borderColor = "red";
            
        }
        if(rcontraseña == ""){
            rcontraseñaRef.current.style.borderColor = "red";
        }

        if(rcontraseña != "" && contraseña == rcontraseña){
            Auth.restorePasswd(id,contraseña)
            .then(() => {
                history.push('/login');
            })
            .catch((err) => {
                contraseñaRef.current.style.borderColor = "red";
                rcontraseñaRef.current.style.borderColor = "red";
            })
        }
    }
    return (
      <>
            <Modal
                show={stateForgot}
                onHide={forgotPassword}
                backdrop="static"
            >
                <Modal.Header closeButton >
                    <Modal.Title>Recuperar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group >
                        <Form.Label>password</Form.Label>
                        <Form.Control 
                            id="password"  
                            name="password" 
                            type="password" 
                            placeholder="password"
                            ref={contraseñaRef} />
                        <Form.Label>Repetir contraseña</Form.Label>
                        <Form.Control 
                            id="rcontraseña"  
                            name="rcontraseña" 
                            type="password" 
                            placeholder="Password"
                            ref={rcontraseñaRef} />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={forgotPassword}>
                            Cerrar
                        </Button>
                    <Button variant="primary" onClick={handleChangepassword}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </>
     
     );
  }