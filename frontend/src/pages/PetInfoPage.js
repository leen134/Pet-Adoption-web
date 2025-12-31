// src/pages/PetInfoPage.js
import React, { useEffect, useState } from "react";
import MedicalInfo from "../components/MedicalInfo";
import PetCareTips from "../components/PetCareTips"; // Renamed from PetCareInfo for clarity
import "../components/PetInfo.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const MrdicalInfoData = {
  vaccinations: [
    { name: "Rabies", date: "2025-05-25", nextDue: "2025-12-31" },
    { name: "DHPP", date: "2025-09-25", nextDue: "2025-12-31" },
  ],
  medications: [
    { name: "Heartgard Plus", dosage: "Monthly", notes: "Prevents heartworm" },
  ],
  allergies: ["Chicken", "Dust mites"],
  vet: {
    name: "Dr. Abir",
    clinic: "Happy Paws Veterinary",
    phone: "76022333",
  },
};

export default function PetInfoPage() {
  const location = useLocation();
  const [pet, setPet] = useState(null);
  const [medicalData, setMedicalData] = useState(MrdicalInfoData);

  useEffect(() => {
    const id = location.state && location.state.selectedPetId;
    if (id) {
      axios.get("http://localhost:3001/api/pets").then((response) => {
        const found = response.data.find((p) => p.id === id);
        setPet(found || null);
      }).catch(() => {
        setPet(null);
      });

      axios
        .get(`http://localhost:3001/api/pets/${id}/medical`)
        .then((response) => {
          setMedicalData(response.data);
        })
        .catch(() => {
          setMedicalData(MrdicalInfoData);
        });
    } else {
      setPet(null);
      setMedicalData(MrdicalInfoData);
    }
  }, [location]);
  return (
    <div className="page-container">
      <h1>Your Pet’s Care Information</h1>

      <div className="info-sections">
        {/* Pass a pet object to show specific info, or null to show the selector */}
        <MedicalInfo pet={pet} medicalData={medicalData} />
        <PetCareTips pet={pet} />
      </div>
    </div>
  );
}
