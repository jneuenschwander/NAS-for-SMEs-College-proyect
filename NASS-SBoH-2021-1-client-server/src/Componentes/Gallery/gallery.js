import React, { useState, useEffect} from "react";
// import Gallery from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";
import 'bootstrap/dist/css/bootstrap.min.css';
import './gallery.css'
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import  processImages  from "./photos";
import File from '../../Request/files';
import { PhoneFill } from "react-bootstrap-icons";
import * as Icon from 'react-bootstrap-icons';
import {
    Button,
    NavDropdown,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col
} from 'react-bootstrap';
const url = "http://nass2.bucaramanga.upb.edu.co/api/file/img/605bfc1e2359e0059d009872"

function Gallerys() {

  const [photos, setPhotos] = useState([]);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(0);
  

 
  useEffect(() => {
    if(photos.length == 0){
      syncImages()
    }
    // processImages()
    // .then(array => setPhotos(array))
    
    // File.getImg(url)
    // .then(img => setPhotos(img))
  },[]);
  // console.log(photos)
  
    function compareDateAsc(a, b){
        var c = new Date(a.modified);
        var d = new Date(b.modified);
        return c-d;

    }
    function compareDateDesc(a, b){
        var c = new Date(a.modified);
        var d = new Date(b.modified);
        return d-c;

    }
    function compareWeigthAsc(a,b){
        let imA = new Image();
        let imB = new Image();
        imA.src = a.url;
        imB.src = b.url;
        const [hA,wA,hB,wB] = [imA.height, imA.width, imB.height, imB.width]
        let weigthA = ((hA*wA)*3)/(1024**2);
        let weigthB = ((hB*wB)*3)/(1024**2);
        //console.log(weigthA ,'mb vs ',weigthB,'mb')
        return weigthA-weigthB;
    }
    function compareWeigthDesc(a,b){
        let imA = new Image();
        let imB = new Image();
        imA.src = a.url;
        imB.src = b.url;
        const [hA,wA,hB,wB] = [imA.height, imA.width, imB.height, imB.width]
        let weigthA = ((hA*wA)*3)/(1024**2);
        let weigthB = ((hB*wB)*3)/(1024**2);
        //console.log(weigthA ,'mb vs ',weigthB,'mb')
        return weigthB-weigthA;
    }


    function compareAsc( a, b ) {
        //console.log(a.title ,'vs',b.title)
        if ( a.title < b.title ){
        return -1;
        }
        if ( a.title > b.title ){
        return 1;
        }
        return 0;
    }
    function compareDesc( a, b ) {
        //console.log(a.title ,'vs',b.title)
        if (  a.title < b.title ){
        return 1;
        }
        if ( a.title > b.title ){
        return -1;
        }
        return 0;
    }


    let sortbyNameAsc = () =>{
      try{
        let tmpPhostos = [...photos]
        console.log(tmpPhostos)
        //console.log('Antes: ', tmpPhostos)
        tmpPhostos.sort(compareAsc)
        //console.log('Despues: ', tmpPhostos)
        setPhotos(tmpPhostos);
      }catch(error){
        console.error(error)
      }
    }
    let sortbyNameDesc = () =>{
      try{
        let tmpPhostos = [...photos] 
        tmpPhostos = tmpPhostos.sort(compareDesc)    
        setPhotos(tmpPhostos);
      }catch(error){
        console.error(error)
      }       
    }

    let sortbyDateAsc = () =>{
      try{
        let tmpPhostos = [...photos]
        tmpPhostos = tmpPhostos.sort(compareDateAsc)  
        setPhotos(tmpPhostos);
      }catch(error){
        console.error(error)
      }              
    }
    let sortbyDateDesc = () =>{
      try{
        let tmpPhostos = [...photos]   
        tmpPhostos = tmpPhostos.sort(compareDateDesc) 
        setPhotos(tmpPhostos)
      }catch(error){
        console.error(error)
      }
    }
    let sortbyweightAsc = () =>{
      try{
        let tmpPhostos = [...photos]  
        tmpPhostos = tmpPhostos.sort(compareWeigthAsc) 
        setPhotos(tmpPhostos)
      }catch(error){
        console.error(error)
      }
    }
    let sortbyweightDesc = () =>{
      try{
        let tmpPhostos = [...photos]  
        tmpPhostos = tmpPhostos.sort(compareWeigthDesc) 
        setPhotos(tmpPhostos)
      }catch(error){
        console.error(error)
      }
    }
    
    let syncImages = () =>{
      const start = Date.now()/1000;
      processImages(setLoaded)
      .then(array => {
        const end = Date.now()/1000;
        console.log('Time: ',end - start)
        setPhotos(array)
      });

    }

    let openLightbox = ( e ) => {
      setCurrentImage(parseInt( e.target.name));
      setViewerIsOpen(true);
    };
  
    let closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };
  return (
    <>
    <Navbar  bg="light" expand="lg"  variant="light">
            <Nav>
            <NavDropdown 
            title={
              <Button variant="outline-dark">
                Sort {''}
              <Icon.Funnel size={20}/>
              </Button>
            } id="collasible-nav-dropdown" >
                <NavDropdown.Item onClick={sortbyNameAsc}>By name <Icon.SortAlphaUp size={23}/></NavDropdown.Item>
                <NavDropdown.Item onClick={sortbyNameDesc}>By name <Icon.SortAlphaDown size={23}/></NavDropdown.Item>
                <NavDropdown.Item onClick={sortbyDateAsc}> By date <Icon.SortUp size={23}/></NavDropdown.Item>
                <NavDropdown.Item onClick={sortbyDateDesc}>By date <Icon.SortDown size={23}/></NavDropdown.Item>
                <NavDropdown.Item onClick={sortbyweightAsc}>By weight <Icon.SortNumericUp size={23}/></NavDropdown.Item>
                <NavDropdown.Item onClick={sortbyweightDesc}>By weight<Icon.SortAlphaDown size={23}/></NavDropdown.Item>
            </NavDropdown> 

            </Nav>
            <Form>
            <Button variant="outline-dark" onClick={syncImages}>
              <Icon.ArrowClockwise size={25}/>
                Sync
            </Button>{' '}
            </Form>
            <Nav className="mr-auto">
                
            </Nav>
            <Navbar.Brand href="#">Gallery</Navbar.Brand>
            </Navbar>
    
    <div className="view-images">
            
      
      <Container >
        <Row>
        { photos &&
          photos.map((image,i) => {
            //console.log(image)
            return (
                
                <Col className="col-lg-4 col-md-12 mb-4 mb-lg-0" key={"container"+i}>
                  {
                    image.load ? (
                      <img
                      loading="lazy"
                      title={image.title}
                      name={i}
                      className="w-100 shadow-1-strong rounded mb-4" 
                      key={i+'-img'} 
                      src={image.url} 
                      alt=""
                      onClick = {(e) => openLightbox(e)}
                      />  
                    ) : 
                    (
                      <img
                      loading="lazy"
                      title={image.title}
                      name={i}
                      className="w-100 shadow-1-strong rounded mb-4" 
                      key={i+'-img'} 
                      src="https://i.stack.imgur.com/ATB3o.gif" 
                      alt=""/> 
                    )
                  }
                    
                  
  
                    
                </Col>

            )
        })
        }
        
        </Row>
        
      </Container>
      {
        photos && viewerIsOpen && <Lightbox images={photos} startIndex={currentImage} onClose={closeLightbox}></Lightbox>
      }
      

      
    </div>
    </>
  );
}
export default Gallerys;





