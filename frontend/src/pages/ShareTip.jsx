import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PictureSelector from "../components/PictureSelector";
import IngredientSelector from "../components/IngrediantSelector";

function TipForm() {
  const { user } = useContext(AuthContext);
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
    // Charger la liste des ingrédients depuis le backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/ingredients`)
      .then((response) => console.info(response.data))
      .catch((error) =>
        console.error("Erreur lors du chargement des ingrédients", error)
      );
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
    setFormData({ ...formData, ingredients: selectedIngredients });
  };

  const handleDeleteStep = (index) => {
    const newSteps = [...formData.steps];
    newSteps.splice(index, 1); // Supprime l'étape à l'index spécifié
    setFormData({ ...formData, steps: newSteps });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoyer les données au backend
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/tips`, formData)
      .then((response) => {
        console.info("Astuce créée avec succès", response.data);
        // Réinitialiser le formulaire ou effectuer d'autres actions
      })
      .catch((error) =>
        console.error("Erreur lors de la création de l'astuce", error)
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre:
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
        Image à sélectionner:
        <PictureSelector id="pictureSelector" onSelect={handleImageSelect} />
      </label>
      <label htmlFor="ingredients">
        Ingrédients:
        <IngredientSelector
          id="ingredients"
          onSelect={handleIngredientsSelect}
        />
      </label>
      <label>
        Étapes:
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
                Supprimer l'étape
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
      <button type="submit">Créer Astuce</button>
    </form>
  );
}

export default TipForm;
