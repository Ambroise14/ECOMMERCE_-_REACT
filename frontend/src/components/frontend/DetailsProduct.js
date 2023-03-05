import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
const DetailsProduct=(props)=>{
  const [product,setProduct]=useState([]);
  const [catI,setI]=useState([]);
  
  const [loading,setLoading]=useState(true);
 const [Quantity,setQuantity]=useState(1);
 const history=useHistory();

 const btnIcremente=()=>{
  if(Quantity<10){
    setQuantity((preventquantity)=>preventquantity+1)

  }
 
 }
 const handleInput=(e)=>{
  e.persist();
  setQuantity({...Quantity,[e.target.name]:e.target.value})
}
 const btnDcremente=()=>{
  if(Quantity>1){
    setQuantity((preventquantity)=>preventquantity-1)

  }
 }
  useEffect(()=>{
    const id=props.match.params.id;
    axios.get(`http://127.0.0.1:8000/api/product/edit/${id}`).then((resp)=>{
      if(resp.data.status===200){
        setLoading(false);
        setProduct(resp.data.prod);
        console.log(resp.data.cat)
        setI(resp.data.cat);
      }
    })
  },[props.match.params.id]);

  const addcart=(e,id)=>{
    const datacart={
      product_quantity:Quantity
    }
 
    axios.post(`http://127.0.0.1:8000/api/product/add-cart/${id}`,datacart).then((resp)=>{
    if(resp.data.status===401){
      history.push('/admin/user/login');
      }else if(resp.data.status===409){
        swal('warning',resp.data.message,"success");
      }else if(resp.data.status===200){
        history.push('/admin/user/viewcart');
      }
    })
  }
  var I,H="";
 if(loading){
 H=<img src={`http://127.0.0.1:8000/images/ajax-loader.gif`} height="50px" width="50px" style={{marginLeft:"100px"}}/>
 }else{
  H=<div id="product-imgs">
  <div className="product-preview">
    <img src={`http://127.0.0.1:8000/images/product/${product.image}`} alt=""/>
  </div>

  <div className="product-preview">
  <img src={`http://127.0.0.1:8000/images/product/${product.image}`} alt=""/>

  </div>

  <div className="product-preview">
  <img src={`http://127.0.0.1:8000/images/product/${product.image}`} alt=""/>

  </div>

  <div className="product-preview">
    <img src="./img/product08.png" alt=""/>
  </div>
</div>
 }

  I=catI.map((item)=>{
       
     return(
      <div className="col-sm-3"  key={item.id}>
      <div className="product">
    <div className="product-img">
      <Link to={`/admin/product/detail/${item.id}`}>
      <img src={`http://127.0.0.1:8000/images/product/${item.image}`}  alt=""  height='150px' width='263px'/>
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
      <button className="add-to-cart-btn" onClick={(e)=>addcart(e,item.id)}><i className="fa fa-shopping-cart"></i> add to cart</button>
    </div>
  </div>
    </div>
     )
  })

  return(
    <div className="section">
    <div className="container">
      <div className="row">
        <div className="col-md-5 col-md-push-2">
          <div id="product-main-img">
            <div className="product-preview">
            <img src={`http://127.0.0.1:8000/images/product/${product.image}`} alt=""/>

            </div>

          
          </div>
        </div>

        <div className="col-md-2  col-md-pull-5">
          {H}
        </div>

        <div className="col-md-5">
          <div className="product-details">
            <h2 className="product-name"><strong>{product.name}</strong></h2>
            <div>
              <div className="product-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <a className="review-link" href="#">10  Add your review</a>
            </div>
            <div>
              <h3 className="product-price">$ {product.price}<del className="product-old-price">$ {product.price}</del></h3>
              <span className="product-available">In Stock</span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

            <div className="product-options">
              <label>
                Size
                <select className="input-select">
                  <option value="0">X</option>
                </select>
              </label>
              <label>
                Color
                <select className="input-select">
                  <option value="0">Red</option>
                </select>
              </label>
            </div>

            <div className="add-to-cart">
              <div className="qty-label">
                Qty
                <div className="input-number">
                  <input type="number" value={Quantity} name="quantity" onChange={handleInput}/>
                  <span className="qty-up" onClick={btnIcremente}>+</span>
                  <span className="qty-down" onClick={btnDcremente}>-</span>
                </div>
              </div>
              <button className="add-to-cart-btn" onClick={(e)=>addcart(e,product.id)}><i className="fa fa-shopping-cart"></i> add to cart</button>
            </div>

            <ul className="product-btns">
              <li><a href="#"><i className="fa fa-heart-o"></i> add to wishlist</a></li>
              <li><a href="#"><i className="fa fa-exchange"></i> add to compare</a></li>
            </ul>

            <ul className="product-links">
              <li>Category:</li>
              <li><a href="#">Headphones</a></li>
              <li><a href="#">Accessories</a></li>
            </ul>

            <ul className="product-links">
              <li>Share:</li>
              <li><a href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
              <li><a href="#"><i className="fa fa-envelope"></i></a></li>
            </ul>

          </div>
        </div>

        <div className="col-md-12">
          <div id="product-tab">
            <ul className="tab-nav">
              <li className="active"><a data-toggle="tab" href="#tab1">Description</a></li>
              <li><a data-toggle="tab" href="#tab2">Details</a></li>
              <li><a data-toggle="tab" href="#tab3">Reviews (3)</a></li>
            </ul>

            <div className="tab-content">
              <div id="tab1" className="tab-pane fade in active">
                <div className="row">
                  <div className="col-md-12">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
              </div>

              <div id="tab2" className="tab-pane fade in">
                <div className="row">
                  <div className="col-md-12">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
              </div>


              
              <div id="tab3" className="tab-pane fade in">
                <div className="row">
                  <div className="col-md-12">
                    <p>Lorem ipsum officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-md-12">
						<div className="row">
							<div className="products-tabs">
								<div id="tab1" className="tab-pane active">
									<div className="products-slick" data-nav="#slick-nav-1">
                     {I}
									</div>
									<div id="slick-nav-1" className="products-slick-nav"></div>
								</div>
							</div>
						</div>
					</div>
  </div>

  
  );
 
  }

export default DetailsProduct;