import type { PrimaryButtonTypes } from '@/types/profile'
import React from 'react'



const SecondaryButton:React.FC<PrimaryButtonTypes> = ({icon,title,style,onClick,type}) => {
  return (
  
        <button 
        onClick={onClick}
        type={type}
        className={`${style}  border border-purple-200 text-purple-600 hover:bg-purple-50 p-2  rounded-lg flex items-center cursor-pointer`}>
          {icon}
          <span className="ml-2">{title}</span>
        </button>
  )
}

export default SecondaryButton