import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { vi } from "vitest";
import Registration from "./Registration";

// Mock axios
vi.mock("axios");

// Mock translations
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        "registration.title": "Create Account",
        "registration.subtitle": "Enter your information to create an account",
        "registration.firstName": "First name",
        "registration.lastName": "Last name",
        "registration.email": "Email",
        "registration.password": "Password",
        "registration.confirmPassword": "Confirm password",
        "registration.registerButton": "Register",
        "registration.successMessage": "Account successfully created!",
        "registration.errorMessage": "An error occurred during registration. Please try again.",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock toastify
vi.mock("react-toastify", async () => {
  const actual = await vi.importActual("react-toastify");
  return {
    ...actual,
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe("Registration Component", () => {
  const setup = () =>
    render(
      <Router>
        <Registration />
      </Router>
    );

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("renders the registration form with all fields", () => {
    setup();

    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
  });

  test("displays validation errors for invalid inputs", async () => {
    setup();
  
    fireEvent.click(screen.getByRole("button", { name: "Register" }));
  
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/is required/i);
      expect(errorMessages).toHaveLength(5); // Expect 5 validation messages
    });
  });
  

  test("submits the form with valid data and calls success toast", async () => {
    // Mock the Axios POST request
    axios.post.mockResolvedValueOnce({ status: 200 });
  
    // Render the component
    setup();
  
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password123$" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm password"), {
      target: { value: "Password123$" },
    });
  
    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Register" }));
  
    await waitFor(() => {
      // Ensure Axios is called once
      expect(axios.post).toHaveBeenCalledTimes(1);
  
      // Verify the correct payload
      expect(axios.post).toHaveBeenCalledWith("https://demo-practice.onrender.com/register", {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "Password123$",
        confirmPassword: "Password123$",
      });
  
      // Ensure success toast is called
      expect(require("react-toastify").toast.success).toHaveBeenCalledWith(
        "Account successfully created!"
      );
    });
  });
  
  

  test("shows error toast when registration fails", async () => {
    // Mock the Axios POST request to reject
    axios.post.mockRejectedValueOnce(new Error("Registration failed"));
  
    // Render the component
    setup();
  
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password123$" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm password"), {
      target: { value: "Password123$" },
    });
  
    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: "Register" }));
  
    await waitFor(() => {
      // Ensure Axios is called once
      expect(axios.post).toHaveBeenCalledTimes(1);
  
      // Ensure error toast is called
      expect(require("react-toastify").toast.error).toHaveBeenCalledWith(
        "An error occurred during registration. Please try again."
      );
    });
  }); 
});
