import axios, { AxiosRequestConfig } from "axios";
import { Header } from "./TokenExport";
const searchAPI = `${process.env.REACT_APP_API_URL}/search`;

const AUTH_HEADER = Header();

export function getSearchTerms(searchTerm: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${searchAPI}/?q=${searchTerm}`,
    headers: AUTH_HEADER,
  };
  return axios(config);
}
