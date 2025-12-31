const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require('bcryptjs'); 


const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", 
  database: "testdb"
});

const createMedicalSql = `
CREATE TABLE IF NOT EXISTS medical (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  vaccinations TEXT,
  medications TEXT,
  allergies TEXT,
  vet_name VARCHAR(255),
  vet_clinic VARCHAR(255),
  vet_phone VARCHAR(50),
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
)`;

const createFoodsSql = `
CREATE TABLE IF NOT EXISTS foods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  safe BOOLEAN DEFAULT TRUE,
  notes TEXT
)`;

pool.query(createFoodsSql, (err) => {
  if (err) {
    console.error("Database error creating foods table:", err);
  } else {
    
    pool.query("SELECT COUNT(*) as count FROM foods", (err, results) => {
      if (!err && results[0].count === 0) {
        const seedFoods = [
          { name: "Chocolate", category: "Treat", safe: false, notes: "Toxic to dogs" },
          { name: "Grapes", category: "Fruit", safe: false, notes: "Can cause kidney failure" },
          { name: "Carrots", category: "Vegetable", safe: true, notes: "Healthy snack" },
          { name: "Chicken (Cooked)", category: "Meat", safe: true, notes: "Good source of protein" },
          { name: "Onions", category: "Vegetable", safe: false, notes: "Damages red blood cells" },
          { name: "Apples", category: "Fruit", safe: true, notes: "Remove seeds before feeding" },
          { name: "Peanut Butter", category: "Treat", safe: true, notes: "Ensure it has no xylitol" },
          { name: "Xylitol", category: "Sweetener", safe: false, notes: "Extremely toxic" }
        ];

        const insertFoodSql = "INSERT INTO foods (name, category, safe, notes) VALUES ?";
        const values = seedFoods.map(f => [f.name, f.category, f.safe, f.notes]);

        pool.query(insertFoodSql, [values], (err) => {
          if (err) console.error("Error seeding foods:", err);
          else console.log("Seeded foods table");
        });
      }
    });
  }
});

pool.query(createMedicalSql, (err) => {
  if (err) {
    console.error("Database error creating medical table:", err);
  } else {
    pool.query("UPDATE medical SET vet_name = ?, vet_phone = ? WHERE vet_name = ?", ["Dr. Abir", "76022333", "Dr. Smith"], (updateErr) => {
       if (updateErr) console.error("Error updating old vet info:", updateErr);
    });

    const selectPetsSql = "SELECT id FROM pets";
    pool.query(selectPetsSql, (petsErr, pets) => {
      if (petsErr) {
        console.error("Database error selecting pets for medical seed:", petsErr);
      } else {
        pets.forEach((p) => {
          pool.query("SELECT id FROM medical WHERE pet_id = ?", [p.id], (checkErr, existing) => {
            if (checkErr) {
              console.error("Database error checking medical row:", checkErr);
            } else if (existing.length === 0) {
              const vaccinations = JSON.stringify([
                { name: "Rabies", nextDue: "2025-10-15" },
                { name: "DHPP", nextDue: "2025-11-20" }
              ]);
              const medications = JSON.stringify([
                { name: "Heartgard Plus", dosage: "Monthly", notes: "Prevents heartworm" }
              ]);
              const allergies = "None";
              const insertSql = "INSERT INTO medical (pet_id, vaccinations, medications, allergies, vet_name, vet_clinic, vet_phone) VALUES (?, ?, ?, ?, ?, ?, ?)";
              pool.query(insertSql, [p.id, vaccinations, medications, allergies, "Dr. Abir", "Happy Paws Veterinary", "76022333"], (insErr) => {
                if (insErr) {
                  console.error("Database error inserting medical row:", insErr);
                }
              });
            }
          });
        });
      }
    });
  }
});


app.get("/", (req, res) => {
  res.send("Pet Adoption Website Backend is running");
});

