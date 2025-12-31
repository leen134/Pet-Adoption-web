import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AdoptionForm from "../components/AdoptionForm";
import '../components/Header.css';

export default function AdoptionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialSelectedPetId = location.state?.selectedPetId || "";
  const [pets, setPets] = useState([]);
  const [hasMatched, setHasMatched] = useState(null); // null = loading, false = no match, true = matched
  const [passed, setPassed] = useState(null); // null = loading/unknown, false = failed, true = passed

  useEffect(() => {
    const checkAuthAndMatch = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert("Please log in or create an account to adopt a pet.");
        navigate('/login');
        return;
      }
      
      const user = JSON.parse(storedUser);
      try {
        const response = await axios.get(`http://localhost:3001/api/pet-match/check/${user.id}`);
        setHasMatched(response.data.hasMatched);
        setPassed(response.data.passed);
      } catch (error) {
        console.error("Error checking match status:", error);
      }
    };

    checkAuthAndMatch();

    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/pets");
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
    fetchPets();
  }, [navigate]);

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
      // Display the backend error message if available
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    }
  };

  if (hasMatched === false) {
    return (
      <div className="page-container">
        <h1>Pet Adoption Application</h1>
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '5px', color: '#856404' }}>
          <h2>Adoption Restricted</h2>
          <p>You cannot adopt a pet without first completing the Pet Match Quiz.</p>
          <p>This ensures we match you with a pet that suits your lifestyle.</p>
          <button 
            onClick={() => navigate('/pet-match')}
            style={{ padding: '10px 20px', marginTop: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Go to Pet Match Quiz
          </button>
        </div>
      </div>
    );
  }

  if (hasMatched === true && passed === false) {
    return (
      <div className="page-container">
        <h1>Pet Adoption Application</h1>
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '5px', color: '#721c24' }}>
          <h2>Adoption Restricted</h2>
          <p>We're sorry, but you are currently unable to complete an adoption request! For more information, please contact us at petpaw@gmail.com or by phone at +961 70975376. Thank you.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-container">
        <h1>Pet Adoption Application</h1>
        {hasMatched === null ? (
          <p>Checking eligibility...</p>
        ) : (
          <AdoptionForm 
            onSubmit={handleAdoptionSubmit} 
            pets={pets} 
            initialSelectedPetId={initialSelectedPetId} 
          />
        )}
      </div>
    </>
  );
}
