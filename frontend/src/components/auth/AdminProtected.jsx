import api from '@/lib/api/apiClient';
import useAuthStore from '@/lib/Store/authStore';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router';

const AdminProtected = ({children}) => {

      const location= useLocation()
        const navigate = useNavigate();

    const {user,token,  setAuth,   clearAuth}= useAuthStore();
    console.log("tokennnnnnnn",token)
    
    const {data, error, isLoading, isError, isSuccess}=useQuery({
        queryKey:['currentUser'],
        queryFn:async()=>{
            const response= await api.get("/admin/dashboard",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            );
            return response.data

        },
        retry:1
    })

  useEffect(()=>{
         if(isError){
            //  clearAuth();
         }
 
     },[isError,error,clearAuth])
 
     console.log("data",data)
 
      // success case
     useEffect(() => {
         if (isSuccess && data) {
             setAuth(data.user, token)
         }
 
     }, [isSuccess, data, setAuth, token])

    //  useEffect(() => {
    //         if (isSuccess && data) {
    //             setAuth(data.user, token)
    //         }
    
    //     }, [isSuccess, data, setAuth, token])
    
      if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin' />
            </div>
        )
    }

    


    // if (isError) {
    //     console.log("error here", error);
    //     return <Navigate to="/login" state={{ from: location }} replace />
    // }

    

    console.log("useres",user.role)
    // console.log("data",data.user.role)
    console.log("errreee",error)
   
    if(user.role !="admin"){
            return <Navigate to="/dashboard" state={{ from: location }} replace />
    }
    //  if (!user) {
    //         console.log("user not found", user);
    //         return <Navigate to="/login" state={{ from: location }} replace />
    //     }




  return  children
}

export default AdminProtected
