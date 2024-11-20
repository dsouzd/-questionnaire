import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useUser } from "../context/UserContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Your Firebase configuration

const GoogleLogin = () => {
  const { setUserDetails } = useUser();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const success = await signInWithPopup(auth, googleProvider);
      const user = success.user;

      // Prepare user details
      const userData = {
        uid: user.uid,
        first_name: user.displayName.split(" ")[0],
        last_name: user.displayName.split(" ")[1] || "",
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      };

      // Set user details in context and localStorage
      setUserDetails(userData);
      localStorage.setItem("userDetails", JSON.stringify(userData));

      // Save user data to Firestore
      const userRef = doc(db, "users", user.email); // Firestore collection 'users'
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        await setDoc(userRef, userData); // Save user data only if it doesn't exist
        console.log("User data added to Firestore.");
      } else {
        console.log("User data already exists in Firestore.");
      }

      toast.success("Logged in successfully with Google!");
      navigate("/instructions");
    } catch (error) {
      toast.error("Error logging in with Google: " + error.message);
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
