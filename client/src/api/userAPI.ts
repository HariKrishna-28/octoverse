import axios, { AxiosRequestConfig } from "axios";
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

export function getCurrentUserData(userEmail: string) {
  const URL = `${userAPI}?userEmail=${userEmail}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
  };
  return axios(config);
}

export function getUserFriends(userId: string) {
  const URL = `${userAPI}/friends/${userId}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: URL,
  };
  return axios(config);
}

export function followOrUnfollowUser(
  userId: string,
  flag: boolean,
  currentId: string
) {
  const URL = `${userAPI}/${userId}/${flag ? "follow" : "unfollow"}`;
  const config: AxiosRequestConfig = {
    method: "put",
    url: URL,
    data: {
      userId: currentId,
    },
  };
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

export function updateUser(data: any, id: String) {
  const URL = `${userAPI}/${id}`;
  const config: AxiosRequestConfig = {
    method: "put",
    url: URL,
    data: data,
  };
  return axios(config);
}
