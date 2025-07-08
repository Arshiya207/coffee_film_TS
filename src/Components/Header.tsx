//asset imports
import logo from "../assets/logo.png";
// react and package imports
import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { BsGridFill as Dashboard } from "react-icons/bs";
import { BsPersonCircle as Login } from "react-icons/bs";
// type imports
import { type JSX } from "react";

export default function Header(): JSX.Element {
  return (
    <header className="main-header">
      <div className="main-header_navigation">
        <NavLink to=".">
          <div className="navigation__logo">
            <img src={logo} alt="logo" className="logo__logo" />
            <span className="logo__text">
              <span className="text-coffee">Coffee</span>
              <span className="text-cream">Film</span>
            </span>
          </div>
        </NavLink>
        <nav className="navigation__nav">
          <ul className="nav__list">
            <li className="nav-list__item ">
              <NavLink className="text-icon link-hover" to="search">
                <BsSearch />
                Search
              </NavLink>
            </li>
            <li className="nav-list__item ">
              <NavLink className="text-icon link-hover" to="dashboard">
                <Dashboard />
                MyDashboard
              </NavLink>
            </li>
            <li className="nav-list__item ml-auto">
              <NavLink className="text-icon link-hover" to="login">
                <Login />
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
