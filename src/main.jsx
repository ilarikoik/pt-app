import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FrontPage from "./pages/Frontpage.jsx";
import Customer from "./pages/Customer.jsx";
import Training from "./pages/Training.jsx";
import AddTraining from "./components/Addtraining.jsx";
import Calendar from "./components/Calendar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <FrontPage />,
        index: true, // index route does not need any path
        // },
        // {
        //   path: "frontpage",
        //   element: <FrontPage />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "training",
        element: <Training />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
