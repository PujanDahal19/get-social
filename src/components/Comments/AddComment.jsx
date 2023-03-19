import React, { useContext, useState } from 'react'
import { CommentContext } from '../../context/CommentContext';

const AddComment = ({postId}) => {
    
    const[comment, setComment] = useState('');

    const {addComment} = useContext(CommentContext);

    const handleCommentAdd = (e)=>{
      e.preventDefault();
      {comment.length > 0 && addComment(comment, postId)};
      setComment('');
    }
    return (
    <form className='comment-form' onSubmit={handleCommentAdd}>
        <input type="text" value={comment} placeholder='Add a comment' onChange={e=> setComment(e.target.value)} className='input-comment' />
        <button type='submit' className='submit-comment'>Add</button>
    </form>
  )
}

export default AddComment