import React, {useState, useEffect} from 'react';
import TableVideo from './TableVideo';
import {File} from '../../Request';
import Clip from './Clip';
export default function VideoVisor(props){
    const [videos,setVideo] = useState(null);
    const [actualVideo, setActualVideo] = useState(null);
    console.log(actualVideo)
    useEffect(()=>{
        reload()  
    },[]);
    
    let showRepro = (url) =>{
        console.log('funciona')
        setActualVideo(url)
    }
    let reload = ()=> {
        File.getVideos()
        .then((res)=>{
            var tmpvideo = res.data.videos;
            setVideo(tmpvideo)

        })
        .catch((error) => {
                console.log(error);
            }
        )
    }
    
    return(
        <>
        {
            videos &&  <Clip url={actualVideo}/>
        }
        <div></div>  
        {
           videos && <TableVideo
                videos={videos}
                titles={['name','modified']}
                onClick={showRepro}
            />
        }
 
        </>
    );
}