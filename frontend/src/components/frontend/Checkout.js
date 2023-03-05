import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Checkout=()=>{
  const [CartList,setCart]=useState([]);
  const [Total,setTotal]=useState(0);
  const [Status1,setStatus1]=useState([]);
  const[loading,setLoading]=useState(true);
 const history=useHistory();
 let total=0;
 const [userRegister,setRegister]=useState({
  nome:"",
  bairro:'',
  cidade:'',
  estado:'',
  logradouro:'',
  complement:'',
  numero:'',
  cep:'',
  error_list:[]

 })


 const CheckCep=(e)=>{
  const cep=e.target.value.replace(/\D/g,'');
  fetch(`https://api.postmon.com.br/v1/cep/${cep}`)
  .then(resp=>resp.json()).then(data=>{
    console.log(data)
    setRegister({...userRegister,
    bairro:data.bairro,
    cidade:data.cidade,
    estado:data.estado_info.nome,
    logradouro:data.logradouro,
    })
  })
 
 }

 const handleInput=(e)=>{
  e.persist();
  setRegister({...userRegister,[e.target.name]:e.target.value})
 }



  const BtnDelete=(e,cart_id)=>{
    const alert=e.currentTarget;
    alert.innerText="removing";
    axios.delete(`http://127.0.0.1:8000/api/product/cart/delete/${cart_id}`).then((resp)=>{
        if(resp.data.status===200){
          history.push("/admin/user/checkout");
        }
      })
    }
   
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/product/cart/viewcart').then((resp)=>{
      if(resp.data.status===200){
        setCart(resp.data.cart);
        setTotal(resp.data.total);
        setLoading(false);
        }else if(resp.data.status===400){
        
      }
    });

    axios.get('http://127.0.0.1:8000/api/user/adresse').then((resp)=>{
      if(resp.data.status===200){
        setRegister({...userRegister,
          nome:resp.data.nome,
          bairro:resp.data.logradoura,
          cidade:resp.data.cidade,
          estado:resp.data.estado,
          logradouro:resp.data.logradoura,
          complement:resp.data.complement,
          numero:resp.data.numero,
          cep:resp.data.cep,
          bairro:resp.data.bairro,
        })
        
      }
   
    });

    
  },[]);
 
  
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
      history.push("/admin/user/checkout");
    }
  })
 }

 const Pedido=(e)=>{
  e.preventDefault();
  const data={
  nome:userRegister.nome,
  bairro:userRegister.bairro,
  cidade:userRegister.cidade,
  estado:userRegister.estado,
  logradouro:userRegister.logradouro,
  complement:userRegister.complement,
  numero:userRegister.numero,
  cep:userRegister.cep,

  }
  axios.post('http://127.0.0.1:8000/api/pedido',data).then((resp)=>{
    if(resp.data.status===200){
    history.push('/admin/user/checkout/historiquepedido');
    }else if(resp.data.status===400){
      setRegister({...userRegister,error_list:resp.data.errors})
    }
  })

}

 var Cartdata="";
 if(loading){
  Cartdata=<img src={`http://127.0.0.1:8000/images/re.gif.crdownload`} height="50px" width="50px" style={{marginLeft:"100px"}}/>
 }else{
  Cartdata=
  
    CartList.map((item)=>{
      total+=item.price*item.quantity;
     return(
       <div className="panel panel-default" key={item.id}>
          <div className="panel-body">
            <div className="col-sm-2">
            <img src={`http://127.0.0.1:8000/images/product/${item.product.image}`} alt="" height="50px" width="50px" />
    
            </div>
            <div className="col-sm-3">
              <h6 className="text-danger">{item.product.name}</h6>
              <p className="text-primary">RS:{item.price}</p>
            </div>
    
            <h6 className="col-sm-7" style={{fontSize:"6px"}}>
               <div className="btn-group">
                      <button type="button" className="btn btn-info btna" onClick={()=>BtnMinus(item.id)} > <i className="fa fa-minus" aria-hidden="true"></i></button>
                      <button type="button" className="btn btn-secondary" ><span>{item.quantity}</span></button>
                      <button type="button" className="btn btn-primary btna" onClick={()=>BtnPlus(item.id)}> <i className="fa fa-plus" aria-hidden="true"></i></button>
 
                      <button type="button" className="btn btn-danger removecart" onClick={(e)=>BtnDelete(e,item.id)}  style={{marginTop:"0px",marginLeft:"15px"}}><i className="fa fa-remove" aria-hidden="true">remove</i></button>
                  </div>

            </h6>
          </div>

         </div>
     )
   })
 
 }

  return(
    <form onSubmit={Pedido}>
 <div className="container" style={{backgroundColor:"ButtonFace"}}>
  <h4 className="text-center bg-dark">Checkout</h4>
  <div className="row">
    <div className="col-sm-7">
      <div className="card">
        <div className="card-body">
    
            <div className="row">
            <div className="form-group col-sm-12">
              <label>Name</label>
              <input type="text" name="nome" onChange={handleInput} value={userRegister.nome} className="form-control"/>
              <span className="text-danger">{userRegister.error_list.nome}</span>
            </div>
         

            <div className="form-group col-sm-6">
              <label>Cep</label>
              <input type="text" name="cep" onBlur={CheckCep}  onChange={handleInput}  value={userRegister.cep} className="form-control"/>
              <span className="text-danger">{userRegister.error_list.cep}</span>

            </div>
            <div className="form-group col-sm-6">
              <label>Cidade</label>
              <input type="text" name="cidade" onChange={handleInput} value={userRegister.cidade} className="form-control"/>
              <span className="text-danger">{userRegister.error_list.cidade}</span>

            </div>
            <div className="form-group col-sm-6">
              <label>Bairro</label>
              <input type="text" name="bairro" onChange={handleInput} value={userRegister.bairro} className="form-control"/>
              <span className="text-danger">{userRegister.error_list.bairro}</span>
            </div>
            <div className="form-group col-sm-6">
              <label>Endereço</label>
              <input type="text" name="logradouro" onChange={handleInput} value={userRegister.logradouro} className="form-control"/>
              <span className="text-danger">{userRegister.error_list.logradouro}</span>
            </div>
            <div className="form-group col-sm-12">
              <label>Estado</label>
              <input type="text" name="estado" onChange={handleInput} value={userRegister.estado} className="form-control"/>
                 <span className="text-danger">{userRegister.error_list.estado}</span>
            </div>
            <div className="form-group col-sm-8">
              <label>complement</label>
              <input type="text" name="complement" onChange={handleInput} value={userRegister.complement} className="form-control"/>
            </div>
            <div className="form-group col-sm-4">
              <label>Numero</label>
              <input type="text" name="numero" onChange={handleInput} value={userRegister.numero} className="form-control"/>
              <span className="text-danger">{userRegister.error_list.numero}</span>
            </div>
            </div>
         
        </div>
      </div>
    </div>
    <div className="col-sm-5" style={{marginTop:"25px"}}>
      {Cartdata}

      <div className="panel panel-default">
        <div className="panel-body"><h4 className="text-center">R$:{total}.00</h4></div>
          </div>
      
      <button className="btn btn-primary form-control" type="submit">Finalizar</button>

    </div>
  </div>
 </div>
 </form>
  )

}
export default Checkout;