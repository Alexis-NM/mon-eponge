import Title from "../components/Title";

import "../styles/pages/Login.scss";
import onButton from "../assets/icons/on_button.svg";

function Login() {
  return (
    <div>
      <Title />
      <p className="connexion-title">Connexion</p>
      <form className="form-area">
        <div className="input-container">
          <p className="text-form">Identifiant :</p>
          <input className="form-input" type="text" placeholder="" />
        </div>
        <div className="input-container">
          <p className="text-form">Mot de passe :</p>
          <input className="form-input" type="password" placeholder="" />
        </div>
        <button type="button" className="submit-button">
          Je me connecte
          <img src={onButton} alt="on_button" className="button-icon" />
        </button>
      </form>
    </div>
  );
}
export default Login;
