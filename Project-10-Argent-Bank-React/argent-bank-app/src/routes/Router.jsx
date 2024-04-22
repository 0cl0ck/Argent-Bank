import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import Layout from "../layout/Layout.jsx";
import SignIn from "../pages/SignIn.jsx";
import Dashboard from "../pages/Dashboard.jsx";

const BrowserRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/sign-in",
        index: true,
        element: <SignIn />,
      },
      {
        path: "/dashboard",
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={BrowserRouter} />;
}
