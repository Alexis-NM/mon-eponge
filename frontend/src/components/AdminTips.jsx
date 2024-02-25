import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminTips() {
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tips`
        );
        setTips(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tips : ", error);
      }
    };

    fetchTips();
  }, []);

  const handleEditClick = (tipId) => {
    // Naviguer vers la page d'édition seulement si l'utilisateur est un administrateur
    navigate(`/editer-astuce/${tipId}`);
  };

  return (
    <div className="all-tips-main-container">
      <h2 className="all-tips-main-title">Tous les Astuces</h2>
      <div className="all-tips-container">
        {tips.map((tip) => (
          <div key={tip.id} className="all-tips-wrapper">
            <h3 className="all-tips-title">{tip.tip_name}</h3>
            <button onClick={() => handleEditClick(tip.id)}>Éditer</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTips;
