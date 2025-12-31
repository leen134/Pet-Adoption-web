import React, { useState, useEffect } from "react";
import axios from "axios";
// import PetProfile from "../components/petProfile"; 
import PetCatalog from "../components/PetCatalog";  
import "../components/PetProfile.css";

export default function PetProfilePage() {
  // Fetch pet data from API
  const [pets, setPets] = useState([]);
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/pets");
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    const checkEligibility = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setEligible(false);
        return;
      }
      const user = JSON.parse(storedUser);
      try {
        const response = await axios.get(`http://localhost:3001/api/pet-match/check/${user.id}`);
        setEligible(Boolean(response.data.passed));
      } catch (error) {
        console.error("Error checking eligibility:", error);
        setEligible(false);
      }
    };

    fetchPets();
    checkEligibility();
  }, []);

  return (
    <div className="page-container">
      {/* <PetProfile pets={pets} /> */}
      <PetCatalog pets={pets} eligible={eligible} />
    </div>
  );
}
