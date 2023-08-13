import axios, { AxiosRequestConfig } from "axios";
import { uploadPostProps } from "../components/interfaces/postProps";
import { tokenHeader } from "../utils/tokenHeader";
const postAPI = `${process.env.REACT_APP_API_URL}/post`;
// const profileAPI = `${process.env.REACT_APP_API_URL}/profile`;

export function GET_TIMELINE_POSTS(id: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${postAPI}/timeline/${id}`,
    headers: tokenHeader(),
  };
  return axios(config);
}

export function GET_USER_PROFILE_POSTS(userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${postAPI}/profile/${userEmail}`,
  };
  return axios(config);
}

export function VALIDATE_POST(text: string) {
  const data = {
    message: text,
  };
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/hs/moderate`,
    data: data,
    headers: tokenHeader(),
  };
  return axios(config);
}

export function LIKE_POSTS(postId: string, userId: string) {
  const data = {
    userId: userId,
  };
  const config: AxiosRequestConfig = {
    method: "put",
    url: `${postAPI}/${postId}/like`,
    data: data,
    headers: tokenHeader(),
  };
  //console.log(config;
  return axios(config);
}

export function GET_LIKES(postId: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${postAPI}/likes/${postId}`,
    headers: tokenHeader(),
  };
  return axios(config);
}

export function UPLOAD_POST(post: uploadPostProps) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: postAPI,
    data: post,
    headers: tokenHeader(),
  };
  return axios(config);
}

export function DELETE_POST(postId: string, userId: string) {
  const data = {
    userId: userId,
  };
  const config: AxiosRequestConfig = {
    method: "delete",
    url: `${postAPI}/${postId}`,
    data: data,
    headers: tokenHeader(),
  };
  return axios(config);
}

export function UPDATE_POST(
  postId: string,
  userId: string,
  description: string
) {
  const data = {
    userId: userId,
    description: description,
  };
  const config: AxiosRequestConfig = {
    method: "put",
    url: `${postAPI}/${postId}`,
    data: data,
    headers: tokenHeader(),
  };
  return axios(config);
}

export function GET_A_POST(id: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${postAPI}/${id}`,
    headers: tokenHeader(),
  };
  return axios(config);
}
