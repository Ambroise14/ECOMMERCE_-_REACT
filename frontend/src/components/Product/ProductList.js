import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function ProductLit(){
    const [ListP,setProduct]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/product/all').then((resp)=>{
            if(resp.data.status===200){
                setProduct(resp.data.prod);
                setLoading(false);

            }

        })
        .catch(function (error) {
            console.log(error);
          });
    },[]);

    const deleteproduct=(e,id)=>{
        var alert= e.currentTarget;
        alert.innerText="Deleting";
        axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`).then((resp)=>{
          if(resp.data.status===200){
              alert.closest("tr").remove();
          }
       })

   
    }

    var table="";
    if(loading){
        table=   <img src={`http://127.0.0.1:8000/images/re.gif.crdownload`} height="100px" width="100px" style={{marginLeft:"500px"}}/>
    }else{
        table=
        ListP.map(item=>{
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>

                    <td><img src={`http://127.0.0.1:8000/images/product/${item.image}`}  width="50px" height="50px" /></td>
                    <td><Link to={`/admin/product/edit/${item.id}`} className="btn btn-primary">edit</Link></td>
                    <td>
                    <button className="btn btn-danger btn-sm" onClick={(e)=>deleteproduct(e,item.id)}>Delete</button>
                    </td>

                </tr>
            )
        })
    }
    return(
        <div className="container">
            <div className="row">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ProductLit;