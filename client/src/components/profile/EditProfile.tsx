// components/profile/EditProfile.tsx
import { useEffect, useState } from "react";
import BackButton from "../create/BackButton";
import Input from "../Input";
import SecondaryButton from "../SecondaryButton";
import PrimaryButton from "../PrimaryButton";
import { useRedirect } from "@/hooks/useRedirect";
import { CameraIcon, CloudUpload, Save, X } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { updateMe } from "@/services/authService";
import FileInputButton from "@/components/profile/FileInputButton.tsx";
import TextArea from "@/components/profile/TextArea.tsx";

const EditProfile = () => {
  const { redirect } = useRedirect();
  const { user, handleUser } = useUser();

  const [name, setName] = useState(user?.name ?? "");
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [password, setPassword] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(user?.profile ?? null);
  const [coverPreview, setCoverPreview] = useState<string | null>(user?.cover_image ?? null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(user?.name ?? "");
    setUsername(user?.username ?? "");
    setEmail(user?.email ?? "");
    setBio(user?.bio ?? "");
    setProfilePreview(user?.profile ?? null);
    setCoverPreview(user?.cover_image ?? null);
  }, [user?._id]);

  const onPickProfile = (file: File | null) => {
    setProfileFile(file);
    setProfilePreview(file ? URL.createObjectURL(file) : user?.profile ?? null);
  };

  const onPickCover = (file: File | null) => {
    setCoverFile(file);
    setCoverPreview(file ? URL.createObjectURL(file) : user?.cover_image ?? null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name?.trim() || !username?.trim() || !email?.trim()) {
      alert("Name, username, and email are required");
      return;
    }

    const form = new FormData();
    form.append("name", name.trim());
    form.append("username", username.trim());
    form.append("email", email.trim());
    form.append("bio", bio ?? "");
    if (password.trim()) form.append("password", password.trim());
    if (profileFile) form.append("profile", profileFile);       // field names must match backend
    if (coverFile) form.append("cover_image", coverFile);

    try {
      setSaving(true);
      const res = await updateMe(form);
      handleUser(res.user);
      alert("Profile updated");
      redirect(`/profile/${res.user._id}`);
    } catch (err: any) {
      alert(err?.response?.data?.error || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-11/12 md:w-3/5 py-10 md:py-20 font-semibold">
      <BackButton name="Edit Profile" content="Update your personal information" />

      <form onSubmit={onSubmit}>
        <h1 className="text-3xl">Profile Information</h1>

        {/* Cover Photo */}
        <div className="my-6">
          <p className="my-3">Cover Photo</p>
          <div className="relative rounded-lg items-center justify-center h-46 bg-gradient-to-r from-purple-600 to-indigo-600 overflow-hidden">
            {coverPreview && <img src={coverPreview} className="w-full h-46 object-cover" />}

            {/* separate input + button */}
            <div className="absolute bottom-3 right-3">
              <FileInputButton
                id="cover-upload"
                accept="image/*"
                onFile={onPickCover}
                button={
                  <button
                    type="button"
                    className="bg-white text-purple-600 px-3 py-2 rounded-md border flex items-center gap-2 shadow-sm"
                  >
                    <CloudUpload className="h-4 w-4" />
                    Change cover
                  </button>
                }
              />
            </div>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="my-3">
          <p className="font-semibold">Profile Photo</p>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-purple-600 via-purple-600 to-indigo-600 text-2xl font-bold text-white size-24 rounded-full flex justify-center items-center border-white border-4 overflow-hidden">
              {profilePreview ? (
                <img src={profilePreview} className="w-full h-full object-cover rounded-full" />
              ) : (
                <span>{name?.[0] ?? "P"}</span>
              )}
            </div>

            {/* separate input + button */}
            <FileInputButton
              id="profile-upload"
              accept="image/*"
              onFile={onPickProfile}
              button={
                <button
                  type="button"
                  className="bg-white text-purple-600 px-3 py-2 rounded-md border flex items-center gap-2 shadow-sm"
                >
                  <CameraIcon className="h-4 w-4" />
                  Change Photo
                </button>
              }
            />
          </div>
        </div>

        {/* Text inputs */}
        <Input
          title="Full Name"
          placeholder="Enter name"
          value={name}
          type="text"
          onChange={(e: any) => setName(e.target.value)}
        />

        <TextArea
          title="Bio"
          placeholder="Tell us about yourself...."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <Input
          title="Username"
          placeholder="Enter username"
          value={username}
          type="text"
          onChange={(e: any) => setUsername(e.target.value)}
        />
        <Input
          title="Email"
          placeholder="Enter email"
          value={email}
          type="email"
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <Input
          title="New Password"
          placeholder="••••••"
          value={password}
          type="password"
          onChange={(e: any) => setPassword(e.target.value)}
        />

        {/* Separate buttons */}
        <div className="flex items-center justify-end mt-4 gap-3">
          <SecondaryButton
          style=""
            title="Cancel"
            icon={<X />}
            onClick={() => redirect(`/profile/${user?._id}`)}
            type="button"
          />
          <PrimaryButton
          style=""
          onClick={()=>{}}
            title={saving ? "Saving..." : "Save"}
            icon={<Save size={20} />}
            type="submit"
            disabled={saving}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
