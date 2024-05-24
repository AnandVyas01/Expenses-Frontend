import React from "react";
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./Login.module.css";
import {  useSelector } from "react-redux";

function Login() {
  //get the data we sent in action
  const data = useActionData();

  //to get status of current route
  const navigation = useNavigation();

  const userEmail = useSelector((state) => state.getStarted.email);

  const isSubmitting = navigation.state === "submitting";

/* eslint-disable no-unused-vars */
const [mode, setmode] = useSearchParams();
/* eslint-enable no-unused-vars */

//to disable linting errors for unused vars

  const isLogin = mode.get("mode") === "login";

  return (
    <div className={classes["main-container"]}>
      <div className={classes["inner-container"]}>
        {data && data.error && <p>{data.error}</p>}
        <Form method="post" className={classes["form-container"]}>
          {!isLogin && (
            <p className={classes["form-container"]}>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required />
            </p>
          )}
          <p className={classes["form-container"]}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              required
              defaultValue={userEmail ? userEmail : ""}
            />
          </p>
          <p className={classes["form-container"]}>
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" required />
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className={classes.buttons}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </Form>
        <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
          <button className={`${classes["toggler-button"]} ${classes.buttons}`}>
            {isLogin ? "Create new user" : "Login Instead"}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
