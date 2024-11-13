import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [originalData, setOriginalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    // Fetch user details to prefill the form
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://demo-practice.onrender.com/userdata/${email}`
        ); // Replace with your API endpoint
        const { first_name, last_name, email: fetchedEmail } = response.data;

        // Prefill form data and store original data for comparison
        setFormData({ first_name, last_name, email: fetchedEmail, password: "" });
        setOriginalData({ first_name, last_name, email: fetchedEmail });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const hasDataChanged = () => {
    return (
      formData.first_name !== originalData?.first_name ||
      formData.last_name !== originalData?.last_name ||
      formData.email !== originalData?.email ||
      formData.password !== ""
    );
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        if(formData.password === "") formData.password = originalData.password
      await axios.put(
        `https://demo-practice.onrender.com/edit/${formData.email}`,
        formData
      ); // Replace with your API endpoint
      toast.success("Profile has been successfully updated!", {
        position: "top-center",
        autoClose: 2000,
      });
      setIsLoading(false);
      navigate("/profile"); // Redirect to profile page
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsLoading(false);
    }
  };

  const handleBackToProfile = () => {
    navigate("/profile"); // Redirect to profile page
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-left mb-3">
          <h4 style={{ color: "#8b0000" }}>Edit Profile</h4>
        </div>
        <form onSubmit={handleSaveChanges}>
          <div className="form-group mb-3">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="form-control mt-2"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="form-control mt-2"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control mt-2"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="form-control mt-1"
                placeholder="Enter new password"
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
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#8b0000", color: "#fff" }}
              disabled={isLoading || !hasDataChanged()}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleBackToProfile}
              disabled={isLoading}
              style={{ color: "#8b0000", borderColor: "#8b0000" }}
            >
              Back to Profile
            </button>
          </div>
        </form>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default ProfileEdit;
