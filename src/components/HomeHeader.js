import React from "react";
import {
  HashRouter,
  Link,
} from 'react-router-dom';

const HomeHeader = () => {
  return (
    <div className="header" style={{height: 400}}>
      <HashRouter>
        <nav className="nav_container">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </HashRouter>
      <nav className="nav_container">
        <ul>
          <li>
            <a href="#">Start</a>
          </li>
          <li>
            <a href="#">O co chodzi?</a>
          </li>
          <li>
            <a href="#">O nas</a>
          </li>
          <li>
            <a href="#">Fundacja i organizacje</a>
          </li>
          <li>
            <a href="#">Kontakt</a>
          </li>
        </ul>
      </nav>
      <h1>Home header</h1>
    </div>
  );
}

export default HomeHeader;
