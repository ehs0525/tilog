import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { login, logout } from "../store/authSlice";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const onClickLogInOrOut = useCallback(() => {
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      dispatch(login());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <ul className="navbar-nav" style={{ flexDirection: "row" }}>
          <li className="nav-item me-2">
            <button
              className="text-white btn btn-link text-decoration-none"
              onClick={onClickLogInOrOut}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
          <li className="nav-item me-2">
            <NavLink
              activeClassName="active"
              className="nav-link"
              aria-current="page"
              to="/admin"
            >
              Admin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              aria-current="page"
              to="/blogs"
            >
              Blogs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
