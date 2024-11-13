import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import "../../assets/Navbar.css";

const Navbar = () => {
  const email = sessionStorage.getItem("email");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginSignupClick = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    setShowLogoutModal(false); // Redirect to login page after logout
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Show the logout confirmation modal
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false); // Close the modal without logging out
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="brand">
          <Link to="/" className="logo">
            <img src={logo} className="logo-img" alt="Logo" />
            <span className="logo-text">{t("navbar.brand")}</span>
          </Link>
        </div>

        {/* Mobile Menu Links */}
        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`} id="navbar-sticky">
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                {t("navbar.home")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                {t("navbar.about")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/exam" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                {t("navbar.takeExam")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                {t("navbar.contact")}
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                {t("navbar.profile")}
              </NavLink>
            </li>

            {/* Show Login/Signup or Email & Logout based on login status in Mobile view */}
            {email ? (
              <li className="mobile-login">
                <span className="user-email">{email}</span>
                <button onClick={handleLogoutClick} className="login-button">
                  {t("navbar.logout")}
                </button>
              </li>
            ) : (
              <li className="mobile-login">
                <button onClick={handleLoginSignupClick} className="login-button mobile">
                  {t("navbar.loginSignup")}
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Desktop Email and Logout Button */}
        <div className="button-group">
          {email ? (
            <>
              <span className="user-email">{email}</span>
              <button onClick={handleLogoutClick} className="login-button desktop">
                {t("navbar.logout")}
              </button>
            </>
          ) : (
            <button onClick={handleLoginSignupClick} className="login-button desktop">
              {t("navbar.loginSignup")}
            </button>
          )}
        </div>

        {/* Menu toggle button for mobile */}
        <button onClick={toggleMenu} className="menu-toggle" aria-label="Toggle menu">
          {isMobileMenuOpen ? <FaTimes className="menu-icon close-icon" /> : <FaBars className="menu-icon hamburger-icon" />}
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("navbar.logoutConfirmTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("navbar.logoutConfirmMessage")}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t("navbar.logoutCancel")}
          </Button>
          <Button variant="danger" style={{ backgroundColor: "#8b0000" }} onClick={handleLogout}>
            {t("navbar.logoutConfirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
