import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
function Login(){
  const history=useHistory();
  const [ErrorLogin,setError]=useState(false);
  const [Adress,setAdress]=useState([]);
    const [RegisterInput,setRegister]=useState({
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
            email:RegisterInput.email,
            password:RegisterInput.password
        }
        var e=document.getElementById('ici');
          axios.post('http://127.0.0.1:8000/api/user/login',data).then((resp)=>{
            if(resp.data.status===200){
             localStorage.setItem('auth_name',resp.data.username);
             localStorage.setItem('auth_token',resp.data.token);
             setAdress(resp.data.user);
             Adress.map((item)=>{
              localStorage.setItem('cep',item.cep);
              localStorage.setItem('cidade',item.cidade);

             })
             history.push('/dashboard');

            }else if(resp.data.status===400){
                setRegister({...RegisterInput,error_list:resp.data.errors})
            }else if(resp.data.status===401){
              setError(true);
            }

          }).catch(function (error) {
            console.log(error);
          });
    }
    var error="";
    if(ErrorLogin){
      error=<h5 className="alert alert-danger">Email/senha invalido</h5>
    }
    return(
      <div className="container">
     
          <div className="col-sm-6 col-sm-offset-3">
            <div className="row">
                <h5>     {error}</h5>
                <form onSubmit={SaveEgister}>
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
                        <button type="submit" className="btn btn-success">Logar</button>
                        <span id="ici"></span>
                    </div>
                </form>
            </div>
        </div>
      </div>
    )
}
export default Login;