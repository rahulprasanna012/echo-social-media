
import React, { createContext, useContext, useState, type ReactNode } from "react";


type ContextValueTypes={
errors:string;
handleError:(err:string)=>void;
handleUser :(data:UserTypes)=>void;
user:UserTypes;
handleLoading:(state:boolean)=>void;
loading:boolean;
}

type UserTypes={
    name:string;
        email:string;
        username:string;
        _id:string;
        bio?:string;
        profile?:string;
        cover_image?:string;
        followers?:string[];
        following?:string[]
}


const UserContext=createContext<ContextValueTypes|undefined>(undefined)




export const UserProvider:React.FC<{children:ReactNode}>=({children})=>{

    const [errors, setErrors] = useState<string>("")
    const [loading,setLoading]=useState<boolean>(false)
    const [user,setUser]=useState<UserTypes>({
        name:"",
        email:"",
        username:"",
        _id:"",
        bio:"",
        profile:"",
        cover_image:"",
        followers:[],
        following:[]
    })

    
   

    const handleUser=(data:UserTypes)=>{
        setUser(data)
    }
    const handleLoading=(state:boolean)=>{
        setLoading(state)
    }
    const handleError=(err:string)=>{
        setErrors(err)
    }


    const value:ContextValueTypes={
        errors,
        handleError,
        handleUser,
        user,
        handleLoading,
        loading,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>


}



export const useUser=()=>{

    const ctx=useContext(UserContext)

    if (!ctx){
        throw new Error("useUser must be used within an UserProvider")
    }

    return ctx

}