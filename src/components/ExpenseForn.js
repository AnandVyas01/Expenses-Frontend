import React from "react";
import { useSelector } from "react-redux";
import { Form, json, redirect } from "react-router-dom";
import { getToken } from "../utils/authUtil";

function ExpenseForm({ method, expense }) {
  const userDetails = useSelector((state) => state.userDetails);

  const expeseAmount = useSelector((state) => state.getStarted.amount);

  return (
    <div>
      <Form method={method}>
        <input
          style={{ display: "none" }}
          value={userDetails?.user?._id}
          name="userId"
        ></input>
        <p>
          <label>Date</label>
          <input type="date" name="date"></input>
        </p>
        <p>
          <label>Amount</label>
          <input
            type="text"
            name="amount"
            defaultValue={expeseAmount ? expeseAmount : ""}
          ></input>
        </p>
        <p>
          <label>Description</label>
          <input type="text" name="description"></input>
        </p>
        <p>
          <label for="category">Category</label>
          <select name="category" id="category">
            <option selected>Select Category</option>
            <option value="rent">Rent</option>
            <option value="utilities">Utilities</option>
            <option value="groceries">Groceries</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </p>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default ExpenseForm;

export async function action({ request, params }) {
  const token = getToken();
  const method = request.method;
  const data = await request.formData();

  const reqBody = {
    userId: data.get("userId"),
    date: data.get("date"),
    amount: data.get("amount"),
    description: data.get("description"),
    category: data.get("category"),
  };

  let url;
  if (method.toLowerCase() === "post") {
    url = "http://localhost:3000/expense/create";
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(reqBody),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save expense", status: 500 });
  }

  return redirect("/expense");
}
