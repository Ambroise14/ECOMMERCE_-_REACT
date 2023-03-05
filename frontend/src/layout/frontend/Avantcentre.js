import React from "react";
import { Link } from "react-router-dom";
const Avantcentre=()=>{
  var r="";
  if(localStorage.getItem("auth_name")==="amb@gmail.com"){
    r=<div>
      <nav id="navigation">
    <div className="container">
      <div id="responsive-nav">
        <ul className="main-nav nav navbar-nav">
          <li className="active"><Link to="/dashboard">Home</Link></li>
          <li><Link to="/admin/add-category">Add category</Link></li>
          <li><Link to="/admin/category/all">All</Link></li>
          <li><Link to="/admin/product/add">Add-Product</Link></li>
          <li><Link to="/admin/product/all">All-Product</Link></li>

          <li><Link to="/admin/user/register">Register</Link></li>
       
          <li><Link to="/admin/user/login">Login</Link></li>
          <li><Link to="/admin/product/test">TEST</Link></li>

        </ul>
      </div>
    </div>
  </nav>


  </div>
  }
  return (
 <div>
    {r}
 </div>
  );
}
export default Avantcentre;




