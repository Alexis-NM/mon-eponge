import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "../../assets/icons/pencil.svg";
import "../../styles/components/Admin/AdminTips.scss";

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
    <div className="tips-admin-container">
      <div className="admin-tip-container">
        {tips.map((tip) => (
          <div key={tip.id} className="admin-tip-wrapper">
            <div className="admin-tip-header">
              <img
                src={`/assets/tip_icons/${tip.picture_url}`}
                alt={tip.tip_name}
                className="admin-tip-icon"
              />
              <h3 className="admin-tip-title">{tip.tip_name}</h3>
            </div>
            <div className="tip-wrapper">
              <ul className="admin-step-list">
                {tip.steps &&
                  tip.steps
                    .split(/(?<=\.)\s*,/)
                    .map((step, index) => <li key={index}>{step.trim()}</li>)}
              </ul>
              <button
                onClick={() => handleEditClick(tip.id)}
                type="button"
                className="edit-button"
              >
                <img src={EditIcon} alt="Modifier" className="edit-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTips;
