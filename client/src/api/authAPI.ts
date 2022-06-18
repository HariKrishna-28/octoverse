import axios, { AxiosRequestConfig } from "axios";
import { userCredentials } from "../components/interfaces/userCredentials";
const auth = `${process.env.REACT_APP_API_URL}/auth`;
// const profileAPI = `${process.env.REACT_APP_API_URL}/profile`;

// export function login(email: string, password: string) {
export function login(authCredentials: userCredentials) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${auth}/login`,
    data: authCredentials,
  };
  console.log(config);
  return axios(config);
}
