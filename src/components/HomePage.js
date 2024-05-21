import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken } from "../utils/authUtil";
import classes from "./Homepage.module.css";
import { setAmount, setEmail, setUserData } from "../Store/store";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

function HomePage() {
  const userDetails = useSelector((state) => state.userDetails);

  const navigate = useNavigate();

  const tokenData = useRouteLoaderData("root");
  const token = tokenData && tokenData !== "Expired";

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  useEffect(() => {
    if (!token) {
      dispatch(setUserData(null));
    }
  }, [token]);

  const handleGettingStartedButton = () => {
    const inputValue = inputRef.current.value;
    if (!token) {
      dispatch(setEmail(inputValue));
      return navigate("auth?mode=login");
    } 
    dispatch(setAmount(inputValue));
    return navigate("expense/new");
  };

  return (
    <div>
      <main className={classes["main-component"]}>
        <div>
          <h2 className="headingText">
            <i>
              Hello,{" "}
              {userDetails && userDetails?.user
                ? userDetails?.user?.name
                : "User"}
              .
            </i>
          </h2>
          <h1 className="headingText">
            <i>
              Empower Your Financial Freedom: Simplify Expenses, Amplify Life!
            </i>
          </h1>
        </div>
        <div>
          <div className={classes["getting-started"]}>
            <label htmlFor="homepageEmail" className="headingText">
              {token ? "Create a new expense" : "Authenticate"}
            </label>
            <input
              ref={inputRef}
              type="text"
              name="homepageEmail"
              placeholder={token ? "Expense amount" : "Enter your email"}
            />
            <button
              type="button"
              className="button"
              onClick={() => handleGettingStartedButton()}
            >
              {token ? "Go" : "Get started"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
