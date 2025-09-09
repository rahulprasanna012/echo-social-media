
import type {LoginFormTypes, SignupDTO } from "@/types/auth";
import api from "@/utils/api.ts";
import axios from "axios";


import Cookies from "js-cookie";
 


export const signUp = async (data: SignupDTO & { profile?: File }) => {
  try {

    const fd = new FormData();

    // append text fields
    fd.append("name",data.name)
    fd.append("username", data.username);
    fd.append("email", data.email);
    fd.append("password", data.password);
    if (data.bio) fd.append("bio", data.bio);

    // append file (must be actual File object, not blob URL string)
    if (data.profile) {
      fd.append("profile", data.profile); 
    }

    const res = await api.post("/auth/register", fd, {
      headers: { "Content-Type": "multipart/form-data" }, // optional, Axios will set it
    });

    if (res.data.token) {
      Cookies.set("token", res.data.token, { expires: 2 });
    }

    localStorage.setItem("user",JSON.stringify(res.data.user))
    return res.data;
  } catch (err) {

    if(axios.isAxiosError(err)){

      throw err.response?.data.error;

    }
  }
};


export const Login = async (data: LoginFormTypes) => {
  try {

      

    const res = await api.post("/auth/login", data);

    if (res.data.token) {
      Cookies.set("token", res.data.token, { expires: 2 });
    }
    localStorage.setItem("user",JSON.stringify(res.data.user))
    return res.data;
  } catch (err) {

    if(axios.isAxiosError(err)){

      throw err.response?.data.error;

    }
  }
};


export const updateMe = async (formData: FormData) => {
  const { data } = await api.patch(
    "/auth/update",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
};