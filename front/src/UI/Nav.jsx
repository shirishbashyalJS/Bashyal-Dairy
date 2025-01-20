import React from "react";
import { Link, NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav
      className="navbar bg-body-tertiary"
      style={{
        backgroundColor: "orange",
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
      }}
    >
      <div className="container-fluid container">
        <Link className="navbar-brand" to="/">
          <h1 className="text-light ps-5">Bashyal Dairy</h1>
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link active" aria-current="page" to="/cart">
            <h2 className="text-light pe-5">Cart</h2>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
