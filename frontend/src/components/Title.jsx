import sponge from "../assets/logos/sponge.svg";

import "../styles/components/Title.scss";

function Title() {
  return (
    <header className="title-container">
      <h1 className="main-title">Mon Éponge</h1>
      <img className="sponge-logo" src={sponge} alt="Logo d'éponge" />
    </header>
  );
}

export default Title;
