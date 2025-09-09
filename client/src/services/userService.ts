// services/userService.ts
import api from "@/utils/api";

// services/userService.ts
export async function getMe() {
  const res = await api.get("/users/me");
  return res.data;
}


export const followUser = async (userId: string) => {
  return api.post(`/users/${userId}/follow`);
};

export const unfollowUser = async (userId: string) => {
  return api.post(`/users/${userId}/unfollow`);
};
