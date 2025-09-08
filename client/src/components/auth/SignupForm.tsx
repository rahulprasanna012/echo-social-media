import React, { useMemo, useState } from "react";
import AuthInput from "./AuthInput";
import { CircleUserRound ,FolderPen,KeyRound, Mail, PlusIcon, User } from "lucide-react";
import { useRedirect } from "@/hooks/useRedirect";
import type {  SignupFormTypes } from "@/types/auth";
import { signUp } from "@/services/authService.ts";
import { useUser } from "@/context/UserContext.tsx";




const SignupForm: React.FC = () => {
  const [user, setUser] = useState<SignupFormTypes>({ name:"",email: "",username:"", password: "" ,bio:""});
   const [profile, setProfile] = useState<File>();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const {errors,handleError,handleUser,handleLoading,loading}=useUser()
  
  const { redirect } = useRedirect();

  function getInput(e: React.ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function validate(): boolean {
  let valid = true;

  
  if (!user.email) {
    handleError("Email is required");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    handleError("Enter a valid email address");
    valid = false;
  }

  if (!user.password) {
     handleError("Password is required");
    valid = false;
  } else if (user.password.length < 6) {
    handleError("Password must be at least 6 characters");
    valid = false;
  }

 


  return valid;
}

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfile(file)
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
  };

  const handleForm =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLoading(true)
    if (!validate()) return;
    const formData={
      name:user.name,
      email:user.email,
      username:user.username,
      profile:profile,
      password:user.password,
      bio:user.bio
    }
    try{
        const res= await signUp(formData) 
         redirect("/")
        handleUser(res.user)
        handleError("")
       
        
    }catch(err:any){
      handleError(err);
      
    }finally{
      handleLoading(false)
    }
    
    
    
    
  };

  const isDisabled = useMemo(() => !user.email || !user.password, [user]);

  return (
    <div className="w-full md:w-[420px]">
      <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur p-6 shadow-xl ring-1 ring-black/5">
        
        
        <div className="mb-3 text-center">
          <h1 className=" text-xl font-semibold text-gray-900">Sign in</h1>
          <p className="mt-1 text-sm text-gray-500">Access your dashboard in seconds</p>
        </div>

       
        <div className="mb-6 flex items-center justify-center">
          <label
            htmlFor="profile"
            className="group relative inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-full ring-2 ring-purple-200 hover:ring-purple-300 transition"
            aria-label="Upload profile picture"
            title="Upload profile picture"
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Selected avatar"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600">
                <PlusIcon className="h-6 w-6 text-white transition group-hover:scale-110" />
              </div>
            )}
            <input
              id="profile"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            {/* Small overlay camera icon */}
            <span className="absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5">
              <CircleUserRound className="h-4 w-4 text-gray-700" />
            </span>
          </label>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleForm} noValidate>

          <AuthInput
          
            placeholder="rahul"
            type="text"
            isRequired={true}
            value={user.name}
            name="name"
            icon={<FolderPen className="h-4 w-4" />}
            getInput={getInput}
          />
          <AuthInput
          
            placeholder="you@example.com"
            type="email"
            value={user.email}
            name="email"
            icon={<Mail className="h-4 w-4" />}
            getInput={getInput}
          />

          <AuthInput
          
            placeholder="@username"
            type="text"
            isRequired={true}
            value={user.username}
            name="username"
            icon={<User className="h-4 w-4" />}
            getInput={getInput}
          />

          <div className="relative">
            <AuthInput
              isRequired={true}
              placeholder="••••••••"
              type={"password"}
              value={user.password}
              name="password"
              icon={<KeyRound className="h-4 w-4" />}
              getInput={getInput}
            />
           
          </div>
          

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              rows={3}
              placeholder="Tell us a little about yourself…"
              value={user.bio}
             onChange={(e) => setUser({ ...user, bio: e.target.value })}

              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-black outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500"
            />
           

          </div>

          {errors && (
          <div id={`bio-error`} className="mt-1 text-left text-sm text-red-600">
            {errors}
          </div>
        )}

          <button
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-white shadow-lg shadow-purple-600/20 transition hover:brightness-[1.05] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isDisabled || loading}
          >
            {loading?"wait...":"Sign up"}
          </button>

        </form>

       
       
      </div>
    </div>
  );
};

export default SignupForm;
