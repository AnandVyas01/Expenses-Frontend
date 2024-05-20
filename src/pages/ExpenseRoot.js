import React from "react";
import ExpenseNavigation from "../components/ExpenseNavigation";
import { Outlet } from "react-router-dom";

function ExpenseRoot() {
  return (
    <div>
      <ExpenseNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default ExpenseRoot;
