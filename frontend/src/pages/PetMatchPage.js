import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PetMatchForm from "../components/PetMatchForm";
import AdoptionForm from "../components/AdoptionForm";
import "../components/PetMatchStyle.css";
import axios from "axios";

export default function PetMatchPage() {
  const [result, setResult] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert("Please log in or create an account to use the Pet Match tool.");
      navigate('/login');
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  if (!authorized) return null;

  const handleQuizSubmit = async (quizResult, answers) => {
    setResult(quizResult);
    
    // Save quiz answers to database
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        await axios.post("http://localhost:3001/api/pet-match", {
          ...answers,
          user_id: user.id
        });
      }
    } catch (error) {
      console.error("Error saving pet match answers:", error);
      
    }
  };

  const handleAdoptionSubmit = async (formData) => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert("Please log in to submit an adoption application.");
        return;
      }
      const user = JSON.parse(storedUser);

      const response = await axios.post("http://localhost:3001/api/adoption", {
        ...formData,
        user_id: user.id
      });

      if (response.status === 201) {
        alert("Adoption application submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting adoption form:", error);
      alert("Failed to submit application. Please try again.");
    }
  };


  return (
    <>
     
      <div className="page-container">
        <h1>Find Your Perfect Pet Match</h1>

        {!result && <PetMatchForm onSubmit={handleQuizSubmit} />}

        {result && (
          <div className="result-container">
            <h2>{result}</h2>

            {result.includes("capable") && (
              <div className="adoption-section">
                <h3>Fill out the adoption application below:</h3>
                <AdoptionForm onSubmit={handleAdoptionSubmit} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
