import axios, { AxiosRequestConfig } from "axios";
const userAPI = `${process.env.REACT_APP_API_URL}/users`;

export function GetUser(userId: number) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${userAPI}/users/${userId}`,
  };
  return axios(config);
}
