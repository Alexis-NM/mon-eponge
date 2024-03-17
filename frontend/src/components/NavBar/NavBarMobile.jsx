import { useState } from "react";
import Title from "../Header/Title";

import "../../styles/components/NavBar/NavBarMobile.scss";

function NavBarMobile() {
  const [contentVisible, setContentVisible] = useState(true);

  const toggleContentVisible = () => {
    setContentVisible((prevContentVisible) => !prevContentVisible);
  };

  return (
    <>
      <Title />
      <div className="accordion_container">
        <div className="accordion">
          <button
            type="button"
            className="accordion_title"
            onClick={toggleContentVisible}
          >
            Les Astuces
          </button>
        </div>
        <div
          className={`accordion_content ${
            contentVisible ? "show_content" : ""
          }`}
        >
          <div className="list_item_container">
            <p>Accueil</p>
          </div>
          <div className="list_item_container">
            <p>Proposer une astuce</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBarMobile;
