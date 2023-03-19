import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import {storage} from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { uuidv4 } from "@firebase/util";
import { FormContext } from "./FormContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();

const Post = ({children})=>{

    const[posts, setPosts] = useState({});
    const[openModal, setOpenModal] = useState(false);
    const[file, setFile] = useState(null);

    const navigate = useNavigate();

    const {userInfo} = useContext(FormContext);

    const addPost = async(post)=>{
        try{
            const postId = uuidv4();
            await setDoc(doc(db, "posts", postId),{
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                avatar: userInfo.avatar,
                userId: userInfo.id,
                post: post,
                timestamp: Date.now(),
                postId: postId,
                likes: [],
            });
        }catch(err){
            console.log(err);
        }
    }

    const deletePost = async(id) =>{
        try{
            await deleteDoc(doc(db, "posts", id));

            // Delete Comments Affiliated with the posts
            const q = query(collection(db, "comments"), where("postId", "==", id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc)=> deleteDoc(doc.ref));
        }catch(err){
            console.log(err);
        }
        navigate('/protected/home')
    }
    

    const updateAvatar = async()=>{
        if(!file){
            return;
        }else{
            const fileRef = ref(storage, 'avatars/' + userInfo.id);
            await uploadBytes(fileRef, file);
            const avatarURL = await getDownloadURL(fileRef);
            const docRef = doc(db, "users", userInfo.id);
            updateDoc(docRef, {avatar: avatarURL});
        }
        navigate(0);
    }

    const updateBio = async(bio)=>{
        const docRef = doc(db, "users", userInfo.id);
        await updateDoc(docRef, {
            bio : bio,
        });
        navigate(0);
    }

    const updateLike = async(id, isLiked, uid) =>{
        const docRef = doc(db, "posts", id);
        await updateDoc(docRef, {
            likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
        })
        
    }

    useEffect(()=>{
        const q = query(collection(db, "posts"), orderBy('timestamp', "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postArr = [];
            querySnapshot.forEach((doc) => {
                postArr.push({...doc.data(), id: doc.id});
            });
            setPosts(postArr);
        });

        return ()=>{
            unsubscribe();
        }
    },[])



    return (
        <PostContext.Provider value={{
            addPost,
            deletePost,
            posts,
            setOpenModal,
            openModal,
            file,
            setFile,
            updateAvatar,
            updateBio,
            updateLike,
        }}>
            {children}
        </PostContext.Provider>
    )
}

export default Post