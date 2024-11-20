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
  const { userDetails, logout } = useUser();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginSignupClick = () => {
    navigate("/registration");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
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
          <ul className="nav-ul">
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
                to="/instructions"
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
                <div className="logged-in-buttons">
                  <span
                    onClick={handleProfileClick}
                    className="login-button mobile"
                  >
                    {`${t("navbar.hi")}, ${userDetails.first_name}`}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="logout-button mobile"
                  >
                    {t("navbar.logout")}
                  </button>
                </div>
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
            <>
              <button
                className="profile-badge desktop"
                onClick={handleProfileClick}
              >
                <span>{`${t("navbar.hi")}, ${userDetails.first_name}`}</span>
              </button>
              <button className="logout-button desktop" onClick={handleLogout}>
                {t("navbar.logout")}
              </button>
            </>
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
