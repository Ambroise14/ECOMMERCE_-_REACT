import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link , useHistory } from "react-router-dom";
import swal from "sweetalert";

const ViewCart=()=>
{
  const [CartList,setCart]=useState([]);
  const history=useHistory();
  const[loading,setLoading]=useState(true);
  let total=0;
  const BtnDelete=(e,cart_id)=>{
    const alert=e.currentTarget;
    alert.innerText="removing";
    axios.delete(`http://127.0.0.1:8000/api/product/cart/delete/${cart_id}`).then((resp)=>{
        if(resp.data.status===200){
        alert.closest('tbody').remove();
        total=resp.data.total;
        }
      })
    }
         

  useEffect(()=>{
    let isMounted=true;
    axios.get('http://127.0.0.1:8000/api/product/cart/viewcart').then((resp)=>{
      if(isMounted){
        if(resp.data.status===200){
          setCart(resp.data.cart);
          setLoading(false);
        }else if(resp.data.status===400){
          
        }
      }
    });
    return ()=>{
      isMounted=false
    }
  },[history])
  
 const BtnPlus=(cart_id)=>{
 
  setCart(cart=>
    cart.map((item)=>
      cart_id===item.id ? {...item,quantity:item.quantity+(item.quantity <10 ? 1:0)}:item
    )
   );
   UpdateQuantity(cart_id,"inc");
}
const BtnMinus=(cart_id)=>{
    setCart(cart=>
   cart.map((item)=>
   cart_id===item.id ? {...item,quantity:item.quantity-(item.quantity > 1 ? 1:0)}:item
   )
  );
  UpdateQuantity(cart_id,"dec");
 
 }

 function UpdateQuantity(cart_id,scope){
  axios.put(`http://127.0.0.1:8000/api/product/cart/update/${cart_id}/${scope}`).then((resp)=>{
    if(resp.data.status===200){
     history.push('/admin/user/viewcart');

    }
  })
 }



var Luana='';
  var cart="";
  if(loading){
    cart=<img src={`http://127.0.0.1:8000/images/re.gif.crdownload`} height="50px" width="50px" style={{marginLeft:"100px"}}/>
  }else{
    cart=CartList.map((item)=>{
      total+=item.price*item.quantity;
      return(
       <table className="table table-bordered">
        <tbody>
        <div className="panel panel-default tr" key={item.id} style={{width:"85%"}}>
           <div className="panel-body">
             <div className="col-sm-2 col-md-2">
             <img src={`http://127.0.0.1:8000/images/product/${item.product.image}`} alt="" height="50px" width="100px"/>
     
             </div>
             <div className="col-sm-4">
               <span className="text-danger">{item.product.name}</span>
               <p className="text-primary">RS:{item.price}    <del className="product-old-price">$ {item.price}</del></p>

             </div>
     
             <div className="col-sm-6">
                <div className="btn-group">
                       <button type="button" className="btn btn-info btna" onClick={()=>BtnMinus(item.id)} > <i className="fa fa-minus" aria-hidden="true"></i></button>
                       <button type="button" className="btn btn-secondary" ><span>{item.quantity}</span></button>
                       <button type="button" className="btn btn-primary btna" onClick={()=>BtnPlus(item.id)}> <i className="fa fa-plus" aria-hidden="true"></i></button>
  
                       <button type="button" className="btn btn-danger removecart" onClick={(e)=>BtnDelete(e,item.id)} ><i className="fa fa-remove" aria-hidden="true">remove</i></button>
                   </div>
             </div>
           </div>
          </div>
        </tbody>
       </table>
      )
    })
  }



  if(loading){
    Luana=<img src={`http://127.0.0.1:8000/images/re.gif.crdownload`} height="50px" width="50px" style={{marginLeft:"100px"}}/>

  }else if(total>0){
    Luana =
    <div className="col-sm-4">
  <div className="panel panel-default" >
      <div className="panel-body" >
        <h4><span>Total:</span> R$:<strong>{total},00</strong></h4>
        <h4><span>Desconto:</span> <strong>{2}%</strong></h4>
        <h4><span>Total a pagar:</span>R$ <strong>{total-total*2/100},00</strong></h4>
        <Link to="/admin/user/checkout" className="btn btn-danger form-control">
      Continue
        </Link>

      </div>
 </div>
  </div>
  }else{
    Luana =<div><h4 style={{marginLeft:"20px"}}>Seu carrinho ésta vazio <Link to="/">Ir para compra</Link></h4></div>
  }
  

  return(
    <div className="container" style={{backgroundColor:"ButtonShadow"}}>
      <h5>Meu carrinho de compras</h5>
        <div className="row">
      <div className="col-sm-8 col-md-6 col-lg-8">
      {cart}
      </div>
        {Luana}
        </div>
</div>
  )

  
  }

export default ViewCart;







