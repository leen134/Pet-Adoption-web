import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 1. Import axios for making HTTP requests
import Signup from "../components/Signup";
import "../components/Signup.css";

export default function SignupPage() {
  const navigate = useNavigate();
  
  // 2. Add state for user feedback (loading, messages)
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // 3. Define the backend API URL
  const API_URL = "http://localhost:3001/api/users";

  const handleSignupSubmit = async (data) => {
    setIsLoading(true);
    setMessage("");

    try {
      // 4. Make the POST request to the backend
      const response = await axios.post(API_URL, {
        name: data.name,
        age: data.age,
        email: data.email || null,
        phone: data.phone || null,
        password: data.password,
      });

      // Handle successful signup
      setMessage("Account created successfully! Redirecting to login...");
      setIsError(false);

      // Store user info in localStorage
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      // Navigate to home page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      // Handle errors (e.g., email already exists, server down)
      console.error("Signup error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during signup. Please try again.";
      setMessage(errorMessage);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleForm = () => {
    navigate("/login");
  };

  return (
    <div className="page-container">
      <Signup 
        onSubmit={handleSignupSubmit} 
        onToggleForm={handleToggleForm}
        isLoading={isLoading}
        message={message}
        isError={isError}
      />
    </div>
  );
}
