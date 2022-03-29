import React from 'react';
import {Menu} from '../Componentes/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TablaUser} from '../Componentes/ListarUsers/Listar';
import {Auth} from "../Request";
export default function LayoutMenu(){
    const user = Auth.getUser();

    
     return(
        <>
        
            <Menu user={user}/>
        
            <TablaUser></TablaUser>
          
            
        </>
    ); 
}