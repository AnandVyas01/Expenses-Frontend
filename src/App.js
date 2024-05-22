import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./components/HomePage";
import AuthenticationPage, {
  action as authAction,
} from "./pages/AuthenticationPage";
import ErrorPage from "./pages/ErrorPage";

import { action as logoutAction } from "./pages/Logout";
import { tokenLoader } from "./components/Mainnavigation";
import ExpenseRoot from "./pages/ExpenseRoot";
import ExpensesPage, { loader as expensesLoader } from "./pages/ExpensesPage";
import NewExpense from "./pages/NewExpense";
import { action as newExpenseAction } from "./components/ExpenseForn";
import { checkAuth } from "./utils/authUtil";
import { deleteLoader } from "./pages/EventDeletePage";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      id: "root",
      element: <RootLayout />,
      loader: tokenLoader,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "auth",
          element: <AuthenticationPage />,
          action: authAction,
        },
        { path: "logout", action: logoutAction },
        {
          path: "expense",
          id: "expense",
          element: <ExpenseRoot />,
          children: [
            { index: true, element: <ExpensesPage /> },
            {
              path: "list/:userId",
              id: "list",
              element: <ExpensesPage />,
              loader: expensesLoader,
            },
            {
              path: "delete",
              id: "delete",
              action: deleteLoader,
            },
            {
              path: "new",
              element: <NewExpense />,
              action: newExpenseAction,
              loader: checkAuth,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
