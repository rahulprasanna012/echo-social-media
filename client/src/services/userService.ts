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

export const getUserProfile = async (userId: string) => {
 
  const { data } = await api.get(`/users/${userId}/profile`);
  return data.user;
};