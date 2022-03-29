import React from 'react';
import {Auth} from "../Request";
import { Redirect, Route } from 'react-router-dom';



export default function PrivateRoute ({ component: Component, isRol, ...rest })  {

    // Add your own authentication on the below line.
    const role = Auth.whoIAm();
    
    return (
      <Route
        {...rest}
        render={props =>
            role == isRol  ? (
          <Component {...props} />
          
          
            
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    )
  }
  
