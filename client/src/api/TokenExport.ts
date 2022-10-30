import Cookies from "js-cookie";

export function AuthTokenExporter() {
  return Cookies.get("Auth");
}

export function Header() {
  const token = AuthTokenExporter();
  return {
    Authorization: "Bearer" + token,
  };
}
