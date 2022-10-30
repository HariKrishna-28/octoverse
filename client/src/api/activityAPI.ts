import axios, { AxiosRequestConfig } from "axios";
import { Header } from "./TokenExport";
const act = `${process.env.REACT_APP_API_URL}/activity`;
const authTokenHeader = Header();

export function createNewActivity(activity: Object) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${act}/new`,
    data: activity,
    headers: authTokenHeader,
  };
  return axios(config);
}

export function getActivity(userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${act}?id=${userEmail}`,
    headers: authTokenHeader,
  };
  return axios(config);
}

export function getActivityCount(userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${act}/notifications?id=${userEmail}`,
    headers: authTokenHeader,
  };
  return axios(config);
}

export function updateSeen(activityId: string, userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "put",
    url: `${act}/update/${activityId}`,
    data: {
      userEmail: userEmail,
    },
    headers: authTokenHeader,
  };
  return axios(config);
}
