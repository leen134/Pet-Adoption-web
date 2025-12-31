import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import PetMatchPage from "./pages/PetMatchPage";
import AdoptionPage from "./pages/AdoptionPage";
import PetInfoPage from "./pages/PetInfoPage";
import FoodPage from "./pages/FoodPage";
import PetProfilePage from "./pages/PetProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import "./App.css";


export default function App() {

return (
<BrowserRouter>
<Header />
<main>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/match" element={<PetMatchPage />} />
<Route path="/adopt" element={<AdoptionPage />} />
<Route path="/food" element={<FoodPage />} />
<Route path="/care" element={<PetInfoPage />} />
<Route path="/profile" element={<PetProfilePage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<SignupPage />} />

</Routes>
</main>
</BrowserRouter>
);
}