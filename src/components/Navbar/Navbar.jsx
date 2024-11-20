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

  const handleLogout = () => {
    logout();
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
            <span className="logo-text">{t("brand")}</span>
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
                {t("home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                {t("about")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/exam"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                {t("exam")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
              >
                {t("contact")}
              </NavLink>
            </li>

            <li className="mobile-login">
              {!userDetails ? (
                <button
                  onClick={handleLoginSignupClick}
                  className="login-button mobile"
                >
                  {t("loginSignup")}
                </button>
              ) : (
                <>
                  <span
                    onClick={handleProfileClick}
                    className="login-button mobile"
                  >
                    {`${t("hi")}, ${userDetails.first_name}`}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="logout-button mobile"
                  >
                    {t("logout")}
                  </button>
                </>
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
              {t("logins")}
            </button>
          ) : (
            <>
              {/* User Greeting Button */}
              <button
                className="profile-badge desktop"
                onClick={handleProfileClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  padding: "10px 15px",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                <span>{`${t("hi")}, ${userDetails.first_name}`}</span>
              </button>

              {/* Logout Button */}
              <button
                className="logout-button desktop"
                onClick={logout}
                style={{
                  backgroundColor: "#8b0000",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  marginLeft: "15px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                {t("logout")}
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
