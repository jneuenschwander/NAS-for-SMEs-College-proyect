import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Path.css'
import {
    Breadcrumb,
} from 'react-bootstrap';


export default function Path(props){
    const {
        path,
        onClickPath
    } = props;
    const onClick = (e) => {
        console.log(e.currentTarget.id)
        const index = parseInt(e.currentTarget.id);
        onClickPath(index);
    }
    var collapse = false
    return(
        
        <>
            <Breadcrumb>
                { path &&
                    path.map((item,i) => {
                        if (i == path.length - 1){
                            return <Breadcrumb.Item id={i} key={i} active>{item.name}</Breadcrumb.Item>
                        }
                        else if (i> 5 && i < path.length - 5){
                            if(!collapse){
                                collapse = true;
                                return <Breadcrumb.Item id={i} key={i} >...</Breadcrumb.Item>
                            }
                            
                            
                        }
                        else{
                            return <Breadcrumb.Item id={i} key={i} onClick={onClick}>{item.name}</Breadcrumb.Item>
                        }
                        
                    })
                }
            </Breadcrumb>
        </>
    );
}