import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";

function IngredientSelector({ onSelect }) {
  const { user, handleAuth } = useContext(AuthContext);

  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    // Load the list of ingredients from the backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/ingredients`)
      .then((response) => setIngredients(response.data))
      .catch((error) => console.error("Error loading ingredients", error));
  }, []);

  const handleCheckboxChange = (selectedIngredient) => {
    onSelect(selectedIngredient);
  };

  const handleAddNewIngredient = async () => {
    // Check if the user is authenticated
    if (!user.isLoggedIn) {
      // Redirect to the login page or take other action
      return;
    }

    // Get the user's token
    const token = localStorage.getItem("token");

    // Authenticate using the token
    await handleAuth(token);

    // Send a POST request to add the new ingredient on the server
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
        // Update the local state with the new list of ingredients
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          response.data,
        ]);
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
  onSelect: PropTypes.func.isRequired,
};

export default IngredientSelector;
