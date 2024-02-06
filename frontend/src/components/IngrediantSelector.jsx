// IngredientSelector.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function IngredientSelector({ onSelect }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    // Charger la liste des ingrédients depuis le backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/ingredients`)
      .then((response) => setIngredients(response.data))
      .catch((error) =>
        console.error("Erreur lors du chargement des ingrédients", error)
      );
  }, []);

  const handleSelect = (selectedIngredient) => {
    const selectedIngredients = ingredients.filter((ingredient) =>
      selectedIngredient.includes(ingredient.id)
    );
    onSelect(selectedIngredients);
  };

  return (
    <select
      multiple
      onChange={(e) =>
        handleSelect(
          Array.from(e.target.selectedOptions, (option) =>
            parseInt(option.value, 10)
          )
        )
      }
    >
      {ingredients.map((ingredient) => (
        <option key={ingredient.id} value={ingredient.id}>
          {ingredient.ingredient_name}
        </option>
      ))}
    </select>
  );
}

IngredientSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default IngredientSelector;
