import axios from "axios";
import React from "react";
import { useState } from "react";
import swal from "sweetalert";

const Addcategory=()=>{
    const [picture,setpictire]=useState([]);
    const [selectedFile,setSelectedFile]=useState([]);
    const [categoryInput,setcategory]=useState({
        ref:'',
        name:'',
        image:'',
        errors_list:[]
    });
    const handleInput=(e)=>{
        e.persist();
        setcategory({...categoryInput,[e.target.name]:e.target.value})
    }
    const handleImage=(e)=>{
        e.persist();
        setpictire({image:e.target.files[0]})
    }

    const handleImageChange=(e)=>{
      e.persist();
      setpictire({image:e.target.files[0]})
      if(e.target.files){
        let table=Array.from(e.target.files).map((file)=>URL.createObjectURL(file));
        setSelectedFile((preventimage)=>preventimage.concat(table));
      }
    }
    const render=(source)=>{
      return source.map((photo)=>{
        return <img src={photo} style={{width:"400px",height:"300px",marginLeft:"100px"}}/>
      })
    }
    const savecategory=(e)=>{
        e.preventDefault();
        const data=new FormData();
        data.append('ref',categoryInput.ref);
        data.append('name',categoryInput.name);
        data.append('image',picture.image);
        axios.post('http://127.0.0.1:8000/api/category/store',data).then((resp)=>{
            if(resp.data.status===400){
                setcategory({...categoryInput,errors_list:resp.data.errors})
            }else if(resp.data.status===200){
                swal("success",resp.data.message,"success");
            }
        }).catch(function (error) {
            console.log(error);
          });
    }
    return(
        <div className="col-sm-6 col-sm-offset-3 shadow-none p-3 mb-5 bg-light rounded" style={{background:'pink'}}>
            <div className="row">
             <form onSubmit={savecategory}>
                <div className="form-group">
                    <label>Codigo:</label>
                    <input type="text" name="ref" onChange={handleInput} value={categoryInput.code} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" name="name" onChange={handleInput}  value={categoryInput.name} className="form-control"/>
                </div>
                
                <div className="form-group">
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleImageChange} className="form-control"/>
                    <br/>
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-sm">Save</button>
                </div>
                    <h4>
                      {render(selectedFile)}
                    </h4>
                </div>
               
             </form>
            </div>
        </div>
    )
}
export default Addcategory;