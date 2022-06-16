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
