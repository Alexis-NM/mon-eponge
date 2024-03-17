import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PictureSelector from "../components/FormSelector/PictureSelector";
import IngredientSelector from "../components/FormSelector/IngredientSelector";
import Title from "../components/Header/Title";

function ShareTip() {
  const { user, handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirection si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/connexion");
    }
  }, [user.isLoggedIn, navigate]);

  // Initialisation du formulaire
  const [formData, setFormData] = useState({
    tip_name: "",
    user_id: user.id,
    picture_id: null,
    steps: [{ step_content: "" }],
    ingredients: [],
  });

  // Choisir une image
  const handleImageSelect = (selectedImage) => {
    setFormData({ ...formData, picture_id: selectedImage.id });
  };

  // Mise à jour de la liste des ingrédients
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

  // Choisir les ingrédients
  const handleIngredientsSelect = (selectedIngredients) => {
    const ingredientsArray = Array.isArray(selectedIngredients)
      ? selectedIngredients
      : [selectedIngredients];
    setFormData({ ...formData, ingredients: ingredientsArray });
  };

  // Ajouter un nouvel ingrédient
  const handleAddNewIngredient = (newIngredient) => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, newIngredient],
    }));
  };

  // Écrire une étape
  const handleInputChange = (index, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[index][field] = value;
    if (field === "step_content") {
      newSteps[index][field] =
        newSteps[index][field].charAt(0).toUpperCase() +
        newSteps[index][field].slice(1);
    }

    setFormData({ ...formData, steps: newSteps });
  };

  // Ajouter une étape
  const handleAddStep = () => {
    const newSteps = [...formData.steps];
    const lastIndex = newSteps.length - 1;

    if (
      lastIndex >= 0 &&
      newSteps[lastIndex].step_content.trim() &&
      newSteps[lastIndex].step_content.charAt(
        newSteps[lastIndex].step_content.length - 1
      ) !== "."
    ) {
      newSteps[lastIndex].step_content += ".";
    }

    newSteps.push({ step_content: "" });

    setFormData({ ...formData, steps: newSteps });
  };

  // Supprimer une étape
  const handleDeleteStep = (index) => {
    const newSteps = [...formData.steps];
    newSteps.splice(index, 1);
    setFormData({ ...formData, steps: newSteps });
  };

  // Fonction d'envoi du formulaire
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
          <button type="button" onClick={handleAddStep}>
            Ajouter une étape
          </button>
        </label>

        <button className="share-button" type="submit">
          Je propose cette astuce !
        </button>
      </form>
    </>
  );
}

export default ShareTip;
