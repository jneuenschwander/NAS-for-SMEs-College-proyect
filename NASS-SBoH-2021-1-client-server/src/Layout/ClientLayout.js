import React from 'react';
import {Menu} from '../Componentes/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ClientOptions} from '../Componentes/ClientOptions';
import {Auth} from "../Request";
export default function LayoutMenu(){
    const user = Auth.getUser();
    return(
        <>
        
            <Menu user={user}/>
            <ClientOptions/>
            
        </>
    );
}