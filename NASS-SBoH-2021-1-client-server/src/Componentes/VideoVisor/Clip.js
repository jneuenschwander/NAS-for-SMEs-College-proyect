import React, {useRef,useEffect} from 'react';
import './Clip.css'

export default function Clip({ url }) {
    const videoRef = useRef();
    const previousUrl = useRef(url);
  
    useEffect(() => {
      if (previousUrl.current !== url && videoRef.current) {
        videoRef.current.load();
        previousUrl.current = url;
      }
    }, [url]);
  
    return (
      <video className="vide-clip" ref={videoRef} height="50%" width="100%"  controls>
        <source src={url || ""} />
      </video>
    );
  }