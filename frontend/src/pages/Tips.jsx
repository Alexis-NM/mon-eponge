// Tips.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";
import NavBarMobile from "../components/NavBar/NavBarMobile";
import SearchBar from "../components/Header/SearchBar";
import Ingredients from "../components/Tips/Ingredients";
import Tip from "../components/Tips/Tip";

import "../styles/pages/Tips.scss";

function Tips() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tips`
        );
        setTips(response.data);
        setFilteredTips(response.data); // Initialize filteredTips with all tips
      } catch (error) {
        console.error("Erreur lors de la récupération des tips : ", error);
      }
    };

    fetchTips();
  }, []);

  const tipContainsSearchTerm = (tip, searchTerm) => {
    // Vérifier si le titre de l'astuce contient le terme de recherche
    if (tip.tip_name.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Vérifier si les ingrédients de l'astuce contiennent le terme de recherche
    if (tip.ingredients && tip.ingredients.toLowerCase().includes(searchTerm)) {
      return true;
    }

    // Vérifier si les étapes de l'astuce contiennent le terme de recherche
    if (tip.steps && tip.steps.toLowerCase().includes(searchTerm)) {
      return true;
    }

    return false;
  };

  const handleSearch = (searchTerm) => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    const filteredResults = tips.filter((tip) =>
      tipContainsSearchTerm(tip, normalizedSearchTerm)
    );
    setFilteredTips(filteredResults);
  };

  return (
    <>
      <div className="navbar-desktop">
        <NavBar />
      </div>
      <div className="navbar-mobile">
        <NavBarMobile />
      </div>
      <SearchBar onSearch={handleSearch} />
      <Ingredients
        onIngredientsChange={(selected) => setSelectedIngredients(selected)}
      />
      <Tip selectedIngredients={selectedIngredients} tips={filteredTips} />
    </>
  );
}

export default Tips;
