import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiFillDelete } from 'react-icons/ai'
import { FormContext } from '../../context/FormContext'
import { formatDistanceToNow } from 'date-fns'
import { CommentContext } from '../../context/CommentContext'

const SingleComment = ({comment}) => {
  const {userInfo} = useContext(FormContext);
  const {deleteComment} = useContext(CommentContext);

  const handleDelete = (id) =>{
    deleteComment(id);
  }

  return (
    <div className='post-comment-container'>
        <div className="comment-user-details">
            <div className="comment-user-container">
                <img className="comment-user-avatar" src={comment.avatar} />
                <div className="comment-user-info">
                    <Link to={`/protected/profile/${comment.userId}`} className="comment-user-username" >
                        {comment.firstname} {comment.lastname}
                    </Link>
                    <p className="comment-user-timestamp">
                        {formatDistanceToNow(comment.timestamp)} {" "} ago
                    </p>
                </div>
            </div>
            {comment.userId === userInfo.id ? 
                <div className="user-btns">
                    <button onClick={()=>handleDelete(comment.id)} className="delete-btn"><AiFillDelete /></button>
                </div>
            : null}
        </div>
        <div className="comment-details">
          {comment.text}
        </div>
    </div>
  )
}

export default SingleComment