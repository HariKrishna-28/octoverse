import axios, { AxiosRequestConfig } from "axios";
const searchAPI = `${process.env.REACT_APP_API_URL}/search`;

export function getSearchTerms(searchTerm: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${searchAPI}/?q=${searchTerm}`,
  };
  return axios(config);
}
