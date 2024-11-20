import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import bcrypt from 'bcryptjs';// Import Firebase configuration
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [formData, setFormData] = useState({
    first_name: userDetails?.first_name || "",
    last_name: userDetails?.last_name || "",
    email: userDetails?.email || "",
    password: "",
  });
  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails) {
      toast.error("No user details found. Please log in.");
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsChanged(true);
  };

  const handleSave = async () => {
    try {
      if (!userDetails || userDetails?.registeredWithGoogle) {
        toast.error("Editing is not allowed for Google sign-in users.");
        return;
      }

      const userRef = doc(db, "users", userDetails.email); // Use the email as the document ID in Firestore
      const updatedData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
      };

      if (formData.password) {
        const hashedPassword = await bcrypt.hash(formData.password, 10);
        updatedData.password = hashedPassword;
      }

      await updateDoc(userRef, updatedData);

      toast.success("Profile successfully updated!");
      // Update local user details to reflect changes
      const updatedLocalUserDetails = {
        ...userDetails,
        first_name: formData.first_name,
        last_name: formData.last_name,
      };
      localStorage.setItem("userDetails", JSON.stringify(updatedLocalUserDetails));
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="container mt-2">
      <div
        style={{ maxWidth: "350px", width: "100%", backgroundColor: "#f9f9f9" }}
        className="card form-card mx-auto shadow"
      >
        <div className="card-body">
          <h3
            className="card-title text-center mb-4"
            style={{ color: "#8b0000" }}
          >
            Edit Profile
          </h3>
          <form>
            {/* First Name */}
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="form-control"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-control"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
              />
            </div>

            {/* Email */}
            <div className="mb-3 position-relative">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                disabled
              />
              <span
                className="position-absolute"
                style={{
                  top: "70%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "red",
                  cursor: "not-allowed",
                }}
              >
                ❌
              </span>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password (Optional)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
              {formData.password && (
                <div className="alert alert-warning mt-2" role="alert">
                  Once you change your password, you cannot sign in with Google
                  using the same email. Instead, sign in manually with the new
                  password.
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="text-center">
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: isChanged ? "#8b0000" : "#d3d3d3",
                  color: "white",
                  cursor: isChanged ? "pointer" : "not-allowed",
                }}
                disabled={!isChanged}
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
