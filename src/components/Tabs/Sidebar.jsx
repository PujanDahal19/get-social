import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FormContext } from '../../context/FormContext'
import { PostContext } from '../../context/PostContext';

const Sidebar = () => {
  const {userInfo} = useContext(FormContext);
  const{setOpenModal} = useContext(PostContext)

  return (
    <div className='sidebar-container'>
      {userInfo ? 
      <>
        
        <Link 
          to={`/protected/profile/${userInfo.id}`}
        >
          <img src={userInfo.avatar} alt="" className='profile-avatar'/>
        </Link>        
        
        <Link 
          className="profile-username" 
          to={`/protected/profile/${userInfo.id}`}
        >
          {userInfo.firstname} {userInfo.lastname}
        </Link>

        <div className="underline"></div> 
        <div className="profile-bio">
          {userInfo.bio}
        </div> 

        

        <button className="edit-profile-btn" onClick={()=>setOpenModal(true)}>
          {userInfo.bio ? 'Edit Bio' : 'Add Bio'}
        </button>
      </> 
      : <h1 className='loading'>Loading...</h1>}
    </div>
  )
}

export default Sidebar