import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContext";

function IngredientSelector({ setSelectedIngredients }) {
  const { user, handleAuth } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [rerender, setRerender] = useState(false); // État pour déclencher le rerender

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
  }, [rerender]); // Rerender dépend de cet état

  const handleCheckboxChange = (selectedIngredient) => {
    const updatedIngredient = { ...selectedIngredient };
    updatedIngredient.isChecked = !updatedIngredient.isChecked;

    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
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
        setRerender(!rerender); // Déclencher le rerender en inversant l'état
      })
      .catch((error) => console.error("Error adding ingredient", error));

    setNewIngredient("");
  };

  return (
    <div>
      {ingredients.map((ingredient) => (
        <div key={ingredient.id}>
          <input
            type="checkbox"
            id={`ingredient-${ingredient.id}`}
            value={ingredient.id}
            onChange={() => handleCheckboxChange(ingredient)}
            checked={ingredient.isChecked}
          />
          <label htmlFor={`ingredient-${ingredient.id}`}>
            {ingredient.ingredient_name}
          </label>
        </div>
      ))}

      <div>
        <input
          type="text"
          placeholder="Nouvel ingrédient"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <button type="button" onClick={handleAddNewIngredient}>
          ajouter
        </button>
      </div>
    </div>
  );
}

IngredientSelector.propTypes = {
  setSelectedIngredients: PropTypes.func.isRequired,
};

export default IngredientSelector;
