import axios, { AxiosRequestConfig } from "axios";
import { tokenHeader } from "../utils/tokenHeader";
const userAPI = `${process.env.REACT_APP_API_URL}/users`;

export function getUser(
  userId: string | undefined,
  userName: string | undefined
) {
  const URL = userId
    ? `${userAPI}?userId=${userId}`
    : `${userAPI}?userName=${userName}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
  };
  return axios(config);
}

export function GET_USER(
  userId: string | undefined,
  userName: string | undefined,
  token: string
) {
  const URL = userId
    ? `${userAPI}?userId=${userId}`
    : `${userAPI}?userName=${userName}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
    headers: tokenHeader(token),
  };
  //console.log(config;
  return axios(config);
}

export function getCurrentUserData(userEmail: string) {
  const URL = `${userAPI}?userEmail=${userEmail}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
  };
  return axios(config);
}

export function GET_CURRENT_USER_DATA(userEmail: string, token: string) {
  const URL = `${userAPI}?userEmail=${userEmail}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
    headers: tokenHeader(token),
  };
  return axios(config);
}

export function getUserFriends(userId: string) {
  const URL = `${userAPI}/followers/${userId}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
  };
  return axios(config);
}

export function GET_USER_FRIENDS(userId: string, token: string) {
  const URL = `${userAPI}/followers/${userId}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
    headers: tokenHeader(token),
  };
  //console.log(config;
  return axios(config);
}

export function getUserFollowing(userId: string) {
  const URL = `${userAPI}/following/${userId}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
  };
  return axios(config);
}

export function GET_USER_FOLLOWING(userId: string, token: string) {
  const URL = `${userAPI}/following/${userId}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
    headers: tokenHeader(token),
  };
  //console.log(config;
  return axios(config);
}

export function followOrUnfollowUser(
  userId: string,
  flag: boolean,
  currentId: string
) {
  const URL = `${userAPI}/${userId}/${flag ? "unfollow" : "follow"}`;
  const config: AxiosRequestConfig = {
    method: "put",
    url: URL,
    data: {
      userId: currentId,
    },
  };
  return axios(config);
}

export function FOLLOW_OR_UNFOLLOW_USER(
  userId: string,
  flag: boolean,
  currentId: string,
  token: string
) {
  const URL = `${userAPI}/${userId}/${flag ? "unfollow" : "follow"}`;
  const config: AxiosRequestConfig = {
    method: "put",
    url: URL,
    data: {
      userId: currentId,
    },
    headers: tokenHeader(token),
  };
  //console.log(config;
  return axios(config);
}

export function getFriendSuggestions(userId: string) {
  const URL = `${userAPI}/suggestions/${userId}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
  };
  return axios(config);
}

export function GET_FRIEND_SUGGESTIONS(userId: string, token: string) {
  const URL = `${userAPI}/suggestions/${userId}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
    headers: tokenHeader(token),
  };
  return axios(config);
}

export function updateUser(data: any, id: String) {
  const URL = `${userAPI}/${id}`;
  const config: AxiosRequestConfig = {
    method: "put",
    url: URL,
    data: data,
  };
  return axios(config);
}

export function UPDATE_USER(data: any, id: String, token: string) {
  const URL = `${userAPI}/${id}`;
  const config: AxiosRequestConfig = {
    method: "put",
    url: URL,
    data: data,
    headers: tokenHeader(token),
  };
  return axios(config);
}
