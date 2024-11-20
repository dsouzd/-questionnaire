import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const localEmail = localStorage.getItem("email");
  const loggedUser = localStorage.getItem("userDetails");
  const [email, setEmail] = useState(localEmail);
  const [userDetails, setUserDetails] = useState(loggedUser?JSON.parse(loggedUser):null);
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails)
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  useEffect(() => {
    if (email) localStorage.setItem("email", email);
  }, [email]);

  const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('userDetails');
    localStorage.clear();
    setEmail(null);
    setUserDetails(null);
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{ email, setEmail, userDetails, setUserDetails , logout}}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

