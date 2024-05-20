import React from "react";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

function ExpenseForm({ method, expense }) {
  const userDetails = useSelector((state) => state.userDetails);
  console.log(userDetails);
  return (
    <div>
      <Form>
        <input
          style={{ display: "none" }}
          value={userDetails.user._id}
          name="userId"
        ></input>
        <p>
          <label>Date</label>
          <input type="date" name="date" ></input>
        </p>
        <p>
          <label>Amount</label>
          <input type="text" name="amount"></input>
        </p>
        <p>
          <label>Description</label>
          <input type="text" name="description"></input>
        </p>
        <select>
          <option></option>
          <option></option>
          <option></option>
          <option></option>
          <option></option>
          <option></option>
        </select>
      </Form>
    </div>
  );
}

export default ExpenseForm;
