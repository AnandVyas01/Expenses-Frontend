import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Expensenavigation.module.css";
import { useSelector } from "react-redux";

function ExpenseNavigation() {
  const userDetails = useSelector((state) => state.userDetails.user);
  return (
    <header>
      <nav className={classes.link}>
        <NavLink
          to={`list/${userDetails?._id}`}
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          <button className={classes.button}>My Expenses</button>
        </NavLink>
        <NavLink
          to="new"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          <button className={classes.button}>New Expense</button>
        </NavLink>
      </nav>
    </header>
  );
}

export default ExpenseNavigation;
