import axios, { AxiosRequestConfig } from "axios";
import { tokenHeader } from "../utils/tokenHeader";
const newsURL = `${process.env.REACT_APP_API_URL}/news`;

export function GET_NEWS_DATA() {
  const config: AxiosRequestConfig = {
    method: "get",
    url: newsURL,
    headers: tokenHeader(),
  };
  return axios(config);
}
