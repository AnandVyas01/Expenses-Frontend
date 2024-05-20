import React from "react";
import { redirect, json } from "react-router-dom";
import Login from "../components/Login";
import { IP } from "../utils/baseURL";

function AuthenticationPage() {
  return <Login />;
}

export default AuthenticationPage;

//action for submission of form for Login router.
export async function action({ request }) {
  // to get the query params
  const searchParams = new URL(request.url).searchParams;

  //   to get mode form params
  const mode = searchParams.get("mode") || "login";

  //get the form data
  const data = await request.formData();

  const requestBody = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };

  //send request
  const response = await fetch(`${IP}user/${mode}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  //if user is created then redirect to login
  if (response.status === 201) {
    return redirect("/auth?mode=login");
  }

  //if validation errors then show to user
  if (response.status === 400 || response.status === 403) {
    return response;
  }

  //if any other error then send to errors page
  if (!response.ok) {
    throw json({ message: "Cannot authenticate user" }, { status: 500 });
  }

  //geting res from res
  const resData = await response.json();

  //if form is submitted as login mode
  if (mode === "login") {
    //get token and set in local
    const { token, email } = resData.data;
    localStorage.setItem("expensesToken", token);
    localStorage.setItem("userEmail", email);

    //set expiration period (1 hr from login time) and set in local
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);
    localStorage.setItem("expensesTokenExpiration", expirationDate);

    //redirect
    return redirect("/");
  }

  //for any corner case
  return null;
}
