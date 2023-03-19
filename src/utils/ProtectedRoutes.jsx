import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { FormContext } from '../context/FormContext';

const ProtectedRoutes = () => {
    const{user} = useContext(FormContext);
    if(user === null){
        return <Navigate to='/login' replace={true} />
    }else{
        return <Outlet />
    }
    
}

export default ProtectedRoutes