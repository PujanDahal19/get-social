import React, { useContext, useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import { PostContext } from '../../context/PostContext';
import { FormContext } from '../../context/FormContext';

const Popup = ({open, onClose}) => {
    const { updateBio} = useContext(PostContext);
    const{userInfo} = useContext(FormContext);
    const[bio, setBio] = useState(null);
    if(!open) return null;

    const handleEditProfile = (e)=>{
        e.preventDefault();
        updateBio(bio);
    }

    
  return (
    <div className='overlay' onClick={onClose}>
        <div 
            onClick={(e)=> {e.stopPropagation()}} className="popup-container"
        >
            <AiOutlineClose className='close-btn' onClick={onClose} />
            
            <form 
                onSubmit={handleEditProfile} 
                className='edit-form'
            >   
                <legend>Update your Profile</legend>

                <div className='input-container bio'>
                    <label className='bio-header'>Bio : </label>
                    {userInfo ? <textarea type="text" className='bio-input' placeholder='Write about yourself...' onChange={e=>setBio(e.target.value)} />: null}
                </div>

                <div className="update-btn-container">
                    <button className='update-btn' type='submit'>
                        Update
                    </button>
                </div>

            </form>

        </div>
    </div>
  )
}

export default Popup