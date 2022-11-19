import axios, { AxiosRequestConfig } from "axios";
const act = `${process.env.REACT_APP_API_URL}/activity`;

export function createNewActivity(activity: Object) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${act}/new`,
    data: activity,
  };
  return axios(config);
}

export function getActivity(userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${act}?id=${userEmail}`,
  };
  return axios(config);
}

export function getActivityCount(userEmail: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${act}/notifications?id=${userEmail}`,
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
  };
  return axios(config);
}
