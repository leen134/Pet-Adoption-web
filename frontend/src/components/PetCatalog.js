// PetCatalog.js
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./PetProfile.css";

export default function PetCatalog({ pets, onSelectPet, eligible }) {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const handleAdoptClick = (pet) => {
    navigate("/adopt", { state: { selectedPetId: pet.id } });
  };

  const filteredPets = filter === 'all' 
    ? pets 
    : pets.filter(pet => pet.type === filter);

  return (
    // ADDED: pet-profile-container
    <div className="pet-profile-container">
      <div>
        {/* ADDED: pet-profile-header */}
        <div className="pet-profile-header">
          <h1>Available Pets (Catalog)</h1>
          <p>Find your perfect companion</p>
        </div>

        {/* ADDED: filter-buttons */}
        <div className="filter-buttons">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')} label="All" />
          <FilterButton active={filter === 'dog'} onClick={() => setFilter('dog')} label="Dogs" />
          <FilterButton active={filter === 'cat'} onClick={() => setFilter('cat')} label="Cats" />
          <FilterButton active={filter === 'small pets'} onClick={() => setFilter('small pets')} label="Small Pets" />
        </div>
      </div>

      {/* ADDED: pet-grid */}
      <div className="pet-grid">
        {filteredPets.map((pet) => (
          // ADDED: pet-card
          <div key={pet.id} className="pet-card">
            {/* ADDED: card-image-container */}
            <div className="card-image-container">
              <img src={pet.image} alt={pet.name} />
              {/* ADDED: favorite-button */}
              <div className="favorite-button">
                <span>♥</span>
              </div>
            </div>
            {/* ADDED: card-content */}
            <div className="card-content">
              <div>
                <h3>{pet.name}</h3>
                <p>{pet.breed}</p>
                <p>{pet.age} year{pet.age !== 1 ? 's' : ''} old</p>
              </div>

              {/* ADDED: personality-traits */}
              <div className="personality-traits">
                {pet.personality && Array.isArray(pet.personality) && pet.personality.slice(0, 3).map((trait) => (
                  <span key={trait}>
                    {trait}
                  </span>
                ))}
              </div>

              {/* ADDED: card-description */}
              <p className="card-description">{pet.description}</p>

              {/* ADDED: card-actions */}
              <div className="card-actions">
                <button
                  onClick={() => navigate("/care", { state: { selectedPetId: pet.id } })}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Details
                </button>
                <button
                  onClick={() => handleAdoptClick(pet)}
                  disabled={!eligible}
                  title={!eligible ? "Complete the Pet Match Quiz and pass to adopt" : ""}
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

// MODIFIED: Added the 'active' class conditionally
function FilterButton({ active, onClick, label }) {
  return (
    <button
      className={active ? 'active' : ''} 
      onClick={onClick}
    >
      {label}
    </button>
  );
}
