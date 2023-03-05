import React from "react";
import "../../assets/frontend/css/nouislider.min.css";
import "../../assets/frontend/css/slick.css";
import "../../assets/frontend/css/style.css";
import Footer from "./Footer";
import SideNav from "./SideNav";
import Avant from "./Avant";
import Avantcentre from "./Avantcentre";

import { Switch ,Route, Redirect} from "react-router-dom";
import routes from "../../routes/routes";
const MasterLayout=()=>{
  return(
    <div>
        <SideNav/>
    <Avantcentre/>
    <div className="section mt-4" data-spy="scroll" data-target="#myScrollspy" data-offset="10" style={{background:"#FFFFFF"}}>
			<div className="container" id="myScrollspy">
				<div className="row">
   
        <Switch>
        {
          routes.map((route,idx)=>{
            return(
              route.component &&(
                <Route
                 key={idx}
                 path={route.path}
                 exact={route.exact}
                 name={route.name}
                 render={(props)=>(
                  <route.component {...props}/>

                 )}
                />
              )
            )
          })}
          <Redirect from="/" to="/dashboard"/>
       </Switch>
				</div>
			</div>
		</div>
    <Avant/>
    <Footer/>
    </div>
  );
}
export default MasterLayout;