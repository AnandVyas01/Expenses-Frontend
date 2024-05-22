import { json, redirect } from "react-router-dom";
import { getToken } from "../utils/authUtil";

export async function deleteLoader({ request }) {
  const data = await request.formData();
  const id = data.get("id");
  const token = getToken();
  const method = request.method;

  const response = await fetch("http://localhost:3000/expense/delete/" + id, {
    method: method,
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    throw json({ message: "Cannot delete expense" }, { status: 500 });
  }

  return redirect("/expense");
}
