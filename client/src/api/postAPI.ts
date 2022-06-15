import axios, { AxiosRequestConfig } from "axios";
const postAPI = `${process.env.REACT_APP_API_URL}/post`;

export function GetTimelinePosts() {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${postAPI}/timeline/62a9e37f2eab78bf004a947b`,
  };
  return axios(config);
}
