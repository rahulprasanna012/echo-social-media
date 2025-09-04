import LoginForm from '@/components/auth/LoginForm'
import SigninForm from '@/components/auth/SigninForm';
import React, { useState } from 'react'

const AuthPage = () => {

  const [isNew,setIsNew]=useState<boolean>(false);
  const buttonText=isNew? "login":"signin"

  const text=isNew? "Already Have Account":"Don't have Account"

  return (
    <main className='bg-white text-black h-screen flex flex-col justify-center items-center'>
        
        
        {
          isNew?<SigninForm/>:<LoginForm/>
        }

        <p>{text} <button className='text-purple-600 hover:underline cursor-pointer' onClick={()=>setIsNew(!isNew)}>{buttonText}</button> </p>
    </main>
  )
}

export default AuthPage