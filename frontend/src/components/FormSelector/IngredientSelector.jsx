// IngredientSelector.js

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";
import DownArrow from "../../assets/icons/down_arrow.svg";
import "../../styles/components/FormSelector/IngredientSelector.scss";

import CrossIcon from "../../assets/icons/green_plus.svg";

function IngredientSelector({ setSelectedIngredients }) {
  const { user, handleAuth } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/ingredients`)
      .then((response) => {
        const initializedIngredients = response.data.map((ingredient) => ({
          ...ingredient,
          isChecked: false,
        }));
        setIngredients(initializedIngredients);
      })
      .catch((error) => console.error("Error loading ingredients", error));
  }, []);

  const handleCheckboxChange = (ingredientId) => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === ingredientId
        ? { ...ingredient, isChecked: !ingredient.isChecked }
        : ingredient
    );
    setIngredients(updatedIngredients);

    const updatedSelectedIngredients = updatedIngredients.filter(
      (ingredient) => ingredient.isChecked
    );
    setSelectedIngredients(updatedSelectedIngredients);
  };

  const handleAddNewIngredient = async () => {
    if (!user.isLoggedIn) {
      return;
    }

    const token = localStorage.getItem("token");

    await handleAuth(token);

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/ingredients`,
        {
          ingredient_name: newIngredient,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.info("New ingredient added", response.data);
        setIngredients([
          ...ingredients,
          {
            id: response.data.id,
            ingredient_name: newIngredient,
            isChecked: false,
          },
        ]);
        setNewIngredient("");
      })
      .catch((error) => console.error("Error adding ingredient", error));
  };

  return (
    <section className="ingredient-selector-container">
      <article className="menu-list">
        <div className="drop-container">
          <button
            className="dropdown-toggle"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            Cochez les ingredients <img src={DownArrow} alt="down arrow" />
          </button>
          {isOpen && (
            <div className="ingredient-dropdown">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id}>
                  <input
                    type="checkbox"
                    id={`ingredient-${ingredient.id}`}
                    onChange={() => handleCheckboxChange(ingredient.id)}
                    checked={ingredient.isChecked}
                  />
                  <label htmlFor={`ingredient-${ingredient.id}`}>
                    {ingredient.ingredient_name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
      <article className="add-ingredient-container">
        <button
          type="button"
          onClick={handleAddNewIngredient}
          className="add-button"
        >
          <img src={CrossIcon} alt="Cross Icon" className="cross-icon" />
        </button>
        <input
          type="text"
          placeholder="Ajouter un ingrédient"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          className="add-ingredient-input"
        />
      </article>
    </section>
  );
}

IngredientSelector.propTypes = {
  setSelectedIngredients: PropTypes.func.isRequired,
};

export default IngredientSelector;
