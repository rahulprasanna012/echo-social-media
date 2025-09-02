import { ArrowLeft } from 'lucide-react'
import React from 'react'
import PostForm from '../home/PostForm'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

    const nav=useNavigate()

  const handleBack=()=>{
        nav(-1)
  }

  return (
    <div className='w-11/12 md:w-3/5 py-10 md:py-20'>

        <div className='flex items-center py-6'>
          <button className='p-2 border border-purple-300 rounded bg-white text-purple-600 mr-3 cursor-pointer hover:shadow' onClick={handleBack}>
            <ArrowLeft />
          </button>
          <div>
            <h1 className='font-bold text-2xl'>Create New Post</h1>
            <p className='text-gray-600'>Share your thoughts with the world</p>
          </div>

      </div>
      <PostForm/>


      </div>
  )
}

export default CreatePost