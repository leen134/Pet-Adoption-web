// src/components/PetCareTips.js
import { useState } from "react";
import { Lightbulb, Heart, Stethoscope, Home, Zap } from "lucide-react";
import "./PetInfo.css";
// ... (dogTips, catTips, smallPetTips data remain the same) ...
const dogTips = [
  {
    category: "Medical Tips",
    icon: Stethoscope,
    tips: [
      "Schedule annual vet checkups",
      "Brush teeth regularly",
      "Keep vaccinations up to date",
      "Use flea and tick prevention",
    ],
  },
  {
    category: "Mood & Behavior",
    icon: Heart,
    tips: [
      "Daily exercise",
      "Mental stimulation",
      "Positive reinforcement",
      "Consistent routine",
    ],
  },
  {
    category: "Daily Care",
    icon: Home,
    tips: [
      "Fresh water always",
      "High-quality food",
      "Clean sleeping area",
      "Regular grooming",
    ],
  },
  {
    category: "Safety",
    icon: Zap,
    tips: [
      "No toxic foods",
      "ID tag & microchip",
      "Never leave in hot car",
      "Secure yard",
    ],
  },
];

const catTips = [
  {
    category: "Medical Tips",
    icon: Stethoscope,
    tips: [
      "Annual vet visits",
      "Monitor litter habits",
      "Weight control",
      "Dental hygiene",
    ],
  },
  {
    category: "Mood & Behavior",
    icon: Heart,
    tips: [
      "Daily play",
      "Scratching posts",
      "Vertical spaces",
      "Respect independence",
    ],
  },
  {
    category: "Daily Care",
    icon: Home,
    tips: [
      "Clean litter box",
      "Fresh water",
      "Quality food",
      "Cozy sleeping areas",
    ],
  },
  {
    category: "Safety",
    icon: Zap,
    tips: [
      "No toxic plants",
      "Secure windows",
      "No small objects",
      "Indoor safety",
    ],
  },
];

const smallPetTips = [
  {
    category: "Medical Tips",
    icon: Stethoscope,
    tips: ["Find exotic vet", "Monitor weight", "Check teeth"],
  },
  {
    category: "Mood & Behavior",
    icon: Heart,
    tips: ["Gentle handling", "Hiding spots", "Routine"],
  },
  {
    category: "Daily Care",
    icon: Home,
    tips: ["Clean cage", "Fresh water", "Proper diet"],
  },
  {
    category: "Safety",
    icon: Zap,
    tips: ["Secure cage", "Safe bedding", "Correct temperature"],
  },
];


export default function PetCareTips({ pet }) {
  const [selectedType, setSelectedType] = useState(pet?.type || "dog");

  const tips =
    pet?.type === "dog"
      ? dogTips
      : pet?.type === "cat"
      ? catTips
      : pet
      ? smallPetTips
      : selectedType === "dog"
      ? dogTips
      : selectedType === "cat"
      ? catTips
      : smallPetTips;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          {pet ? `Care Tips for ${pet.name}` : "Pet Care Tips"}
        </h1>
        <p className="text-gray-600">
          Essential advice for keeping your pet healthy and happy
        </p>
      </div>

      {/* Selector (no pet) */}
      {!pet && (
        <div className="flex justify-center gap-4">
          {["dog", "cat", "other"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-5 py-2 rounded-lg border transition pet-type-button ${
                selectedType === type
                  ? "bg-rose-500 text-white"
                  : "bg-white hover:border-rose-300"
              }`}
            >
              {type === "dog"
                ? "Dog Tips"
                : type === "cat"
                ? "Cat Tips"
                : "Small Pets"}
            </button>
          ))}
        </div>
      )}

      {/* Tips Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {tips.map((section, i) => {
          const Icon = section.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow p-6 space-y-4 tip-section">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-rose-100 rounded-lg">
                  <Icon className="w-5 h-5 text-rose-600" />
                </div>
                <h2 className="font-semibold">{section.category}</h2>
              </div>

              <ul className="space-y-2 text-gray-600">
                {section.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="w-2 h-2 mt-2 bg-rose-500 rounded-full flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Emergency */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 emergency-section">
        <h3 className="font-semibold text-red-800 mb-2">
          Emergency Warning Signs
        </h3>
        <ul className="grid md:grid-cols-2 gap-2 text-red-700">
          <li> Difficulty breathing</li>
          <li> Seizures</li>
          <li> Severe vomiting</li>
          <li> Loss of consciousness</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="bg-rose-50 rounded-xl p-6 checklist-section">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="text-rose-600" />
          <h3 className="font-semibold">Daily Checklist</h3>
        </div>
        <ul className="text-gray-600 space-y-1">
          <li>☐ Feed</li>
          <li>☐ Fresh water</li>
          <li>☐ Exercise / play</li>
          <li>☐ Health check</li>
        </ul>
      </div>
    </div>
  );
}