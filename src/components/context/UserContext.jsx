import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const localEmail = localStorage.getItem("email");
  const loggedUser = localStorage.getItem("userDetails");
  const [email, setEmail] = useState(localEmail);
  const [userDetails, setUserDetails] = useState(loggedUser?JSON.parse(loggedUser):null);

  useEffect(() => {
    if (userDetails)
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  useEffect(() => {
    if (email) localStorage.setItem("email", email);
  }, [email]);

  return (
    <UserContext.Provider
      value={{ email, setEmail, userDetails, setUserDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

