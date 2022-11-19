import axios, { AxiosRequestConfig } from "axios";
const newsURL = `${process.env.REACT_APP_API_URL}/news`;

export function getNewsData() {
  const config: AxiosRequestConfig = {
    method: "get",
    url: newsURL,
  };
  return axios(config);
}
