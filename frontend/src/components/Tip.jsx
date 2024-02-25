import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import pin from "../assets/logos/pin.svg";

import "../styles/components/Tip.scss";

const tipHasSelectedIngredients = (tip, selectedIngredients) => {
  const ingredientsString =
    typeof tip.ingredients === "string" ? tip.ingredients : "";

  const ingredientsArray = ingredientsString.split(",");

  return ingredientsArray.some((ingredient) =>
    selectedIngredients.includes(ingredient.trim())
  );
};

function Tip({ selectedIngredients }) {
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
  }, [selectedIngredients]);

  return (
    <>
      <img src={pin} alt="Épingle" className="pin-icon" />
      <div className="tip-main-container">
        <h2 className="tip-main-title">Les Astuces</h2>
        <div className="tip-container">
          {tips
            .filter((tip) =>
              selectedIngredients.length === 0
                ? true
                : tipHasSelectedIngredients(tip, selectedIngredients)
            )
            .map((tip) => (
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
                      .split(/(?<=\.)\s*,/)
                      // eslint-disable-next-line react/no-array-index-key
                      .map((step, index) => <li key={index}>{step.trim()}</li>)}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

Tip.propTypes = {
  selectedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tip;
