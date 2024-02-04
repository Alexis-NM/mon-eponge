import lamp from "../assets/logos/lamp.svg";
import plant from "../assets/logos/monstera.svg";

import "../styles/components/Naviguate.scss";

function Naviguate() {
  return (
    <>
      <div className="account-container">
        <button type="button" className="connexion-button">
          Connexion
        </button>
        <button type="button" className="inscription-button">
          Créer mon compte
        </button>
      </div>
      <div className="account-phrase">
        <img className="lamp-logo" src={lamp} alt="Logo d'une ampoule" />
        <p>Partagez de nouvelles astuces !</p>
      </div>
      <button type="button" className="visitor-button">
        Simple visite
      </button>
      <div className="visitor-phrase">
        <img className="plant-logo" src={plant} alt="Logo de plante Monstera" />
        <p>
          Je souhaite garder une maison propre et respectueuse de
          l'environnement
        </p>
      </div>
    </>
  );
}

export default Naviguate;
