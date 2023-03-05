import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const Details2=(props)=>{
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
      }
    })
  }
  return(
    <div className="section">
  <div className="container">
    <div className="row">
      <div className="col-md-5 col-md-push-2 ma">
        <div id="product-main-img">
         
        debut foreach pour commentaire

        <div className="product-preview">
        <img src="" />
          </div>
          debut foreach pour commentaire

        </div>
      </div>

      <div className="col-md-2  col-md-pull-5 ma">
        <div id="product-imgs">


        debut foreach pour commentaire

        <div className="product-preview">
        <img src="" />
          </div>
          debut foreach pour commentaire

        </div>
      </div>

      <div className="col-md-5">
        <div className="product-details">
          <h2 className="product-name">Name</h2>
          <div>
            <div className="product-rating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
            <a className="review-link" href="#">10 Review(s) | Add your review</a>
          </div>
          <div>
            <h3 className="product-price">$ .00 <del className="product-old-price">$ .00</del></h3>
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
            <li><a data-toggle="tab" href="#tab3">Reviews count coments</a></li>
          </ul>

          <div className="tab-content">
            <div id="tab1" className="tab-pane fade in active">
              <div className="row">
                <div className="col-md-12">
                <div id="tab3" className="tab-pane fade in">
              <div className="row">
                <div className="col-md-3">
                  <div id="rating">
                    <div className="rating-avg">
                      <span>4.5</span>
                      <div className="rating-stars">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                      </div>
                    </div>
                    <ul className="rating">
                      <li>
                        <div className="rating-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                        <div className="rating-progress">
                          <div >s</div>
                        </div>
                        <span className="sum">3</span>
                      </li>
                      <li>
                        <div className="rating-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                        <div className="rating-progress">
                          <div>s</div>
                        </div>
                        <span className="sum">2</span>
                      </li>
                      <li>
                        <div className="rating-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                        <div className="rating-progress">
                          <div></div>
                        </div>
                        <span className="sum">0</span>
                      </li>
                      <li>
                        <div className="rating-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                        <div className="rating-progress">
                          <div></div>
                        </div>
                        <span className="sum">0</span>
                      </li>
                      <li>
                        <div className="rating-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                        <div className="rating-progress">
                          <div></div>
                        </div>
                        <span className="sum">0</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6">
                  <div id="reviews">
                    <ul className="reviews">
                   debut foreach pour commentaire
                  <li>
                        <div className="review-heading">
                         <p></p>
                          <div className="review-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o empty"></i>
                          </div>
                        </div>
                        <div className="review-body">
                          <p>Commentaire ici</p>
                        </div>
                      </li>
                      fin foreach pour commentaire

                    </ul>
                   
                  </div>
                </div>

                <div className="col-md-3">
                  <div id="review-form">
                    <form className="review-form">
                      <input type="hidden" name="product_id"/>
                      <input className="input" type="text" name="name" placeholder="Your Name"/>
                      <textarea className="input" placeholder="Your Review" name="commentaire"></textarea>
                      <div className="input-rating">
                        <span>Your Rating: </span>
                        <div className="stars">
                          <input id="star5" name="rating" value="5" type="radio"/><label for="star5"></label>
                          <input id="star4" name="rating" value="4" type="radio"/><label for="star4"></label>
                          <input id="star3" name="rating" value="3" type="radio"/><label for="star3"></label>
                          <input id="star2" name="rating" value="2" type="radio"/><label for="star2"></label>
                          <input id="star1" name="rating" value="1" type="radio"/><label for="star1"></label>
                        </div>
                      </div>
                      <button className="primary-btn">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
                </div>
              </div>
            </div>

            <div id="tab2" className="tab-pane fade in">
              <div className="row">
                <div className="col-md-12">
                <p>DESCRIPTION ICI</p>
                </div>
              </div>
            </div>

            <div id="tab3" className="tab-pane fade in">
              <div className="row">
                <div className="col-md-3">
                  <div id="rating">
                    <div className="rating-avg">
                      <span>4.5</span>
                      <div className="rating-stars">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                      </div>
                    </div>
                    <ul className="rating">
                      <li>
                        <div className="rating-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                        <div className="rating-progress">
                          <div>s</div>
                        </div>
                        <span className="sum">3</span>
                      </li>
                      <li>
                        <div className="rating-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                        <div className="rating-progress">
                          <div>d</div>
                        </div>
                        <span className="sum">2</span>
                      </li>
                      <li>
                        <div className="rating-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                        <div className="rating-progress">
                          <div></div>
                        </div>
                        <span className="sum">0</span>
                      </li>
                      <li>
                        <div className="rating-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                        <div className="rating-progress">
                          <div></div>
                        </div>
                        <span className="sum">0</span>
                      </li>
                      <li>
                        <div className="rating-stars">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                        <div className="rating-progress">
                          <div></div>
                        </div>
                        <span className="sum">0</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-6">
                  <div id="reviews">
                    <ul className="reviews">
                      <li>
                        <div className="review-heading">
                          <h5 className="name">John</h5>
                          <p className="date">27 DEC 2018, 8:0 PM</p>
                          <div className="review-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o empty"></i>
                          </div>
                        </div>
                        <div className="review-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        </div>
                      </li>
                      <li>
                        <div className="review-heading">
                          <h5 className="name">John</h5>
                          <p className="date">27 DEC 2018, 8:0 PM</p>
                          <div className="review-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o empty"></i>
                          </div>
                        </div>
                        <div className="review-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        </div>
                      </li>
                      <li>
                        <div className="review-heading">
                          <h5 className="name">John</h5>
                          <p className="date">27 DEC 2018, 8:0 PM</p>
                          <div className="review-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o empty"></i>
                          </div>
                        </div>
                        <div className="review-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                        </div>
                      </li>
                    </ul>
                    <ul className="reviews-pagination">
                      <li className="active">1</li>
                      <li><a href="#">2</a></li>
                      <li><a href="#">3</a></li>
                      <li><a href="#">4</a></li>
                      <li><a href="#"><i className="fa fa-angle-right"></i></a></li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-3">
                  <div id="review-form">
                    <form className="review-form">
                      <input className="input" type="text" placeholder="Your Name"/>
                      <input className="input" type="email" placeholder="Your Email"/>
                      <textarea className="input" placeholder="Your Review"></textarea>
                      <div className="input-rating">
                        <span>Your Rating: </span>
                        <div className="stars">
                          <input id="star5" name="rating" value="5" type="radio"/><label for="star5"></label>
                          <input id="star4" name="rating" value="4" type="radio"/><label for="star4"></label>
                          <input id="star3" name="rating" value="3" type="radio"/><label for="star3"></label>
                          <input id="star2" name="rating" value="2" type="radio"/><label for="star2"></label>
                          <input id="star1" name="rating" value="1" type="radio"/><label for="star1"></label>
                        </div>
                      </div>
                      <button className="primary-btn">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
export default Details2;