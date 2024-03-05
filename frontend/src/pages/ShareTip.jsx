import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PictureSelector from "../components/PictureSelector";
import IngredientSelector from "../components/IngredientSelector";
import Title from "../components/Title";

function ShareTip() {
  const { user, handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/connexion");
    }
  }, [user.isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    tip_name: "",
    user_id: user.id,
    picture_id: null,
    steps: [{ step_content: "" }],
    ingredients: [],
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/ingredients`)
      .then((response) => {
        setFormData((prevData) => ({
          ...prevData,
          ingredients: response.data,
        }));
      })
      .catch((error) => console.error("Error loading ingredients", error));
  }, []);

  const handleInputChange = (index, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[index][field] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const handleImageSelect = (selectedImage) => {
    setFormData({ ...formData, picture_id: selectedImage.id });
  };

  const handleIngredientsSelect = (selectedIngredients) => {
    const ingredientsArray = Array.isArray(selectedIngredients)
      ? selectedIngredients
      : [selectedIngredients];
    setFormData({ ...formData, ingredients: ingredientsArray });
  };

  const handleAddNewIngredient = (newIngredient) => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, newIngredient],
    }));
  };

  const handleDeleteStep = (index) => {
    const newSteps = [...formData.steps];
    newSteps.splice(index, 1);
    setFormData({ ...formData, steps: newSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ingredientsString = formData.ingredients
      .map((ingredient) => ingredient.ingredient_name)
      .join(",");

    setFormData({
      ...formData,
      steps: formData.steps.map((step) => ({
        step_content: step.step_content,
      })),
      ingredients: ingredientsString,
    });

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/connexion");
      return;
    }

    await handleAuth(token);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/tips`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.info("Tip created successfully", response.data);
        handleAddNewIngredient(response.data.ingredients);
      })
      .catch((error) => {
        console.error("Error creating tip", error);
      });
  };

  return (
    <>
      <Title />
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={formData.tip_name}
            onChange={(e) =>
              setFormData({ ...formData, tip_name: e.target.value })
            }
            required
          />
        </label>

        <label htmlFor="pictureSelector">
          Choisir une Icône:
          <PictureSelector id="pictureSelector" onSelect={handleImageSelect} />
        </label>

        <label htmlFor="ingredients">
          Ingrédients:
          <IngredientSelector
            id="ingredients"
            onSelect={handleIngredientsSelect}
            onAddNewIngredient={handleAddNewIngredient}
          />
        </label>

        <label>
          Étape(s):
          {formData.steps.map((step, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <textarea
                value={step.step_content}
                onChange={(e) =>
                  handleInputChange(index, "step_content", e.target.value)
                }
                required
              />
              {index !== 0 && (
                <button type="button" onClick={() => handleDeleteStep(index)}>
                  Supprimer L'étape
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                steps: [...formData.steps, { step_content: "" }],
              })
            }
          >
            Ajouter une étape
          </button>
        </label>

        <button type="submit">Proposer une astuce</button>
      </form>
    </>
  );
}

export default ShareTip;
