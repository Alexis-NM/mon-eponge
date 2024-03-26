import React from "react";
import PropTypes from "prop-types";
import pin from "../../assets/logos/pin.svg";

import "../../styles/components/Tips/Tip.scss";

const tipHasAllSelectedIngredients = (tip, selectedIngredients) => {
  const ingredientsString =
    typeof tip.ingredients === "string" ? tip.ingredients : "";

  const ingredientsArray = ingredientsString.split(",");

  return selectedIngredients.every((ingredient) =>
    ingredientsArray.includes(ingredient.trim())
  );
};

function Tip({ selectedIngredients, tips }) {
  const filteredTips = tips.filter((tip) => {
    // Filtrer les astuces en fonction des ingrédients sélectionnés
    if (selectedIngredients.length === 0) return true;
    return tipHasAllSelectedIngredients(tip, selectedIngredients);
  });

  return (
    <section className="tip-section">
      <img src={pin} alt="Épingle" className="pin-icon" />
      <article className="tip-main-container">
        <h2 className="tip-main-title">Les Astuces</h2>
        <div className="tip-container">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="tip-wrapper">
              <div className="tip-header">
                <img
                  src={`/assets/tip_icons/${tip.picture_url}`}
                  alt={tip.tip_name}
                  className="tip-icon"
                />
                <h3 className="tip-title">{tip.tip_name}</h3>
              </div>
              <ul className="step-list">
                {tip.steps &&
                  tip.steps
                    .split(/(?<=\.)\s*,/)
                    .map((step, index) => <li key={index}>{step.trim()}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

Tip.propTypes = {
  selectedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  tips: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Tip;
