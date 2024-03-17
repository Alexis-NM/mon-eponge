import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import NavBarMobile from "../components/NavBar/NavBarMobile";
import SearchBar from "../components/Header/SearchBar";
import Ingredients from "../components/Tips/Ingredients";
import Tip from "../components/Tips/Tip";

import "../styles/pages/Tips.scss";

function Tips() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  return (
    <>
      <div className="navbar-desktop">
        <NavBar />
      </div>
      <div className="navbar-mobile">
        <NavBarMobile />
      </div>
      <SearchBar />
      <Ingredients
        onIngredientsChange={(selected) => setSelectedIngredients(selected)}
      />
      <Tip selectedIngredients={selectedIngredients} />
    </>
  );
}

export default Tips;
