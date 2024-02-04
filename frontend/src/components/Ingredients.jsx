import React, { useState, useEffect } from "react";
import axios from "axios";

import emptyBox from "../assets/icons/emptybox.svg";
import checkBox from "../assets/icons/checkbox.svg";
import paperclip from "../assets/logos/paperclip.svg";

import "../styles/components/Ingredients.scss";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3310";

  const toggleIngredient = (ingredient) => {
    if (checkedIngredients.includes(ingredient)) {
      setCheckedIngredients(
        checkedIngredients.filter((item) => item !== ingredient)
      );
    } else {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    }
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/ingredients`);
        setIngredients(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients", error);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <>
      <img src={paperclip} alt="Trombone" className="paperclip" />
      <div className="indredient-container">
        <h2 className="ingredient-title">Liste d'Ingrédients</h2>
        <ul className="list-wrapper">
          {ingredients.map((ingredient) => (
            <li key={ingredient.id} className="ingredient-list">
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={checkedIngredients.includes(
                    ingredient.ingredient_name
                  )}
                  onChange={() => toggleIngredient(ingredient.ingredient_name)}
                />
                {checkedIngredients.includes(ingredient.ingredient_name) ? (
                  <img src={checkBox} alt="Coche" className="check-icon" />
                ) : (
                  <img src={emptyBox} alt="Case vide" className="check-icon" />
                )}
                {ingredient.ingredient_name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Ingredients;
