
//import { render } from '@testing-library/react';
import React, {useState, useRef} from 'react';
import {Form, Container, Image, Row ,Modal, Button} from 'react-bootstrap';
import {Alertas} from '../Toast';
import TriangleAlert from '../../static/alertas/exclamation-triangle.svg' 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import '../Toast/Toasts.css';
import login from '../../static/login.svg';
import {
    useHistory
  } from "react-router-dom";

import {Auth} from '../../Request';

export default function Login(props){
    let history = useHistory();


    const [auth, setAuth] = useState({userName:'', userPassword:''});
    const [stateForgot, setStateForgot] = useState(false);
    const emailRef = useRef(null);
    
    
    const [alerta, setAlerta] = useState([]);
    let getCredentials = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        if(name == 'userName'){
            setAuth({
                userName:value
            });
        }
        else if (name == 'userPassword'){
            setAuth({
                userName:auth['userName'],
                userPassword:value 
            });
        }
    }

    let autentificar = () => {
        if(auth.userName != '' && auth.userPassword != ''){
            Auth.Login(auth.userName, auth.userPassword)
            .then((res) => {

                localStorage.setItem('user',JSON.stringify(res.data));
                if(res.data.type_user == 'ADMIN'){
                    history.push('/admin');
                }
                else if(res.data.type_user == 'CLIENT'){
                    history.push('/client');
                }
                
            })
            .catch((err) => {
                setAlerta([{
                    title: 'Warning',
                    description: 'Credenciales invalidas',
                    backgroundColor:'#f39c12',
                    icon:TriangleAlert
                }]);
            });
            
        }
        else {
            setAlerta([{
                title: 'Warning',
                description: 'El usuario y la clave no pueden estar vacios',
                backgroundColor:'#f39c12',
                icon:TriangleAlert
            }]);
        }

        
        
    };
    const handleChangePasswd = () => {
        const email = emailRef.current.value;
        if(email){
            Auth.forgotPasswd(email)
            .then(() => {
                setStateForgot(false);
                emailRef.current.style.borderColor = "#ced4da";
            })
            .catch((err) => {
                emailRef.current.style.borderColor = "red";
            });
        }
        else{
            emailRef.current.style.borderColor = "red";
        }
        
    }

    let forgotPassword = () => {
        setStateForgot(!stateForgot);
        if(emailRef.current) emailRef.current.style.borderColor = "#ced4da";
        
    }

    return(
        <>
            <div className="App">
                <div className="Login">
                    <Form className="form-login">
                        <Form.Group>
                            <Container>
                                <Row className="justify-content-md-center">
                                    <Image className="Logo-login" src={login}/>
                                </Row>
                                
                            </Container>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Username
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="userName" onChange={getCredentials}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control type="password" placeholder="Password" name="userPassword" onChange={getCredentials}/> 
                        </Form.Group>
                        <Form.Group>
                            <Button onClick={autentificar} variant="primary" block>
                                Iniciar sesión
                            </Button>
                            <Button variant="link" className="float-right" onClick={forgotPassword}>¿Olvidaste tu contraseña?</Button>
                        </Form.Group>
                        <Form.Group>
                            
                        <Alertas toastList={alerta} position="abs-bot-rigth"/>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            <Modal
                show={stateForgot}
                onHide={forgotPassword}
                backdrop="static"
            >
                <Modal.Header closeButton >
                    <Modal.Title>Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            id="email"  
                            name="email" 
                            type="email" 
                            placeholder="Email"
                            ref={emailRef} />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={forgotPassword}>
                            Cerrar
                        </Button>
                    <Button variant="primary" onClick={handleChangePasswd}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}