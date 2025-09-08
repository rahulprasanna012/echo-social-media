import type { InputTypes } from '@/types/profile'
import React from 'react'




const Input:React.FC<InputTypes> = ({title,type,placeholder,onChange,value}) => {
  return (
    <div >
    <label className="font-semibold  ">{title}</label>

          
        <input
          className="input w-full my-2 border border-purple-400 focus:shadow-purple-600  bg-white"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
    
    </div>
    
        
  )
}

export default Input