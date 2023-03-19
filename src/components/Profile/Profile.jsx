import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FormContext } from '../../context/FormContext'
import { PostContext } from '../../context/PostContext'
import Posts from '../Mainbar/Posts'
import AvatarPopup from '../Popup/AvatarPopup'
import Navbar from '../Tabs/Navbar'

const Profile = () => {
  const {userInfo, certainUser, fetchUserDetail} = useContext(FormContext);
  const {posts, openModal, setOpenModal} = useContext(PostContext);
  const {id} = useParams();

  const fetchUser = ()=>{
    fetchUserDetail(id);
  }

  useEffect(()=>{
    fetchUser();
  },[]);

  return (
    <>
      <Navbar />
      
      {certainUser && userInfo ? 
        <div className='profile-container'>
          <div className="profile-info">
            <div className="change-avatar">
              <img src={certainUser.avatar} alt="" className='profile-avatar' />
              {userInfo.id == id ? <button className="change-avatar-btn" onClick={()=>setOpenModal(true)}>
                Change Avatar
              </button> : null}
            </div>
            <div className="profile-name">
              {certainUser.firstname} {certainUser.lastname}
              <div className="bio">
                {certainUser.bio}
              </div>
            </div>
            
            
          </div>
          <div className="profile-post">
            <div className="profile-post-header">
              {`${certainUser.firstname} ${certainUser.lastname}\'s Posts`}
            </div>
            {posts.length > 0 ?
              posts.filter(item => {return item.userId === id}).map((post) => (
                <Posts post={post}  key={post.postId} />
              ))
            : <h1 className='loading'>No posts available</h1>}
          </div>
        </div> 

      : <h2 className='loading'>Loading...</h2>}  

      <AvatarPopup open={openModal} onClose={()=> setOpenModal(false)} />

    </>
    
  )
}

export default Profile