app.post("/api/users", async (req, res) => {
  const { name, age, email, phone, password } = req.body;

 
  if (!name || !age || !password) {
    return res.status(400).json({ message: "Name, age, and password are required" });
  }

  
  if (!email && !phone) {
    return res.status(400).json({ message: "Email or phone number is required" });
  }

  
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
  }

  const checkSql = email ? "SELECT * FROM users WHERE email = ?" : "SELECT * FROM users WHERE phone = ?";
  const checkValue = email || phone;
  
  pool.query(checkSql, [checkValue], async (err, results) => {
    if (err) {
      console.error("Database error during check:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      const existingField = email ? "Email" : "Phone number";
      return res.status(400).json({ message: `${existingField} already exists` });
    }

    try {
      
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      
      const insertSql = "INSERT INTO users (name, age, email, phone, password) VALUES (?, ?, ?, ?, ?)";
      
      pool.query(insertSql, [name, age, email || null, phone || null, hashedPassword], (insertErr, insertResults) => {
        if (insertErr) {
          console.error("Database error during signup:", insertErr);
          return res.status(500).json({ message: "Internal server error" });
        }

        res.status(201).json({
          message: "Account created successfully",
          user: {
            id: insertResults.insertId,
            name: name,
            age: age,
            email: email,
            phone: phone
          }
        });
      });
    } catch (hashError) {
      console.error("Error hashing password:", hashError);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username (email or phone) and password are required" });
    }

    const sql = "SELECT * FROM users WHERE email = ? OR phone = ?";
    
    pool.query(sql, [username, username], async (err, results) => {
        if (err) {
            console.error("Database error during login:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = results[0];

        try {
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const { password: hashedPassword, ...userWithoutPassword } = user;
            
            res.status(200).json({
                message: "Login successful",
                user: userWithoutPassword
            });

        } catch (compareError) {
            console.error("Error comparing passwords:", compareError);
            res.status(500).json({ message: "Internal server error" });
        }
    });
});


app.post("/api/adoption", (req, res) => {
  const { user_id, fullName, email, phone, address, petType, experience, household, specificPetId } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }


  const checkMatchSql = "SELECT * FROM pet_match_form WHERE user_id = ?";
  pool.query(checkMatchSql, [user_id], (err, matchResults) => {
    if (err) {
      console.error("Database error checking pet match status:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (matchResults.length === 0) {
      return res.status(403).json({ 
        message: "Make sure to fill pet match quiz first" 
      });
    }

    const match = matchResults[0];
    const answers = [match.time, match.finances, match.commitment, match.stability, match.responsibility, match.support];
    const noCount = answers.filter(a => a === 'no').length;

    if (noCount >= 4) {
      return res.status(403).json({ 
        message: "We're sorry, but you are currently unable to complete an adoption request! For more information, please contact us at petpaw@gmail.com or by phone at +961 70975376. Thank you." 
      });
    }

    const sql = "INSERT INTO adoption_form (user_id, full_name, email, phone, address, pet_type, experience, household, pet_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    pool.query(sql, [user_id, fullName, email, phone, address, petType, experience, household, specificPetId || null], (err, results) => {
      if (err) {
        console.error("Database error during adoption submission:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(201).json({ message: "Adoption application submitted successfully" });
    });
  });
});

app.post("/api/pet-match", (req, res) => {
  const { user_id, time, finances, commitment, stability, responsibility, support } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const sql = "INSERT INTO pet_match_form (user_id, time, finances, commitment, stability, responsibility, support) VALUES (?, ?, ?, ?, ?, ?, ?)";

  pool.query(sql, [user_id, time, finances, commitment, stability, responsibility, support], (err, results) => {
    if (err) {
      console.error("Database error during pet match submission:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Pet match preferences saved successfully" });
  });
});


app.get("/api/pet-match/check/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM pet_match_form WHERE user_id = ?";
  pool.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error checking pet match status:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    
    if (results.length === 0) {
      return res.json({ hasMatched: false, passed: false });
    }

    const match = results[0];
    const answers = [match.time, match.finances, match.commitment, match.stability, match.responsibility, match.support];
    const noCount = answers.filter(a => a === 'no').length;
    
   
    res.json({ hasMatched: true, passed: noCount < 4 });
  });
});


app.get("/api/pets", (req, res) => {
  const sql = "SELECT * FROM pets";
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Database error fetching pets:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
   
    const pets = results.map(pet => ({
      ...pet,
      personality: pet.personality ? pet.personality.split(',') : []
    }));
    res.json(pets);
  });
});

app.get("/api/pets/:id/medical", (req, res) => {
  const petId = req.params.id;
  const sql = "SELECT * FROM medical WHERE pet_id = ?";
  pool.query(sql, [petId], (err, results) => {
    if (err) {
      console.error("Database error fetching medical:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "No medical record found" });
    }
    const row = results[0];
    let vaccinations = [];
    let medications = [];
    try {
      vaccinations = row.vaccinations ? JSON.parse(row.vaccinations) : [];
      medications = row.medications ? JSON.parse(row.medications) : [];
    } catch (e) {
      vaccinations = [];
      medications = [];
    }
    const allergies = row.allergies ? row.allergies.split(",").map(s => s.trim()).filter(Boolean) : [];
    res.json({
      vaccinations,
      medications,
      allergies,
      vet: {
        name: row.vet_name,
        clinic: row.vet_clinic,
        phone: row.vet_phone
      }
    });
  });
});


app.post("/api/pets", (req, res) => {
  const { name, breed, age, image, location, personality, description } = req.body;
  

  const personalityStr = Array.isArray(personality) ? personality.join(',') : personality;

  const sql = "INSERT INTO pets (name, breed, age, image, location, personality, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
  pool.query(sql, [name, breed, age, image, location, personalityStr, description], (err, results) => {
    if (err) {
      console.error("Database error adding pet:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Pet added successfully", id: results.insertId });
  });
});


app.get("/api/foods", (req, res) => {
  const sql = "SELECT * FROM foods";
  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Database error fetching foods:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  
    const foods = results.map(food => ({
      ...food,
      safe: Boolean(food.safe)
    }));
    res.json(foods);
  });
});


app.post("/api/foods", (req, res) => {
  const { name, category, safe, notes } = req.body;
  
  const sql = "INSERT INTO foods (name, category, safe, notes) VALUES (?, ?, ?, ?)";
  
  pool.query(sql, [name, category, safe, notes], (err, results) => {
    if (err) {
      console.error("Database error adding food:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({ message: "Food added successfully", id: results.insertId });
  });
});





app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
