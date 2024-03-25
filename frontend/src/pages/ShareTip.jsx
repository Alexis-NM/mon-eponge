import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { AuthContext } from "../context/AuthContext";

import Title from "../components/Header/Title";
import NavBar from "../components/NavBar/NavBar";
import PictureSelector from "../components/FormSelector/PictureSelector";
import IngredientSelector from "../components/FormSelector/IngredientSelector";
import ShareModal from "../components/Modals/ShareModal";

import GreenPlus from "../assets/icons/green_plus.svg";
import WhitePlus from "../assets/icons/white_plus.svg";
import DeleteIcon from "../assets/icons/delete.svg";

import "../styles/pages/ShareTip.scss";

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
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleImageSelect = (selectedImage) => {
    setFormData({ ...formData, picture_id: selectedImage.id });
  };

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

  const handleDeleteStep = (index) => {
    const newSteps = [...formData.steps];
    newSteps.splice(index, 1);
    setFormData({ ...formData, steps: newSteps });
  };

  useEffect(() => {
    const ingredientsArray = selectedIngredients.map((ingredient) => ({
      id: ingredient.id,
      ingredient_name: ingredient.ingredient_name,
    }));
    setFormData({ ...formData, ingredients: ingredientsArray });
  }, [selectedIngredients]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedIngredients.length === 0) {
      return;
    }

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
      .then(() => {
        console.info("Tip created successfully");
        setShowShareModal(true);
        setTimeout(() => {
          setShowShareModal(false);
          navigate("/astuces");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error creating tip", error);
      });
  };

  return (
    <>
      <Title />
      <div className="navbar">
        <NavBar />
      </div>
      <h2 className="share-tip-title">Proposer une astuce :</h2>
      <form onSubmit={handleSubmit} className="form-share-container">
        <div className="title-container">
          <label htmlFor="titleInput" className="title-label">
            Titre :
          </label>
          <input
            type="text"
            value={formData.tip_name}
            onChange={(e) =>
              setFormData({ ...formData, tip_name: e.target.value })
            }
            required
            className="title-input"
            placeholder="Commencez par un titre d'astuce"
          />
        </div>
        <div className="picture-container">
          <p className="picture-selector-title">Choisir une image :</p>
          <PictureSelector id="pictureSelector" onSelect={handleImageSelect} />
        </div>
        <div className="ingredient-container">
          <p className="ingredient-selector-title">Les ingredients :</p>
          <IngredientSelector
            id="ingredients"
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />
        </div>
        <section className="steps-container">
          <p className="steps-label">Les étapes :</p>
          <div className="steps-wrapper">
            {formData.steps.map((step, index) => (
              <article key={index} className="step-list">
                <p className="step-bullet">•</p>
                <input
                  type="text"
                  value={step.step_content}
                  onChange={(e) =>
                    handleInputChange(index, "step_content", e.target.value)
                  }
                  required
                  className="step-input"
                  placeholder="Ajouter une étape ici"
                />
                {index !== 0 && (
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
                )}
              </article>
            ))}
            <button
              type="button"
              onClick={handleAddStep}
              className="add-step-button"
            >
              <img src={GreenPlus} alt="green-plus" className="green-plus" />
              Ajouter une étape
            </button>
          </div>
        </section>
        <button className="share-button" type="submit">
          <img src={WhitePlus} alt="white-plus" className="white-plus" />
          Je propose cette astuce !
        </button>
        <ShareModal isOpen={showShareModal} />
      </form>
    </>
  );
}

export default ShareTip;
