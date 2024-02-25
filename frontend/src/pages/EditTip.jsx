import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Title from "../components/Title";

function EditTip() {
  const { user } = useContext(AuthContext);
  const { tipId } = useParams();
  const navigate = useNavigate();

  const [tip, setTip] = useState({
    tip_name: "",
    steps: "",
  });

  useEffect(() => {
    const fetchTipDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tips/${tipId}`
        );
        setTip(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'astuce : ",
          error
        );
      }
    };

    fetchTipDetails();
  }, [tipId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTip((prevTip) => ({
      ...prevTip,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tips/${tipId}`,
        tip
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'astuce : ", error);
    }
  };

  // Rediriger vers la page de connexion si l'utilisateur n'est pas un administrateur
  useEffect(() => {
    if (!user.isLoggedIn || !user.isAdmin) {
      navigate("/connexion");
    }
  }, [user, navigate]);

  if (!user.isLoggedIn || !user.isAdmin) {
    return <div>Vous n'avez pas la permission d'accéder à cette page.</div>;
  }

  return (
    <div>
      <Title />
      <h1>Edit Tip</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Tip Name:
          <input
            type="text"
            name="tip_name"
            value={tip.tip_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Steps:
          <textarea
            name="steps"
            value={tip.steps}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
}

export default EditTip;
