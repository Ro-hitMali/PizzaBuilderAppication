import React from "react";
import { Link } from "react-router-dom";
import pizzaLogo from "./assets/pizza logo.jpg";
import "./Header.css";
const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={pizzaLogo} alt="Pizza Builder Logo" />
        <h1>Pizza Builder Application</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Cart">Cart</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
