import type { ProfileTypes } from "@/types/profile"
import type { FC } from "react"



const ProfileIcon:FC<ProfileTypes> = ({className,title}) => {
  return (
      <div className={`${className} text-white font-bold bg-linear-to-br  from-purple-600 to-indigo-600    flex items-center justify-center shadow-lg border-2 border-purple-300`} >
                      <p>{title}</p>
                  </div>
  )
}

export default ProfileIcon