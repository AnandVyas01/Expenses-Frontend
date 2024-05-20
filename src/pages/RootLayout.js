import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import HomePage from "../components/HomePage";
import Mainnavigation from "../components/Mainnavigation";
import { getExpirationTime } from "../utils/authUtil";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "Expired") {
      submit(null, { action: "/logout", method: "post" });
    }

    const autoLogoutDuration = getExpirationTime();
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, autoLogoutDuration);
  }, [token, submit]);

  
  return (
    <div>
      <Mainnavigation />
      <main>
        <Outlet />
        {/* renders child route elements */}
      </main>
    </div>
  );
}

export default RootLayout;
