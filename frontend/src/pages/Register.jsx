import Title from "../components/Title";

import "../styles/pages/Register.scss";
import plusButton from "../assets/icons/white_plus.svg";
import lamp from "../assets/logos/lamp.svg";

function Register() {
  return (
    <div>
      <Title />
      <p className="connexion-title-register">Créer mon compte</p>
      <div className="account-phrase-register">
        <img className="lamp-logo" src={lamp} alt="Logo d'une ampoule" />
        <p>Partagez de nouvelles astuces !</p>
      </div>
      <form className="form-area-register">
        <div className="input-container-register">
          <p className="text-form-register">Identifiant :</p>
          <input className="form-input-register" type="text" placeholder="" />
        </div>
        <div className="input-container-register">
          <p className="text-form-register">Mot de passe :</p>
          <input
            className="form-input-register"
            type="password"
            placeholder=""
          />
        </div>
        <div className="input-container-register">
          <p className="text-form-register">Confirmer le mot de passe :</p>
          <input
            className="form-input-register"
            type="password"
            placeholder=""
          />
        </div>
        <button type="button" className="submit-button">
          Je créer mon compte
          <img
            src={plusButton}
            alt="on_button"
            className="button-icon-register"
          />
        </button>
      </form>
    </div>
  );
}
export default Register;
