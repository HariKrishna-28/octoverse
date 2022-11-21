export function tokenHeader(token: string) {
  return {
    Authorization: "Bearer" + token,
  };
}
