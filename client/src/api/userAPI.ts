import axios, { AxiosRequestConfig } from "axios";
import { Header } from "./TokenExport";
const userAPI = `${process.env.REACT_APP_API_URL}/users`;
const AUTH_HEADER = Header();

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
    headers: AUTH_HEADER,
  };
  return axios(config);
}

export function getCurrentUserData(userEmail: string) {
  const URL = `${userAPI}?userEmail=${userEmail}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
    headers: AUTH_HEADER,
  };
  return axios(config);
}

export function getUserFriends(userId: string) {
  const URL = `${userAPI}/followers/${userId}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
    headers: AUTH_HEADER,
  };
  return axios(config);
}

export function getUserFollowing(userId: string) {
  const URL = `${userAPI}/following/${userId}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
    headers: AUTH_HEADER,
  };
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
    headers: AUTH_HEADER,
  };
  return axios(config);
}

export function getFriendSuggestions(userId: string) {
  const URL = `${userAPI}/suggestions/${userId}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
    headers: AUTH_HEADER,
  };
  return axios(config);
}

export function updateUser(data: any, id: String) {
  const URL = `${userAPI}/${id}`;
  const config: AxiosRequestConfig = {
    method: "put",
    url: URL,
    data: data,
    headers: AUTH_HEADER,
  };
  return axios(config);
}
