import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Navigate, useNavigate } from "react-router-dom";

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { extractErrorMessages } from '@/util/errorUtil';
import api from '@/lib/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import    useAuthStore  from "../../lib/Store/authStore"

const LoginForm = () => {
    const navigate = useNavigate();
    const [isLoading , setisloading]=useState(false)

    const {   setAuth }= useAuthStore() 


     const [formValues, setFormValues] = useState({
         
            email: '',
            password: '',
        
        })
        const [error, setError] = useState(null)
    
        
        const handleInputChange = (e) => {
            const { name, value } = e.target
            setFormValues({
                ...formValues,
                [name]: value
            })
        }
       

        
   
     const   loginMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/login', userData)
            console.log("responseData",response.data)
            return response.data
        },
        onSuccess: (data) => {
          
            if (data.token) {
                const user = data.userExists;
                const token = data.token;
                // console.log("user",data.userExists);
                // console.log("tokennn",data.token)

                 setAuth(user, token);
                navigate('/dashboard');
            }

        },
        onError: (err) => {
            console.log("errpr",err)
             setError(extractErrorMessages(err))
        }
    })


     const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!formValues.email || !formValues.password) {
            setError('All fields are required')
            return
        }

        loginMutation.mutate({
            email: formValues.email,
            password: formValues.password
        })
    }

  return (
      <Card className="w-full border-border">
            <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl text-center">Signin</CardTitle>
                <CardDescription className={"text-center"}>
                    Enter your credentials to access your account
                </CardDescription>

                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4 pt-0">
                        {
                            error && (
                                <div className='p-3 bg-destructive/10 text-destructive text-sm rounded-md'>
                                    {error}
                                </div>
                            )
                        }

                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Email
                            </div>
                            <Input name="email" placeholder="email@email.com" required

                                value={formValues.email}
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Password
                            </div>
                            <Input name="password" type={"password"} placeholder="*****" required
                                value={formValues.password}
                                onChange={handleInputChange}

                            />
                        </div>

                        <div className='py-4'>
                            <Button type="submit" className={"w-full cursor-pointer"}>
                                {isLoading ? (<span className='flex items-center gap-2'><LoaderCircle /> login account... </span>) : ("Login Account")}
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className={"flex justify-center pt-0"}>
                        <div className='text-center text-sm'>
                            Don't have an account ? <a onClick={() => navigate('/register')} className='text-primary hover:underline cursor-pointer'> Sign up</a>
                        </div>
                    </CardFooter>
                </form>

                </CardHeader>
                </Card>
      

  )
}

export default LoginForm
