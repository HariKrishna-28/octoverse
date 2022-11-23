import axios, { AxiosRequestConfig } from "axios";
import { tokenHeader } from "../utils/tokenHeader";
const act = `${process.env.REACT_APP_API_URL}/activity`;

export function createNewActivity(activity: Object) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${act}/new`,
    data: activity,
  };
  return axios(config);
}

export function CREATE_NEW_ACTIVITY(activity: Object, token: string) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${act}/new`,
    data: activity,
    headers: tokenHeader(token),
  };
  //console.log(config;
  return axios(config);
}

export function getActivity(userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${act}?id=${userEmail}`,
  };
  return axios(config);
}

export function GET_ACTIVITY(userEmail: string, token: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${act}?id=${userEmail}`,
    headers: tokenHeader(token),
  };
  // //console.log(config;
  return axios(config);
}

export function getActivityCount(userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${act}/notifications?id=${userEmail}`,
  };
  return axios(config);
}

export function GET_ACTIVITY_COUNT(userEmail: string, token: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${act}/notifications?id=${userEmail}`,
    headers: tokenHeader(token),
  };
  // //console.log(config;
  return axios(config);
}

export function updateSeen(activityId: string, userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "put",
    url: `${act}/update/${activityId}`,
    data: {
      userEmail: userEmail,
    },
  };
  return axios(config);
}

export function UPDATE_SEEN(
  activityId: string,
  userEmail: string,
  token: string
) {
  const config: AxiosRequestConfig = {
    method: "put",
    url: `${act}/update/${activityId}`,
    data: {
      userEmail: userEmail,
    },
    headers: tokenHeader(token),
  };
  return axios(config);
}
