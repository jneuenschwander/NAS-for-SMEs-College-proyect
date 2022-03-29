import React, {useState, useRef} from 'react';
import * as Icon from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    Form,
    Button,
    Nav,

} from 'react-bootstrap';
export default function NavFiles(props){
    const {
        onSyncClick,
    } = props;
    
    return(
        <>
            <Navbar bg="light" expand="lg" style={{ position: "sticky", top: 0, }}>
                <Form>
                    <Button variant="outline-primary" onClick={onSyncClick}>
                        <Icon.ArrowClockwise size={25}/>
                        Sync
                    </Button>
                </Form>
                <Nav className="mr-auto">
                
                </Nav>
               
                
                

                
            </Navbar>
           
        </>
    );
}