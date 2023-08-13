import axios, { AxiosRequestConfig } from "axios";
import {
  userCredentials,
  newUserCredentials,
} from "../components/interfaces/userCredentials";
import { tokenHeader } from "../utils/tokenHeader";
const auth = `${process.env.REACT_APP_API_URL}/auth`;
// const profileAPI = `${process.env.REACT_APP_API_URL}/profile`;

export function LOGIN(authCredentials: userCredentials) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${auth}/login`,
    data: authCredentials,
    headers: tokenHeader(),
  };
  return axios(config);
}

export function createUser(authCredentials: newUserCredentials) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${auth}/register`,
    data: authCredentials,
  };
  return axios(config);
}
