import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'        
import {FiLogOut} from 'react-icons/fi'
import {AiOutlineMenu, AiFillCloseCircle} from 'react-icons/ai'
import { FormContext } from '../../context/FormContext'

const Navbar = () => {
    const{logoutUser, userInfo} = useContext(FormContext);

    const[active, setActive] = useState(false);

    const logout = async()=>{
        await logoutUser();
    }

    const toggleMenu = ()=>{
        setActive(true);
    }
    const closeMenu = ()=>{
        setActive(false);
    }
    
  return (
    <div className='navbar-container'>
        <Link className="logo" to='/protected/home'>
            get<span>Social</span>
        </Link>
        <div className={active ? 'nav-links show' : 'nav-links'}>
            <Link to='/protected/home' className='link'>Home</Link>
            <Link to={userInfo? `/protected/profile/${userInfo.id}` : null}className='link'>Profile</Link>
            <button className="logout-btn" onClick={logout}>
                <FiLogOut /> Logout
            </button>
            <button className="menu-close-btn " onClick={closeMenu}>
                <AiFillCloseCircle />
            </button>
        </div>
        <button className="bar" onClick={toggleMenu}>
            <AiOutlineMenu />
        </button>
        
        
    </div>
  )
}

export default Navbar