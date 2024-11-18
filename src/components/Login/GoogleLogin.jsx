import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useUser } from "../context/UserContext";

const GoogleLogin = () => {
  const { userDetails, setUserDetails } = useUser();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const success = await signInWithPopup(auth, googleProvider);
      const user = success.user;
      console.log(user);
      setUserDetails({
        uid: user.uid,
        first_name: user.displayName.split(" ")[0],
        last_name: user.displayName.split(" ")[1],
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
      localStorage.setItem("userDetails", JSON.stringify({ userDetails }));
      navigate("/");
    } catch (error) {
      toast.error("Error logging in with google" + error.message);
    }
  };

  return (
    <div>
      <button className="sign-in-button" onClick={handleGoogleLogin}>
        <FontAwesomeIcon icon={faGoogle} className="icon" />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
