import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://demo-practice.onrender.com/userdata/${email}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [email]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <span className="sr-only">{t("profile.loading")}</span>
        <div className="spinner-border text-dark mx-2" role="status"></div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-header text-white" style={{ backgroundColor: "#8b0000" }}>
          <h5 className="mb-0">{t("profile.title")}</h5>
        </div>
        <div className="card-body">
          {userDetails ? (
            <>
              <div className="mb-3">
                <strong>{t("profile.firstName")}:</strong> {userDetails.first_name}
              </div>
              <div className="mb-3">
                <strong>{t("profile.lastName")}:</strong> {userDetails.last_name}
              </div>
              <div className="mb-3">
                <strong>{t("profile.email")}:</strong> {userDetails.email}
              </div>
              <div className="d-flex justify-content-between mt-4">
                <button
                  onClick={handleEditProfile}
                  className="btn btn-outline-danger"
                  style={{ color: "#8b0000", borderColor: "#8b0000" }}
                >
                  {t("profile.editProfileButton")}
                </button>
                <button
                  onClick={handleBackToHome}
                  className="btn btn-outline-danger"
                  style={{ color: "#8b0000", borderColor: "#8b0000" }}
                >
                  {t("profile.backToHomeButton")}
                </button>
              </div>
            </>
          ) : (
            <p className="text-danger">{t("profile.errorFetching")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
