import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FormContext } from '../../context/FormContext';


const Register = () => {
  const[lastname, setLastName] = useState('');
  const[firstname, setFirstName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  
  const {registerUser} = useContext(FormContext);

  const navigate = useNavigate();

  const registerForm = (e)=>{
    e.preventDefault();
    registerUser(firstname, lastname, email, password);
    navigate('/protected/home')
  }

  return (
    <div className='form-container'>
        <form className='form' onSubmit={registerForm}>
            <div className="form-title">Register Here</div>
            <input 
              type="text" 
              className='username' 
              placeholder='First Name' 
              onChange={e=> setFirstName(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              className='username' 
              placeholder='Last Name' 
              onChange={e=> setLastName(e.target.value)} 
              required 
            />

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
            <div className="goto">Already have an account? <Link to='/login'>{" "}Login</Link></div>
        </form>
        
    </div>
  )
}

export default Register