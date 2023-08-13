import axios, { AxiosRequestConfig } from "axios";
import { tokenHeader } from "../utils/tokenHeader";
const searchAPI = `${process.env.REACT_APP_API_URL}/search`;

export function GET_SEARCH_TERMS(searchTerm: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${searchAPI}/?q=${searchTerm}`,
    headers: tokenHeader(),
  };
  return axios(config);
}
