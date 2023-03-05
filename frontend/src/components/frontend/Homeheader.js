import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Carousel from "./Carousels";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function Homeheader(){
  const [ListP,setProduct]=useState([]);
  const [L,setL]=useState([]);
  const [loading,setLoading]=useState(true);
 const history=useHistory();

  useEffect(()=>{
      axios.get('http://127.0.0.1:8000/api/product/all').then((resp)=>{
          if(resp.data.status===200){
              setProduct(resp.data.prod);
              setL(resp.data.status1);
              setLoading(false);
          }

      })
      .catch(function (error) {
          console.log(error);
        });
  },[]);

  const addcart=(e,id)=>{
    axios.post(`http://127.0.0.1:8000/api/product/add-cart/${id}`).then((resp)=>{
    if(resp.data.status===401){
      history.push('/admin/user/login');
      }else if(resp.data.status===409){
        swal('warning',resp.data.message,"success");
      }
    })
  }

  var listproduct="";
  if(loading){
    listproduct= <img src={`http://127.0.0.1:8000/images/re.gif.crdownload`} height="100px" width="100px" style={{marginLeft:"230px"}}/>
  }else{
    listproduct=
    ListP.map((item)=>{
      return(
        <div className="col-sm-4 text-center"  key={item.id}>
          <div className="product">
        <div className="product-img">
          <Link to={`/admin/product/detail/${item.id}`}>
          <img src={`http://127.0.0.1:8000/images/product/${item.image}`}  alt=""  height='130px' width='180px'/>
          </Link>
          <div className="product-label">
            <span className="new">NEW</span>
          </div>
        </div>
        <div className="product-body card-footer">
          <p className="product-category">Category</p>
          <h6 className="product-name"><a href="#"><p>{item.name}</p></a></h6>
          <h4 className="product-price">$ {item.price}<del className="product-old-price">$990.00</del></h4>
          <div className="product-rating">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-o"></i>
          </div>
          <div className="product-btns">
            <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
            <button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button>
            <button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>
          </div>
        </div>
        <div className="add-to-cart">
          <button className="add-to-cart-btn" onClick={(e)=>addcart(e,item.id)}  data-toggle="modal" data-target="#myModals"><i className="fa fa-shopping-cart"></i> add to cart</button>
        </div>
      </div>
        </div>

      )
    })
  }
return(
  
<div className="section">
  <Carousel/>
  <br/><br/>
			<div className="container">
				<div className="row">

					<div className="col-md-12">
						<div className="section-title">
							<h5 className="title">New Products</h5>
							<div className="section-nav">
								<ul className="section-tab-nav tab-nav">
									<li className="active"><a data-toggle="tab" href="#tab1">Laptops</a></li>
									<li><a data-toggle="tab" href="#tab1">Smartphones</a></li>
									<li><a data-toggle="tab" href="#tab1">Cameras</a></li>
									<li><a data-toggle="tab" href="#tab1">Accessories</a></li>
								</ul>
							</div>
						</div>
					</div>


          <div className="col-md-3">
					<div className="aside">
              {
                L?.map((item)=>{
                  return(
                    <div className="card" style={{Top:"-20px"}} key={item.id}>
                    <div className="product-img">
                    <Link to={`/admin/product/detail/${item.id}`}>
                    <img src={`http://127.0.0.1:8000/images/product/${item.image}`} style={{width:"130px",height:"80px"}}/>
                    </Link>
                    </div>
                    <div className="card-body" style={{marginTop:"10px"}}>
                      <h5 className="product-name text-danger" style={{marginTop:"15px"}}>{item.name} </h5>
                      <h4 className="product-price"><del className="product-old-price text-primary">RS:{item.price} </del></h4>
                      
                    </div>
                
                  </div>
                  )
                })
              }
             
						</div>
					</div>
					<div className="col-md-9">
						<div className="row">
							<div className="products-tabs">
								<div id="tab1" className="tab-pane active">
									<div className="products-slick" data-nav="#slick-nav-1">
                    {listproduct}

									</div>
									<div id="slick-nav-1" className="products-slick-nav"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
      <div id="myModals" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div className="modal-content modal-dialog-centered">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Modal Header</h4>
        </div>
        <div className="modal-body">
          <text>UM produto foi adic ionado no carrinho</text>
            <Link to="/admin/user/viewcart" className="btn btn-primary">Ir AO CARRINHO</Link>
        </div>
        <div className="modal-footer">
        </div>
      </div>
  
    </div>
       </div>
		</div>
);
}
export default Homeheader;