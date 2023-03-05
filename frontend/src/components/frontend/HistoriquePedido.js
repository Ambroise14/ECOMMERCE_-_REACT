import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Historique=()=>{
const [Pedido,setPedido]=useState([]);
const [Details,setDetails]=useState([]);
const[loading,setLoading]=useState(true);
var table="";
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/historiquepedido').then((resp)=>{
      if(resp.data.status===200){
        setPedido(resp.data.ped);
         setLoading(false);
      }else if(resp.data.status===400){
        
      }
    })
  },[])

  const details=(pedido_id)=>{
    axios.get(`http://127.0.0.1:8000/api/detailspedido/${pedido_id}`).then((resp)=>{
      if(resp.data.status===200){
        setDetails(resp.data.ped);
        setLoading(false);

      }
     
    })
  
  }
  
  
  if(Details.length>0)
    table=
    <details open>
    <table className="table table-bordered table-hover">
      <thead  style={{background:"blue",color:"white"}}>
        <tr>
          <th>Name</th>
          <th>price</th>
          <th>Quantity</th>
          <th>Sous total</th>
        </tr>
      </thead>
      <tbody>
        {
          Details.map((item)=>{
            return(
              <tr key={item.id}>
                <td>{item.product.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.quantity*item.price}</td>

              </tr>
            )
          })
        }
      </tbody>
      

    </table>
  
  </details>
  var Datapedido="";
  if(loading){
    Datapedido=
   <img src={`http://127.0.0.1:8000/images/re.gif.crdownload`} height="50px" width="50px" style={{marginLeft:"100px"}}/>

  }else{
   Datapedido= Pedido.map((item)=>{
      return(
        <div className="panel panel-default" key={item.id} style={{background:"redy"}}>
           <div className="panel-body">
             <div className="col-sm-12">
              <h4 className="text-center">DETAILS PEDIDO</h4>
             <hr/>
               <h5><strong>Ref:{item.ref}</strong></h5>
               <hr/>
               <h5 className="text-primary">Total RS: <strong>  {item.total}</strong> </h5>
               <hr/>
               <h5 className="text-primary">Data de Pedido:     {item.created_at} </h5>
               <hr/>
               <button className="btn btn-primary btn-sm" onClick={()=>details(item.id)}>View</button>
             </div>
            
           </div>
          </div>
      )
    })
  }
  return(
    <div className="col-sm-6 col-sm-offset-3 shadow-none p-3 mb-5 bg-light rounded">
      <div className="row">
          {
           Datapedido
          }
          <hr/>
          {table}
          
      </div>
      <div className="elements">TOUCHE</div>

    </div>
  );
}
export default Historique;