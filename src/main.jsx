import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FrontPage from "./pages/Frontpage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Classinfo from "./pages/Classinfo.jsx";

const router = createBrowserRouter([
  // Import components that are used in routes
  {
    path: "/",
    element: <App />,
    children: [
      // children are nested routes with a route
      {
        element: <FrontPage />,
        index: true, // index route does not need any path
        // },
        // {
        //   path: "frontpage",
        //   element: <FrontPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "class",
        element: <Classinfo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
