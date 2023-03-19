import React, { useContext } from 'react'
import { PostContext } from '../../context/PostContext';
import AddPost from './AddPost'
import Posts from './Posts'

const Mainbar = () => {
  const{posts} = useContext(PostContext);
  return (
    <div className='main-container'>
        <AddPost />
        {posts.length > 0 ? posts.map((post)=>(
          <Posts post={post}  key={post.postId} />
        )) : <h1 className='loading'>Loading...</h1>}
    </div>
  )
}

export default Mainbar