import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";

import { AuthContextProvider } from "./context/AuthContext";

import Admin from "./pages/Admin";
import EditTip from "./pages/EditTip";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShareTip from "./pages/ShareTip";
import Tips from "./pages/Tips";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/astuces",
        element: <Tips />,
      },
      {
        path: "/proposer-une-astuce",
        element: <ShareTip />,
      },
      {
        path: "/inscription",
        element: <Register />,
      },
      {
        path: "/connexion",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/editer-astuce",
        element: <EditTip />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
