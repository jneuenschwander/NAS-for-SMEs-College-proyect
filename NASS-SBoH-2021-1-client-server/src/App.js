import {Login} from './Componentes/Login';
import {Restore} from './Componentes/Restore';
import './App.css';


import React, {useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect, useParams
} from "react-router-dom";
import {PrivateRoute, Authentification, LayoutMenu, ClientLayout,AdminLayout} from './Layout';

function App() {
  document.title = 'JFLS'

  
  //console.log(auth)
  return (
    <Router>
      <Switch>
        
        <Authentification exact path="/login" component={Login}/>
        <PrivateRoute path="/CLIENT" component={ClientLayout} isRol = "CLIENT"/>
        <PrivateRoute path="/ADMIN" component={AdminLayout} isRol = "ADMIN"/>
        <Route path="/forgot/:id" children={<Restore />}/>
        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>

  );
}



export default App;
