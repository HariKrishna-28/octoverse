import axios, { AxiosRequestConfig } from "axios";
import { tokenHeader } from "../utils/tokenHeader";
const newsURL = `${process.env.REACT_APP_API_URL}/news`;

export function getNewsData() {
  const config: AxiosRequestConfig = {
    method: "get",
    url: newsURL,
  };
  return axios(config);
}

export function GET_NEWS_DATA(token: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: newsURL,
    headers: tokenHeader(token),
  };
  return axios(config);
}
