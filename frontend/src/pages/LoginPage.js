// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "../components/Login";
import "../components/Login.css";

export default function LoginPage() {
    const navigate = useNavigate();
    
    // State for user feedback
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // The backend endpoint for login
  const API_URL = "http://localhost:3001/api/login";

    const handleLoginSubmit = async (data) => {
        setIsLoading(true);
        setMessage("");

        try {
            // We send the 'username' (which could be email or phone) and password
            const response = await axios.post(API_URL, {
                username: data.username, // Assuming the form field is named 'username'
                password: data.password,
            });

            // Handle successful login
            setMessage("Login successful! Redirecting...");
            setIsError(false);
            
            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            // Navigate to a protected page after a short delay
            setTimeout(() => {
                // *** THIS IS THE ONLY LINE THAT CHANGED ***
                navigate("/"); // Changed from "/profile" to "/"
            }, 1500);

        } catch (error) {
            // Handle errors
            console.error("Login error:", error);
            const errorMessage = error.response?.data?.message || "An error occurred during login. Please try again.";
            setMessage(errorMessage);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleToggleForm = () => {
        navigate("/signup");
    };
    
    return (
        <div className="main-wrapper">
            <Login 
                onSubmit={handleLoginSubmit} 
                onToggleForm={handleToggleForm}
                isLoading={isLoading}
                message={message}
                isError={isError}
            />
        </div>
    );
}