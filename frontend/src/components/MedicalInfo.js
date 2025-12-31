// src/components/MedicalInfo.js
import React from "react";
import { Stethoscope, Calendar, Pill, AlertCircle } from "lucide-react";

export default function MedicalInfo({ pet, medicalData }) {
  const data = medicalData || {
      vaccinations: [],
      medications: [],
      allergies: [],
      vet: { name: "", clinic: "", phone: "" }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          {pet ? `Medical Records for ${pet.name}` : "Medical Information"}
        </h1>
        <p className="text-gray-600">
          Keep track of vaccinations, medications, and vet visits
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Vaccination Records */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4 tip-section">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="font-semibold">Vaccination Records</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            {(data.vaccinations || []).map((vax, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{vax.name}</span>
                <span className="text-sm text-gray-500">Next: {vax.nextDue}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Current Medications */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4 tip-section">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Pill className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="font-semibold">Current Medications</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            {(data.medications || []).map((med, idx) => (
              <li key={idx}>
                <p className="font-medium">{med.name}</p>
                <p className="text-sm">{med.dosage} - {med.notes}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Allergies & Vet Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 space-y-4 tip-section">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="font-semibold">Known Allergies</h2>
          </div>
          <ul className="space-y-1 text-gray-600">
             {(data.allergies || []).map((allergy, idx) => (
              <li key={idx}> {allergy}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-6 space-y-4 tip-section">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-100 rounded-lg">
              <Stethoscope className="w-5 h-5 text-rose-600" />
            </div>
            <h2 className="font-semibold">Veterinarian</h2>
          </div>
          <div className="text-gray-600">
            <p className="font-medium">{data.vet?.name}</p>
            <p>{data.vet?.clinic}</p>
            <p>{data.vet?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
