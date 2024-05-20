import { redirect } from "react-router-dom";

export function getExpirationTime() {
  const expirationTimeString = localStorage.getItem("expensesTokenExpiration");
  const now = new Date();
  const expirationTime = new Date(expirationTimeString);

  const duration = expirationTime.getTime() - now.getTime();
  return duration;
}

function getAuthToken() {
  const duration = getExpirationTime();
  if (duration < 0) {
    return "Expired";
  }
  return localStorage.getItem("expensesToken");
}

export function getToken() {
  return getAuthToken();
}

export function checkAuth() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}
