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
    <>
      <img src={pin} alt="Épingle" className="pin-icon" />
      <div className="tip-main-container">
        <h2 className="tip-main-title">Les Astuces</h2>
        <div className="tip-container">
          {filteredTips.map((tip) => (
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
  tips: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Tip;
