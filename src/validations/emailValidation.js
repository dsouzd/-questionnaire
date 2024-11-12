export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return "Email is required";
  }

  if (!emailPattern.test(email)) {
    return "Enter a valid email address";
  }

  return "";
};
