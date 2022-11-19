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

export function likePosts(postId: string, userId: string) {
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

export function getLikes(postId: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${postAPI}/likes/${postId}`,
  };
  return axios(config);
}

export function uploadPost(post: uploadPostProps) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: postAPI,
    data: post,
  };
  return axios(config);
}

export function deletePost(postId: string, userId: string) {
  const data = {
    userId: userId,
  };
  const config: AxiosRequestConfig = {
    method: "delete",
    url: `${postAPI}/${postId}`,
    data: data,
  };
  return axios(config);
}

export function updatePost(
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
  };
  return axios(config);
}

export function getaPost(id: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${postAPI}/${id}`,
  };
  return axios(config);
}
