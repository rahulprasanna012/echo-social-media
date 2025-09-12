import React, { useEffect, useMemo, useRef, useState } from "react";
import AuthInput from "./AuthInput";
import { CircleUserRound, FolderPen, KeyRound, Mail, PlusIcon, User } from "lucide-react";
import { useRedirect } from "@/hooks/useRedirect";
import type { SignupFormTypes } from "@/types/auth";
import { signUp } from "@/services/authService";
import { useUser } from "@/context/UserContext";

const AVATAR_MAX_MB = 2;
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];

const SignupForm: React.FC = () => {
  const [user, setUser] = useState<SignupFormTypes>({
    name: "",
    email: "",
    username: "",
    password: "",
    bio: "",
  });
  const [profile, setProfile] = useState<File | undefined>();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { errors, handleError, handleUser, handleLoading, loading, connectSocket } = useUser();
  const { redirect } = useRedirect();

  // revoke preview URL on unmount or when new file chosen
  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  function getInput(e: React.ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function validate(): boolean {
    // clear previous error
    handleError("");

    let valid = true;

    if (!user.name.trim()) {
      handleError("Name is required");
      valid = false;
    } else if (!user.username.trim()) {
      handleError("Username is required");
      valid = false;
    } else if (!user.email) {
      handleError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      handleError("Enter a valid email address");
      valid = false;
    } else if (!user.password) {
      handleError("Password is required");
      valid = false;
    } else if (user.password.length < 6) {
      handleError("Password must be at least 6 characters");
      valid = false;
    }

    // avatar validation (optional field)
    if (profile) {
      if (profile.size > AVATAR_MAX_MB * 1024 * 1024) {
        handleError(`Profile image too large. Max ${AVATAR_MAX_MB}MB.`);
        valid = false;
      } else if (!ALLOWED_MIME.includes(profile.type)) {
        handleError("Unsupported image type. Use JPG, PNG, or WEBP.");
        valid = false;
      }
    }

    return valid;
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // validate early
    if (file.size > AVATAR_MAX_MB * 1024 * 1024) {
      handleError(`Profile image too large. Max ${AVATAR_MAX_MB}MB.`);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (!ALLOWED_MIME.includes(file.type)) {
      handleError("Unsupported image type. Use JPG, PNG, or WEBP.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    // cleanup previous preview
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);

    setProfile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const clearAvatar = () => {
    setProfile(undefined);
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return; // don't set loading if invalid

    handleLoading(true);
    try {
      const formData = {
        name: user.name.trim(),
        email: user.email.trim(),
        username: user.username.trim(),
        profile, // optional File
        password: user.password,
        bio: user.bio?.trim() || "",
      };

      const res = await signUp(formData);
      handleUser(res.user);
      connectSocket(res.user);
      handleError(""); // clear any prior errors
      redirect("/");
    } catch (err: any) {
      handleError(err?.message ?? String(err) ?? "Registration failed");
    } finally {
      handleLoading(false);
    }
  };

  const isDisabled = useMemo(
    () => !user.email || !user.password || !user.username || !user.name,
    [user]
  );

  return (
    <div className="w-full md:w-[420px]">
      <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur p-6 shadow-xl ring-1 ring-black/5">
        <div className="mb-3 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Sign up</h1>
          <p className="mt-1 text-sm text-gray-500">Create your account</p>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <label
            htmlFor="profile"
            className="group relative inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-full ring-2 ring-purple-200 hover:ring-purple-300 transition"
            aria-label="Upload profile picture"
            title="Upload profile picture"
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="Selected avatar" className="h-full w-full rounded-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600">
                <PlusIcon className="h-6 w-6 text-white transition group-hover:scale-110" />
              </div>
            )}
            <input
              id="profile"
              ref={fileRef}
              type="file"
              accept={ALLOWED_MIME.join(",")}
              className="hidden"
              onChange={handleAvatarChange}
            />
            <span className="absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5">
              <CircleUserRound className="h-4 w-4 text-gray-700" />
            </span>
          </label>

          {avatarPreview && (
            <button
              type="button"
              onClick={clearAvatar}
              className="ml-3 text-xs text-red-600 underline"
            >
              Remove
            </button>
          )}
        </div>

        <form className="space-y-4" onSubmit={handleForm} noValidate>
          <AuthInput
            placeholder="rahul"
            type="text"
            isRequired
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
            isRequired
            value={user.username}
            name="username"
            icon={<User className="h-4 w-4" />}
            getInput={getInput}
          />
          <div className="relative">
            <AuthInput
              isRequired
              placeholder="••••••••"
              type="password"
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
            <div className="mt-1 text-left text-sm text-red-600">{errors}</div>
          )}

          <button
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-white shadow-lg shadow-purple-600/20 transition hover:brightness-[1.05] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isDisabled || loading}
          >
            {loading ? "Wait..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
