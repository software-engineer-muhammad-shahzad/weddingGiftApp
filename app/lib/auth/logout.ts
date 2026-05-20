export function clearAuthAndRedirect() {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");

  window.location.href = "/login";
}