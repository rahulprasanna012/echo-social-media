import React, { useState, type ReactElement } from "react";
import { Eye, EyeOff } from "lucide-react";

type AuthInputProps = {
  type: string;
  placeholder: string;
  getInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon: ReactElement;
  name: string;
  value: string;
  isRequired?:boolean
};

const AuthInput: React.FC<AuthInputProps> = ({
  type,
  placeholder,
  getInput,
  error,
  icon,
  value,
  name,
  isRequired=false
}) => {
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPwd ? "text" : "password") : type;

  return (
    <div className=" flex flex-col items-center w-full">
   
        <label className="input w-full bg-white text-black border-purple-300 validator join-item flex items-center gap-2">
          <span className="text-gray-500">{icon}</span>
          <input
            className="bg-white grow outline-none placeholder:text-gray-400"
            type={inputType}
            name={name}
            placeholder={placeholder}
            required={isRequired}
            value={value}
            onChange={getInput}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
          {isPassword && (
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute inset-y-0 right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showPwd ? "Hide password" : "Show password"}
            title={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
        </label>

        

        {error && (
          <div id={`${name}-error`} className="mt-1 text-left text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

  );
};

export default AuthInput;
