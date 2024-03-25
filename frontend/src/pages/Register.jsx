import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Title from "../components/Header/Title";

import "../styles/pages/Register.scss";
import plusButton from "../assets/icons/white_plus.svg";
import lamp from "../assets/logos/lamp.svg";

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    user_name: "",
    password: "",
    is_admin: false,
  });
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const handleChangeRegister = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "password") {
      setPasswordRepeat(""); // Reset password repeat when password changes
    }

    setRegisterInfo({ ...registerInfo, [name]: newValue });
  };

  useEffect(() => {
    setErrMessage("");
  }, [registerInfo]);

  const handleRegister = async (event) => {
    event.preventDefault();

    const { user_name, password } = registerInfo;

    if (user_name === "" || password === "" || passwordRepeat === "") {
      setErrMessage("Merci de remplir tous les champs");
      return;
    }

    if (password !== passwordRepeat) {
      setErrMessage("Les mots de passe ne correspondent pas");
      return;
    }

    setErrMessage("");
    try {
      const resregister = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        registerInfo
      );

      if (resregister.status === 201) {
        navigate("/connexion");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Title />
      <p className="connexion-title-register">Créer mon compte</p>
      <div className="account-phrase-register">
        <img className="lamp-logo" src={lamp} alt="Logo d'une ampoule" />
        <p className="share-phrase">Partagez de nouvelles astuces !</p>
      </div>
      <form className="form-area-register">
        <div className="input-container-register">
          <p className="text-form-register">Identifiant :</p>
          <input
            name="user_name"
            className="form-input-register"
            type="text"
            placeholder=""
            value={registerInfo.user_name}
            onChange={handleChangeRegister}
          />
        </div>
        <div className="input-container-register">
          <p className="text-form-register">Mot de passe :</p>
          <input
            name="password"
            className="form-input-register"
            type="password"
            placeholder=""
            value={registerInfo.password}
            onChange={handleChangeRegister}
          />
        </div>
        <div className="input-container-register">
          <p className="text-form-register">Confirmer le mot de passe :</p>
          <input
            name="passwordRepeat"
            className="form-input-register"
            type="password"
            placeholder=""
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="submit-button"
          onClick={handleRegister}
        >
          Je crée mon compte
          <img
            src={plusButton}
            alt="on_button"
            className="button-icon-register"
          />
        </button>
      </form>
      {errMessage && <p className="error-message">{errMessage}</p>}
    </div>
  );
}

export default Register;
