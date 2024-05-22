import React from "react";
import classes from "./ListExpenses.module.css";

function ListExpenses({ expenses }) {
  const dateHelper = () => {
    const isoString = "2024-05-21T00:00:00.000Z";
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() is zero-based
    const day = String(date.getUTCDate()).padStart(2, "0");
    const dateOnly = `${year}-${month}-${day}`;
    return dateOnly;
  };
  return (
    <div className={classes["main-component"]}>
      <table>
        <tr>
          <th>Category</th>
          <th>Desciption</th>
          <th>Amount</th>
          <th>Date</th>
          <th></th>
          <th></th>
        </tr>
        {expenses.map((expense, key) => (
          <tr>
            <td>{expense.category}</td> <td>{expense.description}</td>{" "}
            <td>{expense.amount}</td> <td>{dateHelper(expense.date)}</td>
            <td className={classes["edit"]}>Edit</td>{" "}
            <td className={classes["delete"]}>Delete</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ListExpenses;
