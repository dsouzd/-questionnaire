import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateForm } from "./validations/formValidation";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/Registration.css";

const Registration = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) return;

    setIsLoading(true);

    try {
      await axios.post("https://demo-practice.onrender.com/register", formData);
      setIsLoading(false);

      // Display success notification
      toast.success(t("registration.successMessage"), {
        position: "top-center",
        autoClose: 2000
      });

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (error) {
      setIsLoading(false);
      console.error("Registration error: ", error);
      toast.error(t("registration.errorMessage"), {
        position: "top-center",
        autoClose: 3000
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-left mb-4">
          <img
            src="https://www.msg-global.com/images/logo_msg_global_RGB.svg"
            alt="Logo"
            className="mb-2 w-25"
          />
          <h4>{t("registration.title")}</h4>
          <p>{t("registration.subtitle")}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 position-relative">
            <input
              type="text"
              placeholder={t("registration.firstName")}
              name="first_name"
              className="form-control"
              disabled={isLoading}
              value={formData.first_name}
              onChange={handleChange}
            />
            {errors.first_name && <p className="text-danger">{errors.first_name}</p>}
          </div>

          <div className="form-group mb-3 position-relative">
            <input
              type="text"
              placeholder={t("registration.lastName")}
              name="last_name"
              className="form-control"
              disabled={isLoading}
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && <p className="text-danger">{errors.last_name}</p>}
          </div>

          <div className="form-group mb-3 position-relative">
            <input
              type="text"
              placeholder={t("registration.email")}
              name="email"
              className="form-control"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>

          <div className="form-group mb-3 position-relative">
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("registration.password")}
                name="password"
                className="form-control"
                disabled={isLoading}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>

          <div className="form-group mb-3 position-relative">
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("registration.confirmPassword")}
                name="confirmPassword"
                className="form-control"
                disabled={isLoading}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
          </div>

          <div className="form-group mb-3">
            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: "#8B0000", color: "#fff" }}
              disabled={isLoading}
            >
              {isLoading ? t("registration.registeringButton") : t("registration.registerButton")}
            </button>
          </div>
        </form>

        <p className="text-center mt-1">
          {t("registration.loginPrompt")}{" "}
          <Link className="register-link-text text-decoration-none" to="/login">
            {t("registration.loginLink")}
          </Link>
        </p>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Registration;
