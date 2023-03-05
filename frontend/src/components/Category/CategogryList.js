import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryList=()=>{
    const [CategoryList,setcategory]=useState([]);
  const [loading,setloading]=useState(true);
    useEffect(()=>{
     axios.get('http://127.0.0.1:8000/api/category/all').then((resp)=>{
        if(resp.data.status===200){
            setloading(false);
            setcategory(resp.data.cate);
        }
     })
    },[]);
    const deletecategory=(e,id)=>{
        var alert= e.currentTarget;
        alert.innerText="Deleting";
        axios.delete(`http://127.0.0.1:8000/api/category/delete/${id}`).then((resp)=>{
            if(resp.data.status===200){
                alert.closest("tr").remove();
            }
         })

    }
 var table="";
 if(loading){
    table=<tr><td colSpan="2">...Loading.....</td></tr>
 }else{
    table=CategoryList.map((item)=>{
        return(
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.ref}</td>
                <td>{item.name}</td>
                <td><img src={`http://127.0.0.1:8000/images/category/${item.image}`}  width="50px" height="50px" /></td>
                <td><Link to={`/admin/category/edit/${item.id}`} className="btn btn-primary">edit</Link></td>
                <td>
                <button className="btn btn-danger btn-sm" onClick={(e)=>deletecategory(e,item.id)}>Delete</button>
                </td>
            </tr>
        )
    })
 }
    return(
        <div className="container">
            <div className="row">
           <table className="table table-hover table-bordered">
            <thead className="bg-dark">
                <tr>
                    <th>ID</th>
                    <th>Ref</th>
                    <th>Name</th>
                    <th>IMAGE</th>

                </tr>
            </thead>
            <tbody>
                {table}
            </tbody>
           </table>
            </div>
        </div>
    );

}
export default CategoryList;