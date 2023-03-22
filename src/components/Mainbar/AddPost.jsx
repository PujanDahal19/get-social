import React, { useContext, useState } from 'react'
import { PostContext } from '../../context/PostContext';

const AddPost = () => {
    const[post, setPost] = useState('');

    const {addPost} = useContext(PostContext);

    const submitPost = (e)=>{
        e.preventDefault();
        {post.length > 0 && addPost(post)};
        setPost('');
    }
  return (
    <form className='add-post-container' onSubmit={submitPost}>
        <div className="post-btn">
          <div className='create-post'>Create Post</div>
          <button className='add-post-btn' type='submit'>Post</button>
        </div>
        <div className="underline"></div>
        <textarea className='add-post' value={post} placeholder='Something on your mind, huh?' onChange={(e)=> setPost(e.target.value)} />
        
    </form>
  )
}

export default AddPost