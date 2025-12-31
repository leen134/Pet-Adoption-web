import { useState, useEffect } from "react";
import axios from "axios";
import { Check, X, AlertTriangle, UtensilsCrossed } from "lucide-react";
import "./Food.css";

/* ===================== COMPONENT ===================== */

export default function FoodSection() {
  const [foods, setFoods] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/foods");
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };
    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesFilter =
      filter === "all" || (filter === "safe" ? food.safe : !food.safe);
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const safeFoods = filteredFoods.filter((f) => f.safe);
  const unsafeFoods = filteredFoods.filter((f) => !f.safe);

  return (
    <div className="food-wrapper">
      {/* Header */}
      <div className="food-header">
        <h1>Food Guide</h1>
        <p>Safe and unsafe foods for your dog</p>
      </div>

      {/* Search & Filter */}
      <div className="food-filter">
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="filter-buttons">
          {["all", "safe", "unsafe"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Safe Foods */}
      {safeFoods.length > 0 && filter !== "unsafe" && (
        <Section title="Safe Foods" icon={Check}>
          {safeFoods.map((food, i) => (
            <FoodCard key={i} food={food} safe />
          ))}
        </Section>
      )}

      {/* Unsafe Foods */}
      {unsafeFoods.length > 0 && filter !== "safe" && (
        <Section title="Unsafe / Toxic Foods" icon={X}>
          {unsafeFoods.map((food, i) => (
            <FoodCard key={i} food={food} />
          ))}
        </Section>
      )}

      {/* Important Reminders */}
      <div className="food-reminders">
        <div className="food-reminders-header">
          <AlertTriangle />
          <h3>Important Reminders</h3>
        </div>
        <ul className="food-reminders-list">
          <li>• Always introduce new foods gradually and in small amounts</li>
          <li>• Monitor your pet for any signs of allergic reactions or digestive upset</li>
          <li>• Treats should make up no more than 10% of daily caloric intake</li>
          <li>• Always provide fresh, clean water</li>
          <li>• When in doubt, consult your veterinarian before feeding new foods</li>
          <li>• Keep emergency vet number handy: 1-800-555-0199</li>
        </ul>
      </div>

      {/* Feeding Guidelines */}
      <div className="food-guidelines">
        <div className="food-guidelines-header">
          <UtensilsCrossed />
          <h3>General Feeding Guidelines</h3>
        </div>
        <div className="food-guidelines-content">
          <div className="food-guidelines-dos">
            <h4>Do's</h4>
            <ul>
              <li>✓ Feed high-quality pet food as main diet</li>
              <li>✓ Maintain consistent feeding schedule</li>
              <li>✓ Control portion sizes</li>
              <li>✓ Provide species-appropriate treats</li>
            </ul>
          </div>
          <div className="food-guidelines-donts">
            <h4>Don'ts</h4>
            <ul>
              <li>✗ Don't feed table scraps regularly</li>
              <li>✗ Avoid feeding seasoned or spicy foods</li>
              <li>✗ Never feed cooked bones</li>
              <li>✗ Don't overfeed treats</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== HELPERS ===================== */

function Section({ title, icon: Icon, children }) {
  return (
    <div className="food-section">
      <div className="food-section-title">
        <Icon />
        <h2>{title}</h2>
      </div>
      <div className="food-grid">{children}</div>
    </div>
  );
}

function FoodCard({ food, safe }) {
  return (
    <div className={`food-card ${safe ? "safe" : "unsafe"}`}>
      {safe ? <Check /> : <X />}
      <div>
        <p className="food-name">{food.name}</p>
        <p className="food-category">{food.category}</p>
        {food.notes && <p className="food-notes">{food.notes}</p>}
      </div>
    </div>
  );
}
