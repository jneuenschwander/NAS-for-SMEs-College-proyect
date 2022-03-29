import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useRef} from 'react';
import {
    Button,
    Row,
    Col,
    Dropdown,
    Modal,
    Form
} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

export default function RowTableVideo(props){
    const {
        videos,
        titles,
        onClick,
    } = props;
    //console.log(videos)
    return(
        <>
           <tr onClick={()=>{onClick(videos.url)}}>
               <td>
                    <Icon.Play size={25}/>
               </td>
                {

                    titles.map((title, i) => {
                            if(title === "name"){
                                return(
                                <td className="name-file-a" >
                                    {
                                        videos[title]
                                    }
                                </td>)
                            }

                            else if(title === "modified"  ){
                                return(
                                    <td className="name-file-a" >
                                        {
                                            videos[title]
                                        }
                                    </td>)
                            }


                    })
                }
            </tr>

        </>
    );
}
