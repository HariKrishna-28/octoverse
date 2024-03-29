import Cookies from "js-cookie";

export function tokenHeader() {
  const idToken = Cookies.get("idToken");
  return {
    Authorization: "Bearer" + idToken,
  };
}
