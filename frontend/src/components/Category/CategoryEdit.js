import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
function CategoryEdit(props){
    const [picture,setpicture]=useState([]);
    const[categoryInput,setcategory]=useState({
        'ref':'',
        'name':'',
        'image':''
    })
    const handleInput=(e)=>{
        e.persist();
        setcategory({...categoryInput,[e.target.name]:e.target.value})
    }
    const handleImage=(e)=>{
        e.persist();
        setpicture({image:e.target.files[0]})

    }
    useEffect(()=>{
        const id=props.match.params.id;
        axios.get(`http://127.0.0.1:8000/api/category/edit/${id}`).then((resp)=>{
            if(resp.data.status===200){
                setcategory({...categoryInput,
                'ref':resp.data.category.ref,
                'name':resp.data.category.name,
                'image':resp.data.category.image,
                })
            }
          
        }).catch(function (error) {
            console.log(error);
          });
    },[props.match.params.id]);
    const updatecategory=(e)=>{
        const id=props.match.params.id;
        e.preventDefault();
        const data=new FormData();
        data.append('ref',categoryInput.ref);
        data.append('name',categoryInput.name);
        data.append('image',picture.image);
        axios.post(`http://127.0.0.1:8000/api/category/update/${id}`,data).then((resp)=>{
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
        <div className="col-sm-6 col-sm-offset-3 shadow-none p-3 mb-5 bg-light rounded bg-danger">
            <div className="row">
             <form onSubmit={updatecategory}>
                <div className="form-group">
                    <label>Codigo:</label>
                    <input type="text" name="ref" onChange={handleInput} value={categoryInput.ref} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" name="name" onChange={handleInput}  value={categoryInput.name} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleImage} className="form-control"/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-sm">Update</button>
                </div>
             </form>
            </div>
           <img src={`http://127.0.0.1:8000/images/category/${categoryInput.image}`} alt="" height="270px" width="560px"/>

        </div>
    )
}
export default CategoryEdit;