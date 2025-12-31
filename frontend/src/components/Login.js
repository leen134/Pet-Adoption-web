import React, { useState } from "react";
import { Heart, Mail, Phone, Lock } from "lucide-react";
import "./Login.css";

// *** CHANGE 1: Add the new props for user feedback ***
export default function Login({ onSubmit, onToggleForm, isLoading, message, isError }) {
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[\d\s-()]{10,}$/.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (loginMethod === "email") {
      if (!email) newErrors.email = "Email is required";
      else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    } else {
      if (!phone) newErrors.phone = "Phone number is required";
      else if (!validatePhone(phone)) newErrors.phone = "Invalid phone number format";
    }

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // *** CHANGE 2: Create the data object in the format the backend expects ***
    const loginData = {
      username: loginMethod === "email" ? email : phone,
      password
    };

    onSubmit(loginData);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="heart-logo">
          <Heart className="heart-icon" fill="currentColor" />
        </div>
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">Find your perfect pet companion</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {/* Login Method Toggle */}
        <div className="method-selector">
          <button
            type="button"
            onClick={() => setLoginMethod("email")}
            className={`method-btn ${loginMethod === "email" ? "active" : ""}`}
          >
            <Mail className="method-icon" />
            Email
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod("phone")}
            className={`method-btn ${loginMethod === "phone" ? "active" : ""}`}
          >
            <Phone className="method-icon" />
            Phone
          </button>
        </div>

        {/* Email/Phone Input */}
        {loginMethod === "email" ? (
          <div className="field-wrapper email">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-input ${errors.email ? "error" : ""}`}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
        ) : (
          <div className="field-wrapper phone">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`form-input ${errors.phone ? "error" : ""}`}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>
        )}

        {/* Password Input */}
        <div className="field-wrapper password">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-input ${errors.password ? "error" : ""}`}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        {/* *** CHANGE 3: Update the submit button to show loading state *** */}
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* *** CHANGE 4: Display the success or error message from the parent component *** */}
        {message && <p className={`form-message ${isError ? "error" : "success"}`}>{message}</p>}

        {/* Toggle to Signup */}
        <div className="form-footer">
          <p>
            Don't have an account?
            <button type="button" className="switch-form" onClick={onToggleForm}>
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}