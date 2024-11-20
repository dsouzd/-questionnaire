import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import user from "../../assets/user.png"; 

const Profile = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails")); 
  const navigate = useNavigate();

  if (!userDetails) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>No user data found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow" style={{ maxWidth: "500px" }}>
        <div className="card-body text-center">
          <div className="mb-4">
            <img
              src={userDetails.photoURL || user}
              alt="Profile"
              className="rounded-circle"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                border: "2px solid #8b0000",
              }}
            />
          </div>
          {/* User Details */}
          <h3 className="card-title mb-3" style={{ color: "#8b0000" }}>
            {userDetails.first_name} {userDetails.last_name}
          </h3>
          <p className="card-text text-muted mb-4">{userDetails.email}</p>

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-primary px-4 mx-2"
              style={{
                backgroundColor: "#8b0000",
                borderColor: "#8b0000",
              }}
              onClick={() => navigate("/edit-profile")}
            >
              Edit Profile
            </button>
            <button
              className="btn btn-secondary px-4 mx-2"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
