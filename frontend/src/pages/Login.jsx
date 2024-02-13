/* eslint-disable camelcase */
import { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Title from "../components/Title";

import "../styles/pages/Login.scss";
import onButton from "../assets/icons/on_button.svg";

function Login() {
  const { handleAuth } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({
    user_name: "",
    password: "",
  });

  const navigate = useNavigate();

  const redirectTo = async () => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      const decodeToken = jwtDecode(getToken);
      const userId = decodeToken.user_id;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`
        );

        if (data.is_administrator === 1) {
          return navigate("/user/admin");
        }
      } catch (error) {
        console.warn("Une erreur est survenue!", error);
      }
    }
    return navigate("/carte");
  };

  const handleLoginRegister = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // créer la fonction handleLogin avec ses filtres pour vérifier que tous les champs sont remplis et que l'adresse mail n'existe pas déjà
  const handleLogin = async (e) => {
    e.preventDefault();
    const { user_name, password } = loginInfo;

    if (user_name === "" || password === "") {
      return;
    }

    try {
      // Appel à l'API pour demander une connexion
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        loginInfo
      );
      // Récupération du token
      await localStorage.setItem("token", res.data.token);
      // Décodage du token et récupération des données
      await handleAuth();
      // Redirection en fonction du statut de l'utilisateur
      redirectTo();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Title />
      <p className="connexion-title">Connexion</p>
      <form className="form-area">
        <div className="input-container">
          <p className="text-form">Identifiant :</p>
          <input
            className="form-input"
            type="text"
            placeholder=""
            value={loginInfo.user_name}
            onChange={handleLoginRegister}
          />
        </div>
        <div className="input-container">
          <p className="text-form">Mot de passe :</p>
          <input
            className="form-input"
            id="password"
            type="password"
            placeholder=""
            value={loginInfo.password}
            onChange={handleLoginRegister}
          />
        </div>
        <button type="button" className="submit-button" onClick={handleLogin}>
          Je me connecte
          <img src={onButton} alt="on_button" className="button-icon" />
        </button>
      </form>
    </div>
  );
}
export default Login;
