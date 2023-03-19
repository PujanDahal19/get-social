import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai'
import { PostContext } from '../../context/PostContext';

const AvatarPopup = ({open, onClose}) => {
    const { setFile, updateAvatar} = useContext(PostContext);

     if(!open) return null;

    const changeAvatar = ()=>{
        updateAvatar();
    }

    const handleAvatarChange = (e)=>{
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }
  return (
    <div className='overlay' onClick={onClose}>
        <div 
            onClick={(e)=> {e.stopPropagation()}} className="popup-container"
        >
            <AiOutlineClose className='close-btn' onClick={onClose} />
            
            <div className='edit-form'>   
                <legend>Change your avatar</legend>
                <div className="input-container avatar">
                    <label className='avatar-header'>
                        Change your avatar : 
                    </label>
                    <input type="file" accept="image/*" className="avatar-input" onChange={handleAvatarChange}/>
                </div> 

                <div className="update-btn-container">
                    <button className='update-btn' onClick={changeAvatar}>
                        Update
                    </button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default AvatarPopup