/* eslint-disable camelcase */
import React, { useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Title from "../components/Title";
import onButton from "../assets/icons/on_button.svg";
import "../styles/pages/Login.scss";

function Login() {
  const { handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    user_name: "",
    password: "",
  });

  const handleUserNameChange = (event) => {
    const { value } = event.target;
    setLoginInfo({ ...loginInfo, user_name: value });
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setLoginInfo({ ...loginInfo, password: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user_name, password } = loginInfo;

    if (user_name === "" || password === "") {
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        loginInfo
      );

      const { token } = res.data;

      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      const { user_id } = decodedToken;

      const userAdditionalInfo = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user_id}`
      );

      const { is_admin } = userAdditionalInfo.data;

      await handleAuth(token);

      if (is_admin) {
        navigate("/admin");
      } else {
        navigate("/astuces");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div>
      <Title />
      <p className="connexion-title">Connexion</p>
      <form className="form-area">
        <div className="input-container">
          <label htmlFor="user_name" className="text-form">
            Identifiant :
            <input
              className="form-input"
              type="text"
              id="user_name"
              placeholder=""
              value={loginInfo.user_name}
              onChange={handleUserNameChange}
            />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="password" className="text-form">
            Mot de passe :
            <input
              className="form-input"
              type="password"
              id="password"
              placeholder=""
              value={loginInfo.password}
              onChange={handlePasswordChange}
            />
          </label>
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
