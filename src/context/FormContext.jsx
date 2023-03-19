import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth, db} from '../firebase/firebase'

export const FormContext = createContext();

const AuthForm = ({children})=>{
    const[user, setUser] = useState({});
    const[userInfo, setUserInfo] = useState(null);
    const[certainUser, setCertainUser] = useState({});
    const navigate = useNavigate();

    const loginUser = async(email, password)=>{
        try{
            await signInWithEmailAndPassword(auth, email, password);
        }catch(err){
            console.log(err);
        }
        navigate('/protected/home');
    }

    const registerUser = async(firstname, lastname, email, password)=>{
        try{
            const currentUser = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, "users", currentUser.user.uid),{
                firstname: firstname.toLowerCase(),
                lastname: lastname.toLowerCase(),
                avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
                id: currentUser.user.uid,
                bio: "",
                date: Date.now(),
            }); 
        }catch(err){
            console.log(err);
        }
        navigate('/protected/home');
    }

    const logoutUser = async()=>{
        try{
            await signOut(auth);

        }catch(err){
            console.log(err);
        }

    }

    const fetchData = async(currentUser)=>{
        try{
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            setUserInfo(docSnap.data());
        }catch(err){
            console.log(err);
        }
    }

    const fetchUserDetail = async(id)=>{
        try{
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            setCertainUser(docSnap.data());
        }catch(err){
            console.log(err);
        }
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            if(currentUser){
                setUser(currentUser);
                fetchData(currentUser);
            }else{
                setUser(null);
            }
            
        })
        

        return ()=>{
            unsubscribe();
        }
    },[])

    return(
        <FormContext.Provider value={{
            loginUser,
            registerUser,
            logoutUser,
            user,
            userInfo,
            certainUser,
            fetchUserDetail,
        }}>
            {children}
        </FormContext.Provider>
    )
}

export default AuthForm