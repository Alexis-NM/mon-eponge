import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Tips from "./pages/Tips";
import ShareTip from "./pages/ShareTip";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import EditTip from "./pages/EditTip";

const router = createBrowserRouter([
  {
    element: <App />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
