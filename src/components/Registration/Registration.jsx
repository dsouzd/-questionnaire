import { doc } from "firebase/firestore";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateForm } from "../../validations/formValidations";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/Registration.css";
import logo from "../../assets/logo.png";
import { useTranslation } from "react-i18next";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc } from "firebase/firestore";
import GoogleLogin from "../Login/GoogleLogin";

const Registration = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    const validationErrors = validateForm(formData, "registration");
    setErrors(validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) return;

    setIsLoading(true);

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 8);

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      toast.success(t("success_register"), {
        position: "top-center",
        autoClose: 2000,
      });
      setIsLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      setIsLoading(false);

      let errorMessage = "An error occurred. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "The email address is already in use.";
      }

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center m-5 vh-100 ">
        <div
          className="card p-4 mt-5 shadow"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="text-left mb-4">
            <div className="logo-info">
              <img
                src={logo}
                alt="Logo"
                className="mb-2"
                style={{ width: "10%" }}
              />
              <span className="logo-text-log">{t("navbar.brand")}</span>
            </div>
            <h4>{t("registration.register_title")}</h4>
            <p>{t("registration.register_description")}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 position-relative">
              <input
                type="text"
                placeholder={t("registration.first_name")}
                name="first_name"
                className="form-control"
                disabled={isLoading}
                value={formData.first_name}
                onChange={handleChange}
              />
              {isLoading && (
                <FaTimes
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    color: "#dc3545",
                  }}
                />
              )}
              {errors.first_name && (
                <p className="text-danger">{errors.first_name}</p>
              )}
            </div>

            <div className="form-group mb-3 position-relative">
              <input
                type="text"
                placeholder={t("registration.last_name")}
                name="last_name"
                className="form-control"
                disabled={isLoading}
                value={formData.last_name}
                onChange={handleChange}
              />
              {isLoading && (
                <FaTimes
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    color: "#dc3545",
                  }}
                />
              )}
              {errors.last_name && (
                <p className="text-danger">{errors.last_name}</p>
              )}
            </div>

            <div className="form-group mb-3 position-relative">
              <input
                type="text"
                placeholder={t("registration.email_placeholder")}
                name="email"
                className="form-control"
                disabled={isLoading}
                value={formData.email}
                onChange={handleChange}
              />
              {isLoading && (
                <FaTimes
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    color: "#dc3545",
                  }}
                />
              )}
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

            <div className="form-group mb-3 position-relative">
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("registration.password_placeholder")}
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
                {isLoading && (
                  <FaTimes
                    className="position-absolute"
                    style={{
                      top: "50%",
                      right: "40px",
                      transform: "translateY(-50%)",
                      color: "#dc3545",
                    }}
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}
            </div>

            <div className="form-group mb-3 position-relative">
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("registration.confirm_password")}
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
                {isLoading && (
                  <FaTimes
                    className="position-absolute"
                    style={{
                      top: "50%",
                      right: "40px",
                      transform: "translateY(-50%)",
                      color: "#dc3545",
                    }}
                  />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="form-group mb-3">
              <button
                type="submit"
                className="btn w-100"
                style={{ backgroundColor: "#8B0000", color: "#fff" }}
                disabled={isLoading}
              >
                {isLoading
                  ? t("registration.registering")
                  : t("registration.register")}
              </button>
            </div>
          </form>

          <p className="text-center mt-1">
            {t("registration.already_have_account")}{" "}
            <Link
              className="register-link-text text-decoration-none"
              to="/login"
            >
              {t("registration.login")}
            </Link>
          </p>
          <p className="or">or</p>

          <div className="socials">
            <GoogleLogin />

            {/* <button className="facebook-btn">
              <FontAwesomeIcon icon={faFacebookF} className="facebook-icon" />
              Sign in with Facebook
            </button> */}
          </div>
        </div>

        {/* Toast Container for notifications */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Registration;
