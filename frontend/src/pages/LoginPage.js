import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import "../components/Login.css";
import axios from "axios";


export default function LoginPage() {
    const navigate = useNavigate();
    
   
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    
  // API URL - uses environment variable in production
  const API_URL = process.env.REACT_APP_API_URL 
    ? `${process.env.REACT_APP_API_URL}/api/login`
    : "http://localhost:3001/api/login";

    const handleLoginSubmit = async (data) => {
        setIsLoading(true);
        setMessage("");

        try {
          
            const response = await axios.post(API_URL, {
                username: data.username, 
                password: data.password,
            });

           
            setMessage("Login successful! Redirecting...");
            setIsError(false);
            
            
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
         
            setTimeout(() => {
             
                navigate("/"); 
            }, 1500);

        } catch (error) {
            
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