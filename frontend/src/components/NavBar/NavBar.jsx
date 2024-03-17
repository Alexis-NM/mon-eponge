import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import Title from "../Header/Title";

import "../../styles/components/NavBar/NavBar.scss";

function NavBar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProposeAstuce = () => {
    if (!user.isLoggedIn) {
      navigate("/connexion");
    } else {
      navigate("/proposer-une-astuce");
    }
  };

  return (
    <nav>
      <Title />
      <ul className="nav-container">
        <li className="nav-box">
          <Link to="/" className="nav-link">
            Accueil
          </Link>
        </li>
        <li className="nav-box">
          <Link to="/astuces" className="nav-link">
            Les Astuces
          </Link>
        </li>
        <li className="nav-box">
          <button
            className="nav-link"
            onClick={handleProposeAstuce}
            type="button"
          >
            Proposer une astuce
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
