import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
const Test=()=>{
const [Loading,SetLoading]=useState(true);
const [Loadingedit,SetLoadingedit]=useState(true);
const [id,setid]=useState(0);
const [Picture,setPicture]=useState([]);
const [ClientList,ListClient]=useState([]);
const [Fresh,SetFresh]=useState([]);
const history=useHistory();
const [Errorlist,setError]=useState([]);
 const [ClientInput,setClient]=useState({
  name:'',
  firstName:'',
  age:'',
  image:'',
 });
 const Inputhandle=(e)=>{
  e.persist();
  setClient({...ClientInput,[e.target.name]:e.target.value})
 }
 const handleimage=(e)=>{
     e.persist();
     setPicture({image:e.target.files[0]})
 }

 const Saveclient=(e,action)=>{
  e.preventDefault();
  const data=new FormData();
   data.append('name',ClientInput.name);
   data.append('firstName',ClientInput.firstName);
   data.append('age',ClientInput.age);
   data.append('image',Picture.image);
  axios.post(`http://127.0.0.1:8000/api/client/store/${action}/${id}`,data).then((resp)=>{
    if(resp.data.status===400){
      setError(resp.data.errors);
    }else if(resp.data.status===200){
      swal("success",resp.data.message,"success");
    }
  })
 }
 const A=(e)=>{
  e.preventDefault();
 }
 useEffect(()=>{
  getData()
  axios.get('http://127.0.0.1:8000/api/client/all').then((resp)=>{
    if(resp.data.status===200){
      SetLoading(false)
      ListClient(resp.data.clients);
    }
  })

 },[]);

 function getData(){
  axios.get('http://127.0.0.1:8000/api/client/all').then((resp)=>{
    if(resp.data.status===200){
      SetLoading(false)
      SetFresh(resp.data.clients);
    }
  })
 }

 const Show=(e,id)=>{
  var alert=e.currentTarget;
  axios.get(`http://127.0.0.1:8000/api/client/edit/${id}`).then((resp)=>{
    if(resp.data.status===200){
      setid(resp.data.client.id);
      SetLoadingedit(false);
      setClient({...ClientInput,
        name:resp.data.client.name,
        firstName:resp.data.client.firstName,
        age:resp.data.client.age,
    
      });
    }
  })
 }
 const Delete=(e,id)=>{
  var alert= e.currentTarget;
  alert.innerText="Deleting";
  axios.delete(`http://127.0.0.1:8000/api/client/delete/${id}`).then((resp)=>{
    if(resp.data.status===200){
      alert.closest("tr").remove();
    }
  })
 }
 var Buttons="";
 if(Loadingedit){
  Buttons=  <button className="btn btn-success" type="submit" onClick={(e)=>Saveclient(e,"add")}>Save</button>

 }else{
  Buttons=  <button className="btn btn-success"   data-dismiss="modal" type="submit" onClick={(e)=>Saveclient(e,"up")}>Update</button>

 }
 var table_html="";
 if(Loading){
  table_html=<tr><td colSpan="5">.....LOADING......</td></tr>
 }else{
  table_html=
  ClientList.map((item)=>{
    return(
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.firstName}</td>
        <td>{item.age}</td>
        <td><img src={`http://127.0.0.1:8000/images/clients/${item.image}`}  width="60px" height="50px" /></td>
        <td>
          <button onClick={(e)=>Show(e,item.id)} className="btn btn-primary" data-toggle="modal" data-target="#myModal">Edit</button>
        </td>
        <td>
          <button onClick={(e)=>Delete(e,item.id)} className="btn btn-danger">Delete</button>
        </td>
        <td>
        <button type="button"  onClick={(e)=>Show(e,item.id)} class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">view</button>
        </td>
      </tr>
    )
  })
 }
  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-7">
          <summary>
            <details open>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>FirstName</th>
                    <th>Age</th>
                    <th>Image</th>
                    <th>Edite</th>
                    <th>Delete</th>
                    <th>Modal</th>

                  </tr>
                </thead>
                <tbody>
                  {table_html}
                </tbody>
              </table>
            </details>
          </summary>
        </div>


        <div className="col-sm-5" style={{marginTop:"20px",backgroundColor:"InfoBackground"}}>
           <form onSubmit={A}>
            <div className="form-group">
              <input type="text" name="name" onChange={Inputhandle}  value={ClientInput.name}  placeholder="digite seu nome" className="form-control"/>
              <span className="text-danger">{Errorlist.name}</span>
            </div>
            <div className="form-group">
              <input type="text" name="firstName" onChange={Inputhandle} value={ClientInput.firstName} placeholder="digite seu sobrenome" className="form-control"/>
              <span className="text-danger">{Errorlist.firstName}</span>
            </div>
            <div className="form-group">
              <input type="text" name="age" onChange={Inputhandle} value={ClientInput.age} placeholder="digite seu nome" className="form-control"/>
              <span className="text-danger">{Errorlist.age}</span>
            </div>
            <div className="form-group">
              <input type="file" name="image" onChange={handleimage} placeholder="digite seu nome" className="form-control"/>
            </div>
            <div className="form-group">
              {Buttons}
            </div>
           </form>
        </div>
      </div>

<div id="myModal" class="modal fade" role="dialog">
              <div class="modal-dialog">

                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title" style={{background:"red",color:"white"}}>UPDATE PRODUCT</h4>
                  </div>
                  <div className="modal-body">
                      <form onSubmit={A}>
                            <div className="form-group">
                              <input type="text" name="name" onChange={Inputhandle}  value={ClientInput.name}  placeholder="digite seu nome" className="form-control"/>
                              <span className="text-danger">{Errorlist.name}</span>
                            </div>
                            <div className="form-group">
                              <input type="text" name="firstName" onChange={Inputhandle} value={ClientInput.firstName} placeholder="digite seu sobrenome" className="form-control"/>
                              <span className="text-danger">{Errorlist.firstName}</span>
                            </div>
                            <div className="form-group">
                              <input type="text" name="age" onChange={Inputhandle} value={ClientInput.age} placeholder="digite seu nome" className="form-control"/>
                              <span className="text-danger">{Errorlist.age}</span>
                            </div>
                            <div className="form-group">
                              <input type="file" name="image" onChange={handleimage} placeholder="digite seu nome" className="form-control"/>
                            </div>
                          
                        </form>
      </div>
      <div className="modal-footer">
       {Buttons}
      </div>
    </div>

  </div>
     </div>
    </div>
  )
}
export default Test;