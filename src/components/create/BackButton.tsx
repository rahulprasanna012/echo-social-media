import { useRedirect } from '@/hooks/useRedirect'
import type { BackButtonProps } from '@/types/profile'
import { ArrowLeft } from 'lucide-react'
import React from 'react'


const BackButton:React.FC<BackButtonProps> = ({name,content}) => {
 
    
      const {redirect}=useRedirect()
    
  return (
    <div className='flex items-center py-6'>
          <button className='p-2 border border-purple-300 rounded bg-white text-purple-600 mr-3 cursor-pointer hover:shadow' onClick={()=>{redirect(-1)}}>
            <ArrowLeft />
          </button>
          <div>
            <h1 className='font-bold text-2xl'>{name}</h1>
            <p className='text-gray-600'>{content}</p>
          </div>

      </div>
  )
}

export default BackButton