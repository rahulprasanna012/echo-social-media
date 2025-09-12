import api from "@/utils/api.ts";
import axios from "axios";


export const createPost=async (data:any)=>{

    try{
        

        const res= await api.post("posts",data,{
      headers: { "Content-Type": "multipart/form-data" }, 
    })

        return res.data
        

    }
    catch(err){
        

    if(axios.isAxiosError(err)){

      throw err.response?.data.error;

    }
  
    }


}


export async function getAllPost(query?: { limit?: number; cursor?: string | null }) {
  const res = await api.get("/posts", {
    params: {
      limit: query?.limit ?? 5,
      cursor: query?.cursor ?? null,
    },
  });
  return res.data;
}

export const getUserPosts = async (userId: string, q?: { limit?: number; cursor?: string | null }) => {
  const { data } = await api.get(`/posts/user/${userId}`, {
    params: { limit: q?.limit ?? 5, cursor: q?.cursor ?? null },
  });
  return data;
};

export const toggleLike = async (postId: string) => {
  const { data } = await api.post<{ ok: boolean; likesCount: number; liked: boolean }>(
    `/posts/${postId}/like`
  );
  return data;
};

export const addComment = async (postId: string, text: string) => {
  const { data } = await api.post(`/posts/${postId}/comments`, { text });
  return data;
};

export const getComments = async (postId: string) => {
  const { data } = await api.get(`/posts/${postId}/comments`);
  return data;
};

export const incrementShare = async (postId: string) => {
  const { data } = await api.post(
    `/posts/${postId}/share`
  );
  return data;
};