import api from "@/utils/api.ts";

export const getSideBarUsers=async()=>{

    try {
        const res= await api.get("/messages/users");
        return res.data
    } catch (error) {
        console.log(error);
    }
}



export const getMessage=async(userId:string)=>{

    try {
        const res= await api.get(`/messages/${userId}`);
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export async function sendMessage(
  userId: string,
  payload: { text?: string; media?: File | null }
){
  try {
    const fd = new FormData();
    if (payload.text) fd.append("text", payload.text);
    if (payload.media) fd.append("media", payload.media);

    const res = await api.post(`/messages/send/${userId}`, fd);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const seenMessage =async(id:string)=>{
     try {
        const res= await api.get(`/messages/mark/${id}`);
        return res.data
    } catch (error) {
        console.log(error);
    }
}