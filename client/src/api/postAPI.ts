import axios, { AxiosRequestConfig } from "axios";
const postAPI = `${process.env.REACT_APP_API_URL}/post`;
// const profileAPI = `${process.env.REACT_APP_API_URL}/profile`;

export function getTimelinePosts() {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${postAPI}/timeline/62a9e37f2eab78bf004a947b`,
  };
  return axios(config);
}

export function getUserProfilePosts(userName: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${postAPI}/profile/${userName}`,
  };
  return axios(config);
}
