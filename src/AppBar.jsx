import React from "react";
import { Link } from "react-router-dom";

function AppBar() {
  return (
    <div className="navs">
      <nav>
        <Link to={"/"}>HOME</Link>
        <Link to={"/customer"}>CUSTOMER</Link>
        <Link to={"/training"}>TRAINING</Link>
      </nav>
    </div>
  );
}

export default AppBar;
