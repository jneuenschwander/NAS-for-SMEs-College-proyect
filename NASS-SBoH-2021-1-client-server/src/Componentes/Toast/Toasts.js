import React, {useState ,useEffect, useRef} from 'react';
import {Toast} from 'react-bootstrap';
import './Toasts.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Alertas(props) {
    var { toastList, position } = props;
    const [list, setList] = useState(toastList);
    const [showToasts, setShowToasts] = useState({arrayToasts:[]});
    let startToasts = () => {
        var arrayToasts = [];
        toastList.map((toast, i) => {
            arrayToasts.push(true);
            
        })
        setShowToasts({arrayToasts});
    }


    let toggleShow = (event) => {
        //var tempArray = [...showToasts.arrayToasts];
        var tempArray = JSON.parse(JSON.stringify(showToasts.arrayToasts))
        tempArray[parseInt(event.currentTarget.name)] = false;
        setShowToasts({arrayToasts:tempArray});
        
        
    }
    
    useEffect(() => {
        
        
        setList(toastList)
        startToasts()
        
    }, [toastList]);
    
    return(
        <>
            <div className={`toasts-container  ${position}`}>
                {
                    list.map((toast, i) =>{
                        return (<Toast show={showToasts.arrayToasts[i]}
                            style={{backgroundColor:toast.backgroundColor}}
                            name={i} 
                            key={i} 
                            delay={5000}
                            autohide
                            className={`toast-container ${position}`}>
                            <Toast.Header 
                                className="toast-head"
                                closeButton={false}>
                                <img src={toast.icon} className="rounded mr-2" alt="" />
                                
                                <strong className="mr-auto">{toast.title}</strong>
                                <button name={i} onClick={toggleShow}
                                     type="button" className="ml-2 mb-1 close float-right" data-dismiss="toast" aria-label="Close">
                                    <span aria-hidden="true">x</span>
                                </button>
                            </Toast.Header>
                            <Toast.Body>{toast.description}</Toast.Body>
                        </Toast>)
                    })
                }
            </div>
        </>
    );
    
} 