import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("expensesTokenExpiration");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("expensesToken");
  return redirect("/");
}
