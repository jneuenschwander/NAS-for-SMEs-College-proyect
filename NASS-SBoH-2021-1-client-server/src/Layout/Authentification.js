import React from 'react';
import {Auth} from "../Request";
import { Redirect, Route } from 'react-router-dom';

export default function Authentification ({ component: Component, ...rest })  {

    // Add your own authentication on the below line.
    const role = Auth.whoIAm();
  
    return (
      <Route
        {...rest}
        render={props =>
          role ? (
            <Redirect to={{ pathname: `/${role}`, state: { from: props.location } }} />
          ) : (
            <Component {...props}/>
          )
        }
      />
    )
  }