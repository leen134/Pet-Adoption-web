import React from "react";
import { Link } from "react-router-dom";
//import "./Navbar.css";

export default function Navbar() {
  return (
    <div> 
    <nav className="navbar">

        <div className="logo" >
          <h2>PawMatch 🐾</h2>
        </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/match">Quiz</Link></li>
        <li><Link to="/adopt">Adoption Form</Link></li>
        <li><Link to="/care">Pet Care Tips</Link></li>
       
      </ul>
    </nav>
    </div>
  );
}

//      <h2 className="logo">Pet Adoption</h2>