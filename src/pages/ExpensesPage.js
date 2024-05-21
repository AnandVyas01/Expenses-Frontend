import React from "react";
import ListExpenses from "../components/ListExpenses";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./ExpensePage.module.css"

function ExpensesPage() {
  const { userId } = useParams();

  const amountByCategory = useSelector(
    (state) => state.userDetails.user.amount
  );

  if (!userId) {
    return (
      <div className={classes["main-component"]}>
        <div>
          <h2 className="headingText">
            You have spent total{" "}
            <i>
              {amountByCategory.reduce(
                (acc, curr) => acc + curr.totalAmount,
                0
              )}{" "}
              Rs
            </i>
          </h2>
          <ol>
            {amountByCategory.map((category, key) => (
              <li
                key={key}
                className="headingText"
              >{`${category._id} : ${category.totalAmount} Rs`}</li>
            ))}
          </ol>
          <h5 className="headingText">
            Navigate through the buttons above to view or add expenses.
          </h5>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ListExpenses />
    </div>
  );
}

export default ExpensesPage;
