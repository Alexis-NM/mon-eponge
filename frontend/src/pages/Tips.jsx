import React, { useState } from "react";
import NavBar from "../components/NavBar";
import NavBarResponsive from "../components/NavBarResponsive";
import SearchBar from "../components/SearchBar";
import Ingredients from "../components/Ingredients";
import Tip from "../components/Tip";

import "../styles/pages/Tips.scss";

function Tips() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  return (
    <>
      <div className="navbar-desktop">
        <NavBar />
      </div>
      <div className="navbar-mobile">
        <NavBarResponsive />
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
