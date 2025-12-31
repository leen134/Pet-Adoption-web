// PetProfile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Info, MapPin, Calendar } from "lucide-react";
import axios from "axios";
import "./PetProfile.css";

export default function PetProfile({ pets }) {
  const [eligible, setEligible] = useState(false);
  const [hasMatched, setHasMatched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkEligibility = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setEligible(false);
        setHasMatched(false);
        return;
      }
      const user = JSON.parse(storedUser);
      try {
        const response = await axios.get(`http://localhost:3001/api/pet-match/check/${user.id}`);
        setEligible(Boolean(response.data.passed));
        setHasMatched(Boolean(response.data.hasMatched));
      } catch (error) {
        console.error("Error checking eligibility:", error);
        setEligible(false);
        setHasMatched(false);
      }
    };
    checkEligibility();
  }, []);

  const handleAdoptClick = (pet) => {
    if (!hasMatched) {
        setModalMessage("Make sure to fill pet match quiz first");
        setShowModal(true);
    } else if (!eligible) {
        setModalMessage("We're sorry, but you are currently unable to complete an adoption request! For more information, please contact us at petpaw@gmail.com or by phone at +961 70975376. Thank you.");
        setShowModal(true);
    } else {
        navigate("/adopt", { state: { selectedPetId: pet.id } });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    // ADDED: pet-profile-container
    <div className="pet-profile-container"> 
      {showModal && (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{modalMessage}</p>
                <button onClick={closeModal} className="modal-close-btn">Close</button>
            </div>
        </div>
      )}
      {/* ADDED: pet-profile-header */}
      <div className="pet-profile-header">
        <h1>Available Pets</h1>
        <p>Find your perfect companion</p>
      </div>
      
      {/* ADDED: filter-buttons */}
      <div className="filter-buttons">
        <button className="active">All</button>
        <button>Dogs</button>
        <button>Cats</button>
        <button>Rabbits</button>
        <button>Hamsters</button>
      </div>
      
      {/* ADDED: pet-grid */}
      <div className="pet-grid">
        {pets.map((pet) => (
          // ADDED: pet-card
          <div key={pet.id} className="pet-card">
            {/* ADDED: card-image-container */}
            <div className="card-image-container">
              <img src={pet.image} alt={pet.name} />
              {/* ADDED: favorite-button */}
              <div className="favorite-button">
                <Heart />
              </div>
            </div>
            {/* ADDED: card-content */}
            <div className="card-content">
              <h3>{pet.name}</h3>
              <p>{pet.breed}</p>
              {/* ADDED: card-meta */}
              <div className="card-meta">
                <span>{pet.age} years old</span>
                <span>
                  <MapPin size={14} />
                  {pet.location}
                </span>
              </div>
              {/* ADDED: personality-traits */}
              <div className="personality-traits">
                {pet.personality.map((trait, index) => (
                  <span key={index}>
                    {trait}
                  </span>
                ))}
              </div>
              {/* ADDED: card-description */}
              <p className="card-description">{pet.description}</p>
              {/* ADDED: card-actions */}
              <div className="card-actions">
                <button>
                  <Info size={16} />
                  Details
                </button>
                <button 
                  onClick={() => handleAdoptClick(pet)} 
                  title="Adopt this pet"
                >
                  Adopt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
