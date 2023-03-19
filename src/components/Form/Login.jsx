import React, { useContext, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FormContext } from '../../context/FormContext';

const Login = () => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const {loginUser} = useContext(FormContext);

  const navigate = useNavigate();

  const loginForm = (e)=>{
    e.preventDefault();
    loginUser(email, password);
    navigate('/protected/home');
  }

  return (
    <div className='form-container'>
        
        <form className='form' onSubmit={loginForm}>
            <div className="form-title">Login Here</div> 
            <input 
              type="email" 
              className='email' 
              placeholder='Email' 
              onChange={e=> setEmail(e.target.value)} 
              required 
            />

            <input 
              type="password" 
              className='password'
              placeholder='Password' 
              onChange={e=> setPassword(e.target.value)}
              required
            />

            <button className='form-submit' type='submit'>Submit</button>
            
            <div className="goto">
              Don't have an account? {" "}
              <Link to='/register'>Register</Link>
            </div>
        </form>
        
    </div>  
  )
}

export default Login