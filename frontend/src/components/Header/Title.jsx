import React from "react";
import { Link } from "react-router-dom";
import sponge from "../../assets/logos/sponge.svg";
import "../../styles/components/Header/Title.scss";

function Title() {
  const handleClick = () => {
    console.info("Redirection vers la page d'accueil");
  };

  return (
    <header className="title-container">
      <Link to="/" onClick={handleClick} className="main-title-link">
        <h1 className="main-title">Mon Éponge</h1>
      </Link>
      <img className="sponge-logo" src={sponge} alt="Logo d'éponge" />
    </header>
  );
}

export default Title;
