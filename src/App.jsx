import React from "react";
import "./index.css";
import { Outlet } from "react-router-dom";
import AppBar from "./AppBar";

function App() {
  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  );
}

export default App;
