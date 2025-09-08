import React, { useState } from "react";
import AuthInput from "./AuthInput";
import { CircleUserRound, KeyRound, Mail, User } from "lucide-react";
import { useRedirect } from "@/hooks/useRedirect";

type LoginFormTypes = {
  email: string;
  password: string;
};

const SigninForm = () => {
  const [login, setLogin] = useState<LoginFormTypes>({
    email: "",
    password: "",
  });

  const { redirect } = useRedirect();

  function getInput(e: React.ChangeEvent<HTMLInputElement>): void {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  const handleForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    redirect("/");
  };

  return (
    <div className=" w-full md:w-1/4   rounded-2xl p-6 bg-linear-to-r from-purple-50  to-indigo-50">
      <h1 className="text-black text-center font-bold text-3xl">Sign in</h1>
      <form className="text-center" onSubmit={handleForm}>
        <AuthInput
          error="Username not found"
          placeholder="@username"
          type="email"
          value={login.email}
          name="email"
          icon={<User />}
          getInput={getInput}
        />
        <AuthInput
          error="Username not found"
          placeholder="name"
          type="email"
          value={login.email}
          name="email"
          icon={<CircleUserRound />}
          getInput={getInput}
        />
        <AuthInput
          error="Username not found"
          placeholder="mail"
          type="email"
          value={login.email}
          name="email"
          icon={<Mail />}
          getInput={getInput}
        />

        <AuthInput
          error="password not found"
          placeholder="password"
          type="password"
          value={login.password}
          name="password"
          icon={<KeyRound />}
          getInput={getInput}
        />

        <button className="btn w-full bg-purple-500 border-0  ">Login </button>
      </form>
    </div>
  );
};

export default SigninForm;
