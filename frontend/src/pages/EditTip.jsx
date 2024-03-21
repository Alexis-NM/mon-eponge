/// HOOKS ///
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
/// UTILS ///
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
/// COMPONENTS ///
import Title from "../components/Header/Title";
import PictureSelector from "../components/FormSelector/PictureSelector";
import IngredientSelector from "../components/FormSelector/IngredientSelector";
import PictureUpload from "../components/FormSelector/PictureUpload";
/// ICONS ///
import EditIcon from "../assets/icons/pencil.svg";
/// STYLES ///
import "../styles/pages/EditTip.scss";

function EditTip() {
  const { tipId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [editedTitle, setEditedTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [editedSteps, setEditedSteps] = useState([]);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

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
          setSelectedImageId(response.data.picture_id); // Initialiser selectedImageId avec l'ID de l'image initiale
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
    setEditedTitle(newTitle);
  };

  const handleImageSelect = (newSelectedImage) => {
    setSelectedImage(newSelectedImage);
  };

  const handleImageUploadSuccess = (imageId) => {
    setSelectedImage({ id: imageId });
    setImageUploadSuccess(true);
  };

  const handleStepChange = (index, newStep) => {
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
    setEditedSteps((prevSteps) => {
      const newSteps = [...prevSteps];
      const lastIndex = newSteps.length - 1;

      if (
        lastIndex >= 0 &&
        newSteps[lastIndex].trim() &&
        newSteps[lastIndex].charAt(newSteps[lastIndex].length - 1) !== "."
      ) {
        newSteps[lastIndex] += ".";
      }

      newSteps.push("");
      return newSteps;
    });
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = [...editedSteps];
    updatedSteps.splice(index, 1);
    setEditedSteps(updatedSteps);
  };

  /// SAUVEGARDER LES MODIFICATIONS ///

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
        picture_id: selectedImage?.id || selectedImageId,
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
  console.log("Selected ingredients state:", selectedIngredients);

  const handleDeleteTip = async () => {
    // Afficher un message de confirmation avant de supprimer l'astuce
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette astuce ?"
    );

    if (!confirmDelete) {
      // Si l'utilisateur annule la suppression, ne rien faire
      return;
    }

    try {
      // Récupérer le token depuis le local storage
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        // Gérer le cas où le token n'est pas présent dans le local storage
        console.error("Token not found in local storage");
        // Vous pouvez également rediriger l'utilisateur vers la page de connexion si nécessaire
        return;
      }

      // Send a DELETE request with the user's token in the Authorization header
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/tips/${tipId}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      console.info("Deleted Tip Response:", response.data);
      // Rediriger l'utilisateur vers une page appropriée après la suppression de l'astuce
    } catch (error) {
      console.error("Error deleting tip:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="edit-page">
      <Title />
      <h2 className="edit-title">
        <img src={EditIcon} alt="Edit Icon" className="pencil-icon" />
        Éditer l'astuce :
      </h2>
      <section className="edit-container">
        <p className="editing-title">
          <label htmlFor="tipTitle" className="edit-title-label">
            Titre :
          </label>
          <input
            type="text"
            id="tipTitle"
            value={editedTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="edit-title-input"
          />
        </p>
        <section className="picture-container">
          <p className="picture-label">Choisissez une image :</p>
          <div className="picture-components">
            <PictureSelector
              id="pictureSelector"
              onSelect={handleImageSelect}
              selectedImageId={selectedImageId}
              key={imageUploadSuccess}
              className="picture-selector"
            />
            <PictureUpload
              onImageUpload={handleImageUploadSuccess}
              className="download-cross"
            />
          </div>
        </section>
        <section className="ingredient-container">
          <p className="ingredient-label">Ingrédients :</p>
          <IngredientSelector
            id="ingredients"
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            tipId={parseInt(tipId, 10)}
            className="ingredient-selector"
          />
        </section>
        <section className="step-container">
          <p className="step-label">Les Étapes :</p>
          <div className="step-wrapper">
            {editedSteps.map((step, index) => (
              <article key={index} className="step-list">
                <p className="step-bullet">•</p>
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  className="step-input"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteStep(index)}
                  className="step-delete-button"
                >
                  Supprimer L'étape
                </button>
              </article>
            ))}
            <button
              type="button"
              onClick={handleAddStep}
              className="add-step-button"
            >
              Ajouter une étape
            </button>
          </div>
        </section>
        <button
          type="button"
          onClick={handleSaveChanges}
          className="edit-tip-post"
        >
          Je mets à jour cette astuce !
        </button>
        <button
          type="button"
          onClick={handleDeleteTip}
          className="delete-tip-button"
        >
          Supprimer cette astuce
        </button>
      </section>
    </div>
  );
}

export default EditTip;
