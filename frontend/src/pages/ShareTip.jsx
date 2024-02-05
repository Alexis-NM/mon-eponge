import React, { useState, useEffect } from "react";
import axios from "axios";

function TipForm() {
  const [formData, setFormData] = useState({
    tip_name: "",
    user_id: 2,
    picture_id: null,
    steps: [{ step_content: "" }],
    ingredients: [],
  });

  useEffect(() => {
    // Charger la liste des ingrédients depuis le backend
    axios
      .get("/api/ingredients")
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoyer les données au backend
    axios
      .post("/api/tips", formData)
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

      <label>
        Image à sélectionner:
        {/* Ajoutez ici un composant de sélection d'image */}
      </label>
      <label>
        Étapes:
        {formData.steps.map((step, index) => (
          <div key={step.step_content}>
            <input
              type="text"
              value={step.step_content}
              onChange={(e) =>
                handleInputChange(index, "step_content", e.target.value)
              }
              required
            />
            {index !== 0 && (
              <button
                type="button"
                onClick={() => handleInputChange(index, "step_content", "")}
              >
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
      <label>
        Ingrédients:
        {/* Ajoutez ici un composant de sélection d'ingrédients */}
      </label>

      <button type="submit">Créer Astuce</button>
    </form>
  );
}

export default TipForm;
