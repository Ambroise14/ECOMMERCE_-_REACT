import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function EditProduct(props){
    const [picture,setpictire]=useState([]);
    const [dataCategory,setcategory]=useState([]);
   const history=useHistory();
    const [productInput,setproduct]=useState({
        category_id:'',
        ref:'',
        name:'',
        price:'',
        description:'',
        status:'',
        popular:'',
        image:'',
        quantity:'',
        errors_list:[]
    });
    const handleInput=(e)=>{
        e.persist();
        setproduct({...productInput,[e.target.name]:e.target.value})
    };
    const handleImage=(e)=>{
        e.persist();
        setpictire({image:e.target.files[0]})
    };
    const savecategory=(e)=>{
        e.preventDefault();
       const id= props.match.params.id;
        const data=new FormData();
        data.append('category_id',productInput.category_id);
        data.append('ref',productInput.ref);
        data.append('name',productInput.name);
        data.append('price',productInput.price);
        data.append('description',productInput.description);
        data.append('status',productInput.status);
        data.append('popular',productInput.popular);
        data.append('quantity',productInput.quantity);

        data.append('image',picture.image);
        axios.post(`http://127.0.0.1:8000/api/product/update/${id}`,data).then((resp)=>{
            if(resp.data.status===400){
                setproduct({...productInput,errors_list:resp.data.errors})
            }else if(resp.data.status===200){
                history.push('/admin/product/all');
                console.log(resp.data.message)
            }
        })
    }

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/category/all').then((resp)=>{
            if(resp.data.status===200){
                setcategory(resp.data.cate);
            }
         });

         const id=props.match.params.id;
         axios.get(`http://127.0.0.1:8000/api/product/edit/${id}`).then((resp)=>{
           if(resp.data.status===200){
             setproduct({...productInput,
               ref:resp.data.prod.ref,
               name:resp.data.prod.name,
               price:resp.data.prod.price,
               quantity:resp.data.prod.quantity,
               description:resp.data.prod.description,
               image:resp.data.prod.image,

             })
           }
         })
        },[props.match.params.id]);


  
 

    return(
        <div className="col-sm-6 col-sm-offset-3 shadow-none p-3 mb-5 bg-light rounded">
            <h4 className="text-center text-white bg-dark">Update Produto</h4>
            <div className="row">
             <form onSubmit={savecategory} className="bg-success">
                <div className="form-group">
                    <label>Category</label>
                    <select className="form-select form-select-lg mb-3 form-control" name="category_id" onChange={handleInput}  value={productInput.category_id}>
                        <option>totoot</option>
                        {
                          dataCategory.map((item)=>{
                            return(
                          <option key={item.id} value={item.id}>{item.name}</option>
                              
                            )
                          })  
                        }
                    </select>
                    <span className="text-danger">{productInput.errors_list.category_id}</span>

                </div>
                <div className="form-group">
                    <label>Ref:</label>
                    <input type="text" name="ref" onChange={handleInput} value={productInput.ref} className="form-control"/>
                    <span className="text-danger">{productInput.errors_list.ref}</span>
                </div>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" name="name" onChange={handleInput}  value={productInput.name} className="form-control"/>
                    <span className="text-danger">{productInput.errors_list.name}</span>

                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="text" name="price" onChange={handleInput}  value={productInput.price} className="form-control"/>
                    <span className="text-danger">{productInput.errors_list.price}</span>

                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" className="form-control" onChange={handleInput} 
                     value={productInput.description} ></textarea>
                    <span className="text-danger">{productInput.errors_list.description}</span>

                </div>

                <div className="form-group">
                    <h3 className="text-danger bg-primary">
                        status:<input type="checkbox" name="status" onChange={handleInput}  value={productInput.status} />
                        ...........................................................Popular:<input type="checkbox" name="popular" onChange={handleInput}  value={productInput.price} />

                        
                    </h3>
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input type="number" name="quantity" onChange={handleInput} value={productInput.quanttity} className="form-control"/>
                    <span className="text-danger">{productInput.errors_list.quantity}</span>
                </div>

                <div className="form-group">
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleImage} className="form-control"/>
                    <span className="text-danger">{productInput.errors_list.image}</span>

                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-sm">Save</button>
                </div>
             </form>
            </div>
           <img src={`http://127.0.0.1:8000/images/product/${productInput.image}`} alt="" height="270px" width="560px"/>

        </div>
    )
}
export default EditProduct;