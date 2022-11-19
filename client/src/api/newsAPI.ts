import axios, { AxiosRequestConfig } from "axios";
import { Header, HeaderGenerator } from "./TokenExport";
const newsURL = `${process.env.REACT_APP_API_URL}/news`;

const AUTH_HEADER = Header();

export function getNewsData() {
  const config: AxiosRequestConfig = {
    method: "get",
    url: newsURL,
    headers: AUTH_HEADER,
  };
  return axios(config);
}

export function GET_NEWS_DATA(token: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: newsURL,
    headers: HeaderGenerator(token),
  };
  return axios(config);
}
