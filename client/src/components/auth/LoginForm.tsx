import React, { useMemo, useState } from "react";
import AuthInput from "./AuthInput";
import { KeyRound, Mail } from "lucide-react";
import { useRedirect } from "@/hooks/useRedirect";
import { useUser } from "@/context/UserContext.tsx";
import type { LoginFormTypes } from "@/types/auth.ts";
import { Login } from "@/services/authService.ts";



const LoginForm: React.FC = () => {
  const [login, setLogin] = useState<LoginFormTypes>({ indentifires: "", password: "" });


  const {errors,handleError,handleUser,handleLoading,loading}=useUser()
  const { redirect } = useRedirect();

  function getInput(e: React.ChangeEvent<HTMLInputElement>): void {

    console.log(e.target.name);
    
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  function validate(): boolean {
  let valid = true;

  
  if (!login.indentifires) {
    handleError("Email or Username is required");
    valid = false;
  }

  if (!login.password) {
     handleError("Password is required");
    valid = false;
  } else if (login.password.length < 6) {
    handleError("Password must be at least 6 characters");
    valid = false;
  }

 


  return valid;
}



  const handleForm =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLoading(true)
    if (!validate()) return;


    try{
        const res= await Login(login)
        redirect("/")
        handleUser(res.user)
        handleError("")
        
    }catch(err:any){

      handleError(err)
    }
    finally{
      handleLoading(false)
    
    }


    
  };

  const isDisabled = useMemo(() => !login.indentifires || !login.password, [login]);

  return (
    <div className="w-full md:w-[420px]">
      <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur p-6 shadow-xl ring-1 ring-black/5">
       
        <div className="mb-6 text-center">
          <p className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
            Welcome back
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900">Login in</h1>
          <p className="mt-1 text-sm text-gray-500">Access your dashboard in seconds</p>
        </div>

 
        <form className="space-y-4 " onSubmit={handleForm} noValidate>
          <AuthInput
            isRequired={true}
            placeholder="you@example.com or username"
            type="text"
            value={login.indentifires}
            name="indentifires"
            icon={<Mail className="h-4 w-4" />}
            getInput={getInput}
          />

          <div className="relative">
            <AuthInput
            isRequired={true}
            
              placeholder="••••••••"
              type= "password"
              value={login.password}
              name="password"
              icon={<KeyRound className="h-4 w-4" />}
              getInput={getInput}
            />
         
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="inline-flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              Remember me
            </label>
           
          </div>
          {errors && (
          <div  className="mt-1 text-left text-sm text-red-600">
            {errors}
          </div>
        )}

          <button
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-white shadow-lg shadow-purple-600/20 transition hover:brightness-[1.05] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isDisabled|| loading}
          >
            {
              loading?"wait...":"Login"
            }
          </button>
        </form>

       
       
      </div>
    </div>
  );
};

export default LoginForm;
