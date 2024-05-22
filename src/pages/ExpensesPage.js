import React, { Suspense } from "react";
import ListExpenses from "../components/ListExpenses";
import {
  Await,
  defer,
  json,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./ExpensePage.module.css";
import { getToken } from "../utils/authUtil";

function ExpensesPage() {
  const { userId } = useParams();

  const amountByCategory = useSelector(
    (state) => state?.userDetails?.user?.amount
  );

  const data = useRouteLoaderData("list");

  const expenses = data?.expenses;

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
      <Suspense
        fallbackfallback={<p style={{ textAlign: "center" }}>Loading...</p>}
      >
        <Await resolve={expenses}>
          {(loadedExpenses) => <ListExpenses expenses={loadedExpenses} />}
        </Await>
      </Suspense>
    </div>
  );
}

export default ExpensesPage;

async function loadExpenses(userId) {
  const token = getToken();
  const response = await fetch(`http://localhost:3000/expense/list/${userId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Cannot fetch expenses, try again later" },
      { status: 500 }
    );
  }

  const resData = await response.json();
  return resData.data;
}

export function loader({ request, params }) {
  const userId = params.userId;

  return defer({
    expenses: loadExpenses(userId),
  });
}
