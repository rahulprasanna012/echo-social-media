import React, { type ReactElement } from 'react'


type AuthInputProps = {
  type: string,
  placeholder: string,
  getInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  error: string,
  icon: ReactElement,
  name: string,
  value: string
}
const AuthInput :React.FC<AuthInputProps> = ({type,placeholder,getInput,error,icon,value,name}) => {
  return (
    <div className="join block my-6">
  <div>
    <label className="input bg-white text-black border-purple-300 validator join-item">
        {icon}
      
      <input  className="bg-white" type={type} name={name} placeholder={placeholder} required={true} value={value} onChange={getInput}/>
    </label>
    <div className="validator-hint hidden text-left ml-3">{error}</div>
  </div>
</div>
  )
}

export default AuthInput