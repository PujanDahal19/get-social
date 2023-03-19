import { createContext, useContext, useEffect, useState } from "react";
import { uuidv4 } from "@firebase/util";
import { FormContext } from "./FormContext";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const CommentContext = createContext();

const Comments = ({children})=>{
    const {userInfo} = useContext(FormContext);
    const[comments, setComments] = useState({});

    const addComment = async(comment, postId)=>{
        try{
            const commentId = uuidv4();
            await setDoc(doc(db, "comments", commentId),{
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                avatar: userInfo.avatar,
                userId: userInfo.id,
                text: comment,
                timestamp: Date.now(),
                postId: postId,
            });
        }catch(err){
            console.log(err);
        }
    }

    const deleteComment = async(id) =>{
        try{
            await deleteDoc(doc(db, "comments", id));
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        const q = query(collection(db, "comments"), orderBy('timestamp', "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const commentArr = [];
            querySnapshot.forEach((doc) => {
                commentArr.push({...doc.data(), id: doc.id});
            });
            setComments(commentArr);
        });

        return ()=>{
            unsubscribe();
        }
    },[])

    return (
        <CommentContext.Provider value={{
            addComment,
            comments,
            deleteComment,

        }}>
            {children}
        </CommentContext.Provider>
    )
}

export default Comments