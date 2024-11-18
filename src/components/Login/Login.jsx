import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import "../../assets/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import { useUser } from "../context/UserContext";
import { validateForm } from "../../validations/formValidations";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const { t } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const { setEmail, setUserDetails } = useUser();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setError("");
    const errors = validateForm(formData, "login");
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setIsLoading(true);

    try {

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredentials.user;
      setEmail(formData.email);

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserDetails(userData);
        localStorage.setItem("userDetails", JSON.stringify(userData));
      }
      setIsLoading(false);

      // Display success notification
      toast.success("Account successfully logged in!", {
        position: "top-center",
        autoClose: 2000,
      });

      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.detail ||
          "An unexpected error occurred. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex a justify-content-center mt-5">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-left mb-1">
          <img
            src={logo}
            alt="Logo"
            className="mb-2"
            style={{ width: "10%" }}
          />
          <span className="log-logo">{t("brand")}</span>
          <h4>{t("login_title")}</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="email">{t("email_label")}</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control mt-2"
              placeholder={t("email_placeholder")}
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            {isLoading && (
              <FaTimes
                className="position-absolute"
                style={{
                  top: "70%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#dc3545",
                }}
              />
            )}
            {validationErrors.email && (
              <p className="text-danger mt-1">{validationErrors.email}</p>
            )}
          </div>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="password">{t("password_label")}</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="form-control mt-1"
                placeholder={t("password_placeholder")}
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn btn-outline-secondary mt-1"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </button>
              {isLoading && (
                <FaTimes
                  className="position-absolute"
                  style={{
                    top: "60%",
                    right: "44px",
                    transform: "translateY(-50%)",
                    color: "#dc3545",
                  }}
                />
              )}
            </div>
            {validationErrors.password && (
              <p className="text-danger mt-1">{validationErrors.password}</p>
            )}
          </div>

          {error && <p className="text-danger text-center mt-2">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="custom-login-btn w-100 mt-3"
            style={{ backgroundColor: "#8B0000", color: "#fff" }}
          >
            {isLoading ? t("logging_in") : t("login")}
          </button>

          <div className="text-center mt-3">
            <p>
              {t("login_desc")}{" "}
              <Link
                to="/registration"
                className="register-link text-decoration-none"
              >
                {t("register")}
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
