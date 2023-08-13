import axios, { AxiosRequestConfig } from "axios";
import { tokenHeader } from "../utils/tokenHeader";
const act = `${process.env.REACT_APP_API_URL}/activity`;

export function CREATE_NEW_ACTIVITY(activity: Object) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${act}/new`,
    data: activity,
    headers: tokenHeader(),
  };
  //console.log(config;
  return axios(config);
}

export function GET_ACTIVITY(userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${act}?id=${userEmail}`,
    headers: tokenHeader(),
  };
  // //console.log(config;
  return axios(config);
}

export function GET_ACTIVITY_COUNT(userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${act}/notifications?id=${userEmail}`,
    headers: tokenHeader(),
  };
  // //console.log(config;
  return axios(config);
}

export function UPDATE_SEEN(activityId: string, userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "put",
    url: `${act}/update/${activityId}`,
    data: {
      userEmail: userEmail,
    },
    headers: tokenHeader(),
  };
  return axios(config);
}
