/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import Title from "../components/Title";
import PictureSelector from "../components/PictureSelector";
import IngredientSelector from "../components/IngredientSelector";
import PictureUpload from "../components/PictureUpload";

function EditTip() {
  const { tipId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [editedTitle, setEditedTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [editedSteps, setEditedSteps] = useState([]);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);

  useEffect(() => {
    // Check if the user is an admin before allowing access to the edit page
    if (!user.isAdmin) {
      // Redirect to the login page if the user is not an admin
      navigate("/connexion");
    } else {
      // Fetch tip details based on tipId
      const fetchTip = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/tips/${tipId}`
          );
          setEditedTitle(response.data.tip_name);
          setSelectedImage(response.data.picture_id);
          // Split steps based on comma followed by an uppercase letter
          const stepsArray = response.data.steps.split(/,(?=[A-Z])/);
          setEditedSteps(stepsArray);
        } catch (error) {
          console.error("Error fetching tip details:", error);
          // Handle error (e.g., redirect to admin page)
          navigate("/admin");
        }
      };

      fetchTip();
    }
  }, [tipId, user, navigate, imageUploadSuccess]);

  const handleTitleChange = (newTitle) => {
    console.log("Title changed:", newTitle);
    setEditedTitle(newTitle);
  };

  const handleImageSelect = (newSelectedImage) => {
    console.log("Selected image:", newSelectedImage);
    setSelectedImage(newSelectedImage);
  };

  const handleImageUploadSuccess = (imageId) => {
    console.log("Image upload success:", imageId);
    setSelectedImage({ id: imageId });
    setImageUploadSuccess(true);
  };

  const handleAddNewIngredient = (newIngredient) => {
    console.log("Added new ingredient:", newIngredient);
    setSelectedIngredients((prevIngredients) => [
      ...prevIngredients,
      newIngredient,
    ]);
  };

  const handleIngredientsSelect = (newSelectedIngredients) => {
    console.log("Selected ingredients:", newSelectedIngredients);
    if (Array.isArray(newSelectedIngredients)) {
      setSelectedIngredients((prevSelectedIngredients) => [
        ...prevSelectedIngredients,
        ...newSelectedIngredients,
      ]);
    } else {
      setSelectedIngredients((prevSelectedIngredients) => [
        ...prevSelectedIngredients,
        newSelectedIngredients,
      ]);
    }
  };

  const handleStepChange = (index, newStep) => {
    console.log(`Step ${index} changed:`, newStep);
    // Vérifiez si la première lettre n'est pas une majuscule
    let updatedStep = newStep;
    if (newStep && newStep[0] !== newStep[0].toUpperCase()) {
      // Mettez la première lettre en majuscule
      updatedStep = newStep.charAt(0).toUpperCase() + newStep.slice(1);
    }

    const updatedSteps = [...editedSteps];
    updatedSteps[index] = updatedStep;
    setEditedSteps(updatedSteps);
  };

  const handleAddStep = () => {
    console.log("Added a new step");
    setEditedSteps((prevSteps) => [...prevSteps, ""]);
  };

  const handleSaveChanges = async () => {
    try {
      // Récupérer le token depuis le local storage
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        // Gérer le cas où le token n'est pas présent dans le local storage
        console.error("Token not found in local storage");
        // Vous pouvez également rediriger l'utilisateur vers la page de connexion si nécessaire
        return;
      }

      // Decode the token to get user information
      const decodedToken = jwtDecode(storedToken);
      const userIdFromToken = decodedToken.user_id;
      // Transform editedSteps into an array of objects with a 'step_content' property
      const stepsArray = editedSteps.map((step) => ({ step_content: step }));

      // Transform selectedIngredients into an array of objects with 'id' and 'ingredient_name' properties
      const ingredientsArray = selectedIngredients.map((ingredient) => ({
        id: ingredient.id,
        ingredient_name: ingredient.ingredient_name,
      }));

      const updatedTip = {
        tip_name: editedTitle,
        user_id: userIdFromToken, // Utilisez l'ID extrait du token
        picture_id: selectedImage?.id,
        ingredients: ingredientsArray,
        steps: stepsArray,
      };

      console.log("Changes to be saved:", updatedTip);

      // Send a PUT request with the user's token in the Authorization header
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tips/${tipId}`,
        updatedTip,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      console.info("Updated Tip Response:", response.data);
    } catch (error) {
      console.error("Error updating tip:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <>
      <Title />
      <h2>Edit Tip {tipId}</h2>
      <p>
        <label htmlFor="tipTitle">Tip Title: </label>
        <input
          type="text"
          id="tipTitle"
          value={editedTitle}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </p>
      <label htmlFor="pictureSelector">
        Choose an Icon
        <PictureSelector
          id="pictureSelector"
          onSelect={handleImageSelect}
          key={imageUploadSuccess}
        />
      </label>
      <PictureUpload onImageUpload={handleImageUploadSuccess} />

      <label htmlFor="ingredients">
        Ingrédients:
        <IngredientSelector
          id="ingredients"
          onSelect={handleIngredientsSelect}
          onAddNewIngredient={handleAddNewIngredient}
        />
      </label>
      <label>
        Steps:
        {editedSteps.map((step, index) => (
          <div key={index}>
            <input
              type="text"
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddStep}>
          Ajouter une étape
        </button>
      </label>
      <button type="button" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </>
  );
}

export default EditTip;
