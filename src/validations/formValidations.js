import { validateEmail } from "./emailValidation";
import { validatePassword } from "./passValidation";

export const validateForm = (data = {}) => {
  const errors = {};

  errors.first_name = data.first_name ? "" : "First name is required";

  errors.last_name = data.last_name ? "" : "Last name is required";

  errors.email = validateEmail(data.email);
  if (!data.email) {
    errors.email = "Email is required";
  }

  errors.password = validatePassword(data.password);
  if (!data.password) {
    errors.password = "Password is required";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  } else {
    errors.confirmPassword = "";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirmation Password is required";
  }

  return errors;
};
