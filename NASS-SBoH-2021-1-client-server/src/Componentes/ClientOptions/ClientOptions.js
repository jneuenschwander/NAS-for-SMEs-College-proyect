import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player'
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClientOptions.css';
import Gallerys from '../Gallery';
import * as Icon from 'react-bootstrap-icons';
import {
    Tab, 
    Row,
    Col,
    Nav
} from 'react-bootstrap';

import FileVisor from '../FileVisor';
import VideoVisor  from '../VideoVisor';
import SharedVisor  from '../SharedVisor';

export default function ClientOptions(){


    return(
        <>
            <Tab.Container   defaultActiveKey="files">
                <Row className="options-style">
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        

                        <Nav.Link  eventKey="files">
                            <Icon.FileEarmark size={25}/>
                            Files
                        </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link  eventKey="photos">
                            <Icon.Images size={25}/>
                            Photos
                        </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="videos">
                            <Icon.Film size={25}/>
                            Videos
                        </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="shared">
                            <Icon.People size={25}/>
                            Shared
                        </Nav.Link>
                        </Nav.Item>

                    </Nav>
                    </Col>
                    <Col>
                    <Tab.Content>
                        <Tab.Pane eventKey="files">
                            
                                <FileVisor />
                            
                            
                        </Tab.Pane>
                        <Tab.Pane eventKey="photos">
                            <Gallerys/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="videos">
                            <VideoVisor/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="shared">
                            <SharedVisor/>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}