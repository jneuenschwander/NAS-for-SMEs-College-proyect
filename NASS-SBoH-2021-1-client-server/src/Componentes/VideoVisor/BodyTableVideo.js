import React, {useState, useRef, useEffect} from 'react';
import * as Icon from 'react-bootstrap-icons';
import RowTableVideo from './RowTableVideo';
export default function BodyTableVideo(props){
    const {videos, titles, onClick} = props; //propiedad llegando 
    //console.log(videos)
    return(
        <>
            <tbody className="overflow-auto">
                {
                    videos.map((video, i) => {
                        return(
                        <RowTableVideo 
                        key={i+'-fila'}
                         videos={video}
                          titles={titles}
                          onClick={onClick}/>
                        )
                    })
                }
            </tbody>
        </>
    )
}