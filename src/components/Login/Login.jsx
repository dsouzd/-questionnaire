import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../assets/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../../firebase";
import { doc, getDoc, query, where } from "firebase/firestore";
import { useUser } from "../context/UserContext";
import logo from "../../assets/logo.png";
import bcrypt from "bcryptjs";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const { setEmail, setUserDetails } = useUser();
  const { t } = useTranslation();
  const [error, setError] = useState();
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Enter a valid email.";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      // Fetch user data from Firestore
      const userRef = doc(db, "users");
      const query = query(userRef, where("email", "==", formData.email));
      const userDoc = await getDoc(userRef);
      console.log(userDoc)

      if (!userDoc.exists()) {
        toast.error("No account found with this email.");
        setIsLoading(false);
        return;
      }

      const usersss = userDoc.docs[0];
      const userData = usersss.data;

      // Check if the user registered with Google
      if (userData.registeredWithGoogle) {
        toast.error("You cannot log in with a password for a Google account.");
        setIsLoading(false);
        return;
      }

      // Password validation
      const isPasswordValid = await bcrypt.compare(
        formData.password,
        userData.password
      );
      if (!isPasswordValid) {
        toast.error("Incorrect password. Please try again.");
        setIsLoading(false);
        return;
      }

      // Set user details and navigate to home
      setEmail(formData.email);
      setUserDetails(userData);
      localStorage.setItem("userDetails", JSON.stringify(userData));

      toast.success("Successfully logged in!", { autoClose: 2000 });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      let errorMessage = "An unexpected error occured";
      if ((err.code = "auth/invalid-email")) {
        errorMessage = "Please enter valid email address";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Invalid password";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "User not found";
      }
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center ">
      <div
        className="card p-4 mt-5 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-left mb-1">
          <img
            src={logo}
            alt="Logo"
            className="mb-2"
            style={{ width: "10%" }}
          />
          <span className="log-logo">{t("navbar.brand")}</span>
          <h4>{t("login.login_title")}</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="email">{t("login.email_label")}</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control mt-2"
              placeholder={t("registration.email_placeholder")}
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            {validationErrors.email && (
              <p className="text-danger mt-1">{validationErrors.email}</p>
            )}
          </div>
          <div className="form-group mb-3 position-relative">
            <label htmlFor="password">{t("login.password_label")}</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="form-control mt-1"
                placeholder={t("registration.password_placeholder")}
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {validationErrors.password && (
              <p className="text-danger mt-1">{validationErrors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-block mt-3"
            style={{
              backgroundColor: "#8b0000",
              color: "#fff",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            {isLoading ? t("login.logging_in") : t("login.login")}
          </button>

          {/* Register Link */}
          <div className="text-center mt-3">
            <p>
              {t("login.login_desc")}{" "}
              <Link
                to="/registration"
                className="register-link text-decoration-none"
              >
                {t("login.register")}
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
