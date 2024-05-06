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
import Chart from "./components/Chart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <FrontPage />,
        index: true,
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
      {
        path: "chart",
        element: <Chart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
