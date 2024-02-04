import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Home from "./pages/Home";
import Tips from "./pages/Tips";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Tips />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
