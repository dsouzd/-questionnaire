import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../assets/Navbar.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { userDetails } = useUser();

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
      duration: 1,
      delay: 0.5,
      y: -50,
      ease: "back.inOut",
    });
    gsap.from(".menu-toggle", {
      opacity: 0,
      duration: 0.7,
      delay: 0.5,
      y: -50,
      ease: "back.inOut",
    });
    gsap.from("select", {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      y: -50,
      ease: "back.inOut",
    });
  });

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginSignupClick = () => {
    navigate("/registration");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
    console.log(selectedLanguage);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="brand">
          <Link to="/" className="logo">
            <img src={logo} className="logo-img" alt="logo" />
            <span className="logo-text">{t("navbar.brand")}</span>
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
                {t("navbar.home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                {t("navbar.about")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/exam"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                {t("navbar.exam")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                {t("navbar.contact")}
              </NavLink>
            </li>
            <li className="mobile-login">
              {!userDetails ? (
                <button
                  onClick={handleLoginSignupClick}
                  className="login-button mobile"
                >
                  {t("navbar.logins")}
                </button>
              ) : (
                <span
                  onClick={handleProfileClick}
                  className="login-button mobile"
                >{`${t("navbar.hi")}, ${userDetails.first_name}`}</span>
              )}
            </li>
          </ul>
        </div>

        <div className="button-group">
          {!userDetails ? (
            <button
              onClick={handleLoginSignupClick}
              className="login-button desktop"
            >
              {t("navbar.logins")}
            </button>
          ) : (
            <span onClick={handleProfileClick} className="login-button desktop">
              {`${t("navbar.hi")}, ${userDetails.first_name}`}
            </span>
          )}
        </div>

        <select onChange={handleLanguageChange} value={i18n.language}>
          <option value="en">En</option>
          <option value="de">De</option>
        </select>

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
