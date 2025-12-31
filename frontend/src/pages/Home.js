import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import home from "../images/home.JPG"; 
import './Home.css';
import AboutSection from "../components/AboutSection";


export default function Home() {  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollToAbout) {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the state so it doesn't scroll again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleStartQuiz = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please log in or create an account to use the Pet Match tool.");
      navigate("/login");
    } else {
      navigate("/match");
    }
  };

  return (
    <div className="home-container">  

      <main className="main-content">
        <div className="hero-section">
          <h1>Find Your Perfect Pet Companion</h1>
          <p>Connect with lovable pets looking for their forever homes. Our smart matching system pairs you with the ideal furry friend based on your lifestyle and preferences.</p>
          <div className="cta-buttons">
            <button className="start-free-btn" onClick={handleStartQuiz}>
              Start Pet Matching Quiz
            </button>
            <button className="watch-demo-btn" onClick={() => navigate("/signup")}>Create Account</button>
          </div>
        </div>
        
        {/* */}
        <div className="home-image-container">
          <img src={home} alt="Happy pets waiting for adoption" className="home-image" />
        </div>

      </main>
      
      <AboutSection />
    </div>
  );
}
