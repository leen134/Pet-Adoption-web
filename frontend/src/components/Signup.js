import React, { useState } from "react";
import { Heart, Mail, Phone, Lock, User, Calendar } from "lucide-react";

export default function Signup({ onSubmit, onToggleForm }) {
  const [loginMethod, setLoginMethod] = useState("email");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[\d\s-()]{10,}$/.test(phone);
  };

  const validateAge = (age) => {
    const ageNum = parseInt(age);
    return !isNaN(ageNum) && ageNum > 0 && ageNum <= 120;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate name
    if (!name) newErrors.name = "Name is required";
    else if (name.length < 2) newErrors.name = "Name must be at least 2 characters";

    // Validate age
    if (!age) newErrors.age = "Age is required";
    else if (!validateAge(age)) newErrors.age = "Please enter a valid age";

    // Validate email or phone
    if (loginMethod === "email") {
      if (!email) newErrors.email = "Email is required";
      else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    } else {
      if (!phone) newErrors.phone = "Phone number is required";
      else if (!validatePhone(phone)) newErrors.phone = "Invalid phone number format";
    }

    // Validate password
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    // Validate confirm password
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const signupData = {
      name,
      age,
      method: loginMethod,
      [loginMethod]: loginMethod === "email" ? email : phone,
      password
    };

    onSubmit(signupData);
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <div className="heart-icon">
          <Heart className="heart-svg" fill="currentColor" />
        </div>
        <h2 className="auth-title">Sign Up</h2>
        <p className="auth-tagline">Create an account to find your perfect pet</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form"> 
        {}
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`input-field ${errors.name ? "error" : ""}`}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        {}
        <div className="input-group">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`input-field ${errors.age ? "error" : ""}`}
          />
          {errors.age && <p className="error-message">{errors.age}</p>}
        </div>

        {}
        <div className="login-method-toggle">
          <button
            type="button"
            onClick={() => setLoginMethod("email")}
            className={`toggle-btn ${loginMethod === "email" ? "active" : ""}`}
          >
            <Mail className="icon" />
            Email
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod("phone")}
            className={`toggle-btn ${loginMethod === "phone" ? "active" : ""}`}
          >
            <Phone className="icon" />
            Phone
          </button>
        </div>

        {}
        {loginMethod === "email" ? (
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input-field ${errors.email ? "error" : ""}`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
        ) : (
          <div className="input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`input-field ${errors.phone ? "error" : ""}`}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
        )}

        {}
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`input-field ${errors.password ? "error" : ""}`}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        {}
        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`input-field ${errors.confirmPassword ? "error" : ""}`}
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>

        {}
        <button type="submit" className="submit-btn">
          Sign Up
        </button>

        {}
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <button type="button" className="toggle-form-btn" onClick={onToggleForm}>
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
