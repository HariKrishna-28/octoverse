import axios, { AxiosRequestConfig } from "axios";
import { uploadPostProps } from "../components/interfaces/postProps";
const postAPI = `${process.env.REACT_APP_API_URL}/post`;
// const profileAPI = `${process.env.REACT_APP_API_URL}/profile`;

export function getTimelinePosts(id: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${postAPI}/timeline/${id}`,
  };
  return axios(config);
}

export function getUserProfilePosts(userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${postAPI}/profile/${userEmail}`,
  };
  return axios(config);
}

export function likePosts(postId: number, userId: string) {
  const data = {
    userId: userId,
  };
  const config: AxiosRequestConfig = {
    method: "put",
    url: `${postAPI}/${postId}/like`,
    data: data,
  };
  return axios(config);
}

export function uploadPost(post: uploadPostProps) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: postAPI,
    data: post,
  };
  console.log(config);
  return axios(config);
}
