import { useState } from "react";
import "./App.css";
import "./index.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <nav className="navs">
      <Link to={"/"}>HOME</Link>
      <Link to={"/about"}>ABOUT</Link>
      <Link to={"/contact"}>CONTACT</Link>
      <Outlet></Outlet>
    </nav>
  );
}

export default App;
