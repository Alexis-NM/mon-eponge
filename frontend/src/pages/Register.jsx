/* eslint-disable camelcase */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Title from "../components/Title";

import "../styles/pages/Register.scss";
import plusButton from "../assets/icons/white_plus.svg";
import lamp from "../assets/logos/lamp.svg";

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    user_name: "",
    password: "",
    passwordRepeat: "", // Ajout de la propriété manquante
    picture_id: 1,
    is_admin: false,
  });
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const handleChangeRegister = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setRegisterInfo({ ...registerInfo, [name]: newValue });
  };

  useEffect(() => {
    setErrMessage("");
  }, [registerInfo]);

  const handleRegister = async (event) => {
    event.preventDefault();
    // créer les fonctions pour vérifier regex
    const { user_name, password, passwordRepeat } = registerInfo; // Ajout de la variable manquante
    console.info(registerInfo);
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
        <p>Partagez de nouvelles astuces !</p>
      </div>
      <form className="form-area-register">
        <div className="input-container-register">
          <p className="text-form-register">Identifiant :</p>
          <input
            name="user_name" // Ajout du nom de la propriété manquante
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
            name="password" // Ajout du nom de la propriété manquante
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
            name="passwordRepeat" // Ajout du nom de la propriété manquante
            className="form-input-register"
            type="password"
            placeholder=""
            value={registerInfo.passwordRepeat}
            onChange={handleChangeRegister}
          />
        </div>
        <button
          type="button"
          className="submit-button"
          onClick={handleRegister}
        >
          Je crée mon compte {/* Correction de la faute de frappe */}
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
