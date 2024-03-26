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
import UpdateModal from "../components/Modals/UpdateModal";
import DeleteModal from "../components/Modals/DeleteModal";
/// ICONS ///
import EditIcon from "../assets/icons/pencil.svg";
import GreenPlus from "../assets/icons/green_plus.svg";
import WhitePlus from "../assets/icons/white_plus.svg";
import DeleteIcon from "../assets/icons/delete.svg";
/// STYLES ///
import "../styles/pages/EditTip.scss";
import NavBarMobile from "../components/Header/NavBar";

function EditTip() {
  const { tipId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // STATES //
  const [editedTitle, setEditedTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [editedSteps, setEditedSteps] = useState([]);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    // Check if the user is an admin before allowing access to the edit page
    if (!user.isAdmin) {
      // Redirect to the login page if the user is not an admin
      navigate("/connexion");
    } else {
      const formatIngredients = (ingredients) => {
        const formattedIngredients =
          typeof ingredients === "string"
            ? ingredients.split(",")
            : ingredients;
        return formattedIngredients.map((ingredient, index) => ({
          id: index + 1,
          ingredient_name: ingredient.trim(),
          isChecked: false,
        }));
      };
      // Fetch tip details based on tipId
      const fetchTip = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/tips/${tipId}`
          );
          setEditedTitle(response.data.tip_name);
          setSelectedImageId(response.data.picture_id); // Initialiser selectedImageId avec l'ID de l'image initiale
          setSelectedImage(response.data.picture_id);
          const formattedIngredients = formatIngredients(
            response.data.ingredients
          );
          setSelectedIngredients(formattedIngredients);
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
    // Vérifie si la première lettre n'est pas une majuscule
    let updatedStep = newStep;
    if (newStep && newStep[0] !== newStep[0].toUpperCase()) {
      // Met la première lettre en majuscule
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
    if (selectedIngredients.length === 0) {
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

      console.info("Tip Updated Successfully", response.data);
      setShowUpdateModal(true);
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  /// SUPPRIMER L'ASTUCE ///

  const handleDeleteTip = () => {
    console.info("Suppression effectuée !");
    setShowDeleteModal(true); // Afficher la modale de confirmation avant la suppression
  };

  // Fonction pour confirmer la suppression de l'astuce
  const confirmDeleteTip = async () => {
    try {
      // Récupérer le token depuis le local storage
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        console.error("Token not found in local storage");
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

    setShowDeleteModal(false);
    setTimeout(() => {
      navigate("/admin");
    }, 300);
  };

  // Fonction pour annuler la suppression de l'astuce
  const cancelDeleteTip = () => {
    setShowDeleteModal(false); // Cacher la modale de confirmation
  };

  return (
    <div className="edit-page">
      <Title />
      <NavBarMobile />
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
          <p className="ingredient-label">Les ingrédients :</p>
          <IngredientSelector
            id="ingredients"
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            tipId={parseInt(tipId, 10)}
            className="ingredient-selector"
          />
        </section>
        <section className="step-container">
          <p className="step-label">Les étapes :</p>
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
                  <img
                    src={DeleteIcon}
                    alt="Delete Icon"
                    className="delete-icon"
                  />
                </button>
              </article>
            ))}
            <button
              type="button"
              onClick={handleAddStep}
              className="add-step-button"
            >
              <img
                src={GreenPlus}
                alt="Green Plus Icon"
                className="green-plus"
              />
              Ajouter une étape
            </button>
          </div>
        </section>
        <div className="button-wrapper">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="edit-tip-post"
          >
            <img src={WhitePlus} alt="Green Plus Icon" className="white-plus" />
            Je mets à jour cette astuce !
          </button>
          <UpdateModal isOpen={showUpdateModal} />
          <div>
            <button
              type="button"
              onClick={handleDeleteTip}
              className="delete-tip-button"
            >
              <img src={DeleteIcon} alt="Delete Icon" className="delete-icon" />
              Supprimer cette astuce
            </button>
            <DeleteModal
              isOpen={showDeleteModal}
              onClose={cancelDeleteTip}
              onConfirm={confirmDeleteTip}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditTip;
