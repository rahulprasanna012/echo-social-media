// components/profile/ProfileSection.tsx
import { useRedirect } from "@/hooks/useRedirect";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { PublicUser } from "@/types/user.ts";
import { getUserProfile } from "@/services/userService.ts";

const ProfileSection = () => {
  const { redirect } = useRedirect();

  const { userId } = useParams<{ userId: string }>();

  const [profile, setProfile] = useState<PublicUser | null>(null);
 

  
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
    
      try {
        const u = await getUserProfile(userId!);
        if (!cancelled) setProfile(u);
      } catch {
        if (!cancelled) setProfile(null);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [userId]);

  const name = profile?.name ?? "Unknown";
  const username = profile?.username ?? "unknown";
  const initial = name?.[0] ?? "U";
  const joined = profile?.createdAt
    ? `Joined ${dayjs(profile.createdAt).format("MMMM YYYY")}`
    : "Joined recently";

  const followers = profile?.followers?.length ?? 0;
  const following = profile?.following?.length ?? 0;
  const postsCount = profile?.postsCount ?? 0;

  

  return (
    <section className="m-6 my-10 md:my-0 bg-white rounded-lg">
      {/* Banner */}
      <div className="relative h-36 bg-gradient-to-tr from-purple-600 via-purple-600 to-indigo-600 rounded-t-lg ">
  {/* Banner / Cover */}
  {profile?.cover_image ? (
    <img
      src={profile.cover_image}
      alt="cover"
      className="w-full h-full object-cover"
    />
  ) : (
    // fallback gradient if no cover
    <div className="w-full h-full bg-gradient-to-tr from-purple-600 via-purple-600 to-indigo-600" />
  )}

  {/* Profile Avatar */}
  <div className="absolute -bottom-16 z-10 left-6 bg-gradient-to-tr from-purple-600 via-purple-600 to-indigo-600 text-2xl font-bold text-white size-28 rounded-full flex justify-center items-center border-white border-4 overflow-hidden">
    {profile?.profile ? (
      <img
        src={profile.profile}
        alt={profile.name}
        className="w-full h-full object-cover rounded-full"
      />
    ) : (
      <span>{initial}</span>
    )}
  </div>
</div>


      {/* Info */}
      <div className="mt-18 p-6">
        <div>
          <p className="font-bold text-2xl">{name}</p>
          <p className="text-purple-600 text-sm font-semibold">@{username}</p>
          <div className="flex my-6 text-gray-500 items-center text-sm">
            <Calendar size={16} className="mr-2" />
            {joined}
          </div>
        </div>
        <hr className="text-purple-100" />
      </div>

      {/* Stats */}
      <ul className="flex w-60 justify-between p-6">
        {[
          { label: "Posts", value: postsCount },
          { label: "Followers", value: followers },
          { label: "Following", value: following },
        ].map((item, idx) => (
          <li key={idx} className="text-center">
            <p className="font-bold text-3xl">{item.value}</p>
            <p className="text-stone-500">{item.label}</p>
          </li>
        ))}
      </ul>

   
        <div className="p-6">
          <button
            className="text-center hover:bg-gray-50 hover:text-black w/full rounded-lg cursor-pointer border border-purple-300 text-purple-600 font-medium p-2"
            onClick={() => redirect("/edit-profile")}
          >
            Edit Profile
          </button>
        </div>
      
    </section>
  );
};

export default ProfileSection;
