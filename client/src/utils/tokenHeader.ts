import Cookies from "js-cookie";

export function tokenHeader(token: string) {
  const idToken = Cookies.get("idToken");
  return {
    Authorization: "Bearer" + idToken,
  };
}
