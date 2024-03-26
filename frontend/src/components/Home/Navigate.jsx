import { Link } from "react-router-dom";
import lamp from "../../assets/logos/lamp.svg";
import plant from "../../assets/logos/monstera.svg";
import "../../styles/components/Home/Naviguate.scss";

function Naviguate() {
  return (
    <section className="navigate-wrapper">
      <article className="account-container">
        <Link to="/connexion" className="connexion-button">
          Connexion
        </Link>
        <Link to="/inscription" className="register-button">
          Créer mon compte
        </Link>
      </article>
      <article className="account-phrase">
        <img className="lamp-logo" src={lamp} alt="Logo d'une ampoule" />
        <p className="share-phrase">Partagez de nouvelles astuces !</p>
      </article>
      <Link to="/astuces" className="visitor-button">
        Simple visite
      </Link>
      <article className="visitor-phrase">
        <img className="plant-logo" src={plant} alt="Logo de plante Monstera" />
        <p className="visit-phrase">
          Je souhaite garder une maison propre et respectueuse de
          l'environnement
        </p>
      </article>
    </section>
  );
}

export default Naviguate;
