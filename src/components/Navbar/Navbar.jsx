import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../assets/Navbar.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";



const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.from(".logo", {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      y: -50,
    });

    gsap.from(".nav-links li", {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      y: -50,
      stagger: 0.2,
      ease: "back.inOut",
    });
    gsap.from(".login-button", {
      opacity: 0,
      duration: 0.7,
      delay: 0.5,
      y: -50,
    });
    gsap.from(".menu-toggle", {
      opacity: 0,
      duration: 0.7,
      delay: 0.5,
      y: -50,
    });
  });



  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginSignupClick = () => {
    navigate("/register");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="brand">
          <Link to="/" className="logo">
            <img src={logo} className="logo-img" alt="Logo" />
            <span className="logo-text">QUESTIONNAIRE</span>
          </Link>
        </div>

        <div
          className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}
          id="navbar-sticky"
        >
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/exam"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                Take Exam
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                Contact
              </NavLink>
            </li>
            <li className="mobile-login">
              <button
                onClick={handleLoginSignupClick}
                className="login-button mobile"
              >
                Login/Signup
              </button>
            </li>
          </ul>
        </div>

        <div className="button-group">
          <button
            onClick={handleLoginSignupClick}
            className="login-button desktop"
          >
            Login/Signup
          </button>
        </div>

        <button onClick={toggleMenu} className="menu-toggle">
          {isMobileMenuOpen ? (
            <FaTimes className="menu-icon close-icon" />
          ) : (
            <FaBars className="menu-icon hamburger-icon" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
