import React, { useState } from 'react';
import './Form.css';

export default function AdoptionForm({ onSubmit, pets = [], initialSelectedPetId = "" }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    petType: '',
    specificPetId: initialSelectedPetId,
    experience: '',
    household: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Adoption Application</h2>

      <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />

      <label>Specific Pet (Optional):</label>
      <select name="specificPetId" value={form.specificPetId} onChange={handleChange}>
        <option value="">-- Select a specific pet (or leave blank) --</option>
        {pets.map(pet => (
          <option key={pet.id} value={pet.id}>
            {pet.name} ({pet.breed})
          </option>
        ))}
      </select>

      <label>Type of pet you want to adopt:</label>
      <select name="petType" onChange={handleChange} required>
        <option value="">Select</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="small">Small Animals (Rabbit, Hamster)</option>
        <option value="reptile">Reptile</option>
        <option value="bird">Bird</option>
      </select>

      <label>Experience with pets:</label>
      <select name="experience" onChange={handleChange} required>
        <option value="">Select</option>
        <option value="beginner">Beginner</option>
        <option value="experienced">Experienced</option>
      </select>

      <label>Household type:</label>
      <select name="household" onChange={handleChange} required>
        <option value="">Select</option>
        <option value="alone">Alone</option>
        <option value="family">Family</option>
        <option value="with-pets">Already have pets</option>
      </select>

      <button type="submit">Submit Application</button>
    </form>
  );
}
