export function isTokenExpired() {
  const expiry = localStorage.getItem("tokenExpiry");

  if (!expiry) return true;

  return Date.now() > Number(expiry);
}