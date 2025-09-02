import type { PrimaryButtonTypes } from '@/types/profile'
import React from 'react'



const PrimaryButton:React.FC<PrimaryButtonTypes> = ({icon,title,style,onClick,type}) => {
  return (
  
        <button 

        type={type}
        onClick={onClick}
        className={`${style}  bg-linear-to-l from-purple-600   to-indigo-600 p-2 flex items-center px-4 text-white rounded-lg  cursor-pointer`}>
          {icon}
          <span className="ml-2">{title}</span>
        </button>
  )
}

export default PrimaryButton