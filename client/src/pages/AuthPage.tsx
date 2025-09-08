// pages/AuthPage.tsx
import LoginForm from '@/components/auth/LoginForm'
import SigninForm from '@/components/auth/SignupForm'
import React, { useState } from 'react'

const AuthPage = () => {
  const [isNew, setIsNew] = useState<boolean>(false)
  const buttonText = isNew ? 'Login' : 'Sign up'
  const text = isNew ? 'Already have an account?' : "Don't have an account?"

  return (
    <main
      className="
        min-h-dvh w-full
        bg-white text-black
        flex items-center justify-center
        overflow-y-auto
        px-4 py-8
      "
    >
      <div className="w-full max-w-md">
        {isNew ? <SigninForm /> : <LoginForm />}

        <p className="mt-4 text-center text-sm text-gray-600">
          {text}{' '}
          <button
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={() => setIsNew(!isNew)}
          >
            {buttonText}
          </button>
        </p>
      </div>
    </main>
  )
}

export default AuthPage
