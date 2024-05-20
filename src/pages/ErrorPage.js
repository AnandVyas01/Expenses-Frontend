import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  let message = "Something went wrong!";
  let title = "An Error Occured!";

  if (error.status === 500) {
    message = error.data.message;
  }

  return (
    <div>
      <h1 className="headingText">
        <i>{title}</i>
      </h1>
      <h4 className="headingText">
        <i>{message}</i>
      </h4>
    </div>
  );
}

export default ErrorPage;
