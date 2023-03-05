import axios from "axios";
import React from "react";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import MasterLayout from "./layout/frontend/MasterLayout";
import "./index";
axios.defaults.withCredentials=true;
axios.interceptors.request.use(function(config){
  const token=localStorage.getItem('auth_token');
  config.headers.Authorization=token ? `Bearer ${token}` :'';
  return config;
})
function App() {
  return (
    <Router>
    
    <Switch>
      <Route path="/" name="Admin" render={(props)=><MasterLayout {...props}/>} />

    </Switch>
   </Router>
  );
}

export default App;
