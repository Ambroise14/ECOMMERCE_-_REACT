
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
const SideNav=()=>{
  const [count,setcont]=useState(0);
  const [category,setcategory]=useState([]);

  const history=useHistory();
  useEffect(()=>{
    
    axios.get('http://127.0.0.1:8000/api/product/all').then((resp)=>{
      if(resp.data.status===200){
          setcategory(resp.data.prod);
          console.log(resp.data.prod);
      }
   })
  },[])
  const logout=()=>{
    axios.post('http://127.0.0.1:8000/api/user/logout').then((resp)=>{
      if(resp.data.status===200){
        localStorage.removeItem('auth_name',resp.data.username);
        localStorage.removeItem('auth_token',resp.data.token);
        history.push('/dashboard');

      }
    })
  }
  var Buttons="";
  if(localStorage.getItem('auth_name')){
    Buttons=(
      <ul className="header-links pull-right">
          <li className="nav-item">
          <Link className="nav-item" to="/admin/user/checkout/historiquepedido">
                Pedido
        </Link>
        </li>
       
          <li className="nav-item">
         <button type="button" onClick={logout} className="btn btn-sm btn-danger">Logout</button>
        </li>
      </ul>
    
    )
  }else{
      Buttons=(
        <ul className="header-links pull-right">
        <li><Link to="/admin/user/register"><i className="fa fa-dollar"></i> Register</Link></li>
        <li><Link to="/admin/user/login"><i className="fa fa-user-o"></i> Login</Link></li>
    </ul>
      )
  }
  return (
    
    <header className="navbar-fixed-topp">
    <div id="top-header">
      <div className="container">
        <ul className="header-links pull-left">
          <li><a href="#"><i className="fa fa-phone"></i> +021-95-51-84</a></li>
          <li><a href="#"><i className="fa fa-envelope-o"></i> email@email.com</a></li>
          <li><a href="#"><i className="fa fa-map-marker"></i> 1734 Stonecoal Road</a></li>
        </ul>
        {Buttons}
      </div>
    </div>

    <div id="header">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="header-logo">
              <Link to="/dashboard" className="logo">
                <img src="/assets/img/logo.png" alt=""/>
              </Link>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="header-search">
              <form>
                <select className="input-select">
                  <option value="0">All Categories</option>
                  {
                    category.map((item)=>{
                      return(
                       <option> <Link to={`/admin/product/detail/${item.id}`}>{item.name}</Link></option>

                      )
                    })
                  }
                </select>
                <input className="input" placeholder="Search here"/>
                <button className="search-btn">Search</button>
              </form>
            </div>
          </div>

          <div className="col-md-3 clearfix">
            <div className="header-ctn">
              <div>
                <a href="#">
                  <i className="fa fa-heart-o"></i>
                  <span>Your Wishlist</span>
                  <div className="qty">2</div>
                </a>
              </div>

              <div className="dropdown">
                <Link to="/admin/user/viewcart" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                  <i className="fa fa-shopping-cart"></i>
                  <span>Your Cart</span>
                  <div className="qty">{count}</div>
                   
                </Link>
               
              </div>

              <div className="menu-toggle">
                <a href="#">
                  <i className="fa fa-bars"></i>
                  <span>Menu</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 

  </header>
  );

}
export default SideNav;