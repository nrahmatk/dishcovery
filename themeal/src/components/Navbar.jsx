// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access_token"));
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login')
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={"/"}>Dishcovery</Link>
      </div>
      <div
        className={`navbar-toggle ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
        <li className="navbar-item">
          <Link to={"/"}>Home</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="navbar-item">
              <Link to={"/recipes"}>Recipes</Link>
            </li>
            <li className="navbar-item">
              <Link to={"/favoritelist"}>Favorite</Link>
            </li>
            <li className="navbar-item">
              <Link to={"/chat-with-ai"}>Recipe with AI</Link>
            </li>
            <li className="navbar-item" onClick={handleLogout}>
              <Link to={"/login"}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link to={"/register"}>Register</Link>
            </li>
            <li className="navbar-item">
              <Link to={"/login"}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
