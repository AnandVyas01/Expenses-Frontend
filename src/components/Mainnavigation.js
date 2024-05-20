import React from "react";
import {
  Form,
  NavLink,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { getUserThunk } from "../Store/store";
import { useDispatch } from "react-redux";
import { getAuthToken, getToken } from "../utils/authUtil";

function Mainnavigation() {
  const userEmail = localStorage.getItem("userEmail");

  const tokenData = useRouteLoaderData("root");

  const token = tokenData && tokenData !== "Expired";

  const dispatch = useDispatch();

  dispatch(getUserThunk(userEmail));

  return (
    <header>
      <nav className={classes["main-list"]}>
        <ul className={classes.link}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <li>Home</li>
          </NavLink>
          {token && (
            <NavLink
              to="/expense"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <li>Manage Expenses</li>
            </NavLink>
          )}
          {!token && (
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <li>Login</li>
            </NavLink>
          )}
          {token && (
            <Form action="/logout" method="post">
              <button type="submit">Logout</button>
            </Form>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Mainnavigation;

export function tokenLoader() {
  //loader function to add protection to routes, if user is not logged in dont allow to perform operations.
  const token = getToken();

  return token;
}
