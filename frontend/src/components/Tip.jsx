import { useEffect, useState } from "react";
import axios from "axios";

import pin from "../assets/logos/pin.svg";

import "../styles/components/Tip.scss";

function Tip() {
  const [tips, setTips] = useState([]);

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

  return (
    <>
      <img src={pin} alt="Épingle" className="pin-icon" />
      <div className="tip-main-container">
        <h2 className="tip-main-title">Les Astuces</h2>
        <div className="tip-container">
          {tips.map((tip) => (
            <div key={tip.id} className="tip-wrapper">
              <img
                src={`/assets/tip_icons/${tip.picture_url}`}
                alt={tip.tip_name}
                className="tip-icon"
              />
              <h3 className="tip-title">{tip.tip_name}</h3>
              <ul className="step-list">
                {tip.steps &&
                  tip.steps
                    .split(",")
                    .map((step) => <li key={step.trim()}>{step.trim()}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Tip;
