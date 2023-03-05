import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
function AddUser(){
  const history=useHistory();
    const [RegisterInput,setRegister]=useState({
        name:'',
        email:'',
        password:'',
        error_list:[]
    });
    const handleInput=(e)=>{
        e.persist();
        setRegister({...RegisterInput,[e.target.name]:e.target.value})
    }

    const SaveEgister=(e)=>{
        e.preventDefault();
        const data={
            name:RegisterInput.name,
            email:RegisterInput.email,
            password:RegisterInput.password
        }
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
          axios.post('http://127.0.0.1:8000/api/user/register',data).then((resp)=>{

            if(resp.data.status===200){
             localStorage.setItem('auth_name',resp.data.username);
             localStorage.setItem('auth_token',resp.data.token);
             localStorage.setItem('user',resp.data.user);
             setRegister({...RegisterInput,
              name:'',
              email:'',
              password:''
            })
            history.push('/dashboard');

            }else if(resp.data.status===400){
                setRegister({...RegisterInput,error_list:resp.data.errors})
            }

          }).catch(function (error) {
            console.log(error);
          });
        });


    }
    return(
        <div className="col-sm-6 col-sm-offset-3 shadow-none p-3 mb-5 bg-light rounded">
            <div className="row">
                <form onSubmit={SaveEgister}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleInput} value={RegisterInput.name} className="form-control"/>
                        <span className="text-danger">{RegisterInput.error_list.name}</span>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" onChange={handleInput} value={RegisterInput.email} className="form-control"/>
                        <span className="text-danger">{RegisterInput.error_list.email}</span>

                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input type="password" name="password" onChange={handleInput} value={RegisterInput.password} className="form-control"/>
                        <span className="text-danger">{RegisterInput.error_list.password}</span>

                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddUser;