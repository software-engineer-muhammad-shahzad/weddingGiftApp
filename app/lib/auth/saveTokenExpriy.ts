export function setAuthToken(token: string, expiresAtUtc: string): void {
  const expiryTime = new Date(expiresAtUtc).getTime();

  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiry", expiryTime.toString());
}