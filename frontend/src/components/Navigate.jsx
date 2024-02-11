import { Link } from "react-router-dom";
import lamp from "../assets/logos/lamp.svg";
import plant from "../assets/logos/monstera.svg";
import "../styles/components/Naviguate.scss";

function Naviguate() {
  return (
    <>
      <div className="account-container">
        <Link to="/connexion" className="connexion-button">
          Connexion
        </Link>
        <Link to="/inscription" className="register-button">
          Créer mon compte
        </Link>
      </div>
      <div className="account-phrase">
        <img className="lamp-logo" src={lamp} alt="Logo d'une ampoule" />
        <p>Partagez de nouvelles astuces !</p>
      </div>
      <Link to="/astuces" className="visitor-button">
        Simple visite
      </Link>
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
