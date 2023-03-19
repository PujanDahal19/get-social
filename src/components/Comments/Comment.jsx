import React, { useContext } from 'react'
import SingleComment from './SingleComment'
import Navbar from '../Tabs/Navbar'
import Posts from '../Mainbar/Posts'
import { PostContext } from '../../context/PostContext'
import { useParams } from 'react-router-dom'
import Sidebar from '../Tabs/Sidebar'
import Popup from '../Popup/Popup'
import AddComment from './AddComment'
import { CommentContext } from '../../context/CommentContext'

const Comment = () => {
    const {openModal, setOpenModal} = useContext(PostContext);
    const{posts} = useContext(PostContext);
    const {id} = useParams();
    const {comments} = useContext(CommentContext);

    return (
    <div className='container'>
        <Navbar />

        <div className="bar-container">
            <div className="comment-container">
                {posts.length > 0 ?
                    posts.filter(item => {return item.postId === id}).map((post) => (
                        <Posts post={post}  key={post.postId} />
                    ))
                : <h1 className='loading'>No post available</h1>}

                <AddComment postId={id} />
                
                {comments.length > 0 ? 
                    comments.filter(item=> {return item.postId === id}).map((comment)=>(
                        <SingleComment comment={comment} key={comment.id} />
                    )) 
                : <h1 className='loading'>No comments yet.</h1>}
            </div>
            <Sidebar setOpenModal={setOpenModal} />
            
        </div>
        <Popup open={openModal} onClose={()=> setOpenModal(false)} />
    </div>
  )
}

export default Comment