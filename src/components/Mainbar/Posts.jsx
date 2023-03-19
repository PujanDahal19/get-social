import React, { useContext, useEffect, useState } from 'react'
import {AiFillDelete,AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {FaRegComment, FaComment} from 'react-icons/fa'
import { PostContext } from '../../context/PostContext'
import { formatDistanceToNow } from 'date-fns'
import { FormContext } from '../../context/FormContext'
import { Link } from 'react-router-dom'
import { CommentContext } from '../../context/CommentContext'


const Posts = ({post}) => {
    const{deletePost, updateLike} = useContext(PostContext);
    const {userInfo} = useContext(FormContext);
    const {comments} = useContext(CommentContext);

    const isLiked = userInfo ? post.likes.includes(userInfo.id) : null;
    const[count,setCount] = useState(0);

    const handleDelete = (id)=>{
        deletePost(id);
    }

    const toggleLike = (id)=>{
        updateLike(id, isLiked, userInfo.id);
    }
    
    const updateComment = ()=>{
        comments.forEach(comment =>{
            if(comment.postId === post.postId){
                setCount(prevCount => prevCount + 1);
            }
        })
    }

    useEffect(()=>{
        updateComment();
    },[])
  
    if(post){
        return (
            <div className='post-container'>
                <div className="user-details">
                    <div className="user-container">
                        <img className="user-avatar" src={post.avatar} />
                        <div className="user-info">
                            <Link to={`/protected/profile/${post.userId}`} className="user-username">
                                {post.firstname} {post.lastname}
                            </Link>
                            <p className="user-timestamp">
                                {formatDistanceToNow(post.timestamp)} {" "} ago
                            </p>
                        </div>
                    </div>
                    {post.userId === userInfo?.id ? 
                        <div className="user-btns">
                            <button onClick={()=>handleDelete(post.id)} className="delete-btn"><AiFillDelete /></button>
                        </div>
                    : null}
                </div>
                <div className="post-details">
                {post.post}
                </div>
                <div className="like-btns">
                    <div className="like">
                        <button className='like-btn' onClick={()=>toggleLike(post.id)}>{isLiked ? <AiFillHeart /> : <AiOutlineHeart />}</button>
                        <p>{post.likes.length}</p>
                    </div>
                    <div className="like">
                        <Link to={`/protected/comment/${post.postId}`}className='comment-btn'>{count > 0 ? <FaComment /> : <FaRegComment />}</Link>
                        <p>
                            {count}
                        </p>
                    </div>
                    
                </div>
            </div>
        )
    }else{
        return <h1 className='loading'>No Posts Available</h1>
    }
}

export default Posts