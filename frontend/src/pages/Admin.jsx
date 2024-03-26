import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Title from "../components/Header/Title";
import NavBar from "../components/Header/NavBar";
import AdminTips from "../components/Admin/AdminTips";

import GrearIcon from "../assets/icons/gear.svg";

import "../styles/pages/Admin.scss";

function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas un administrateur
    if (!user.isLoggedIn || user.isAdmin !== 1) {
      navigate("/connexion");
    }
  }, [user, navigate]);

  if (!user.isLoggedIn || user.isAdmin !== 1) {
    return null;
  }

  return (
    <>
      <Title />
      <section className="admin-tips-page">
        <h1 className="admin-title">Administrateur</h1>
        <div className="navbar">
          <NavBar />
        </div>
        <h2 className="manage-title">
          <img src={GrearIcon} alt="Réglages" className="gear-icon" />
          Gérer les Astuces
        </h2>
        <section className="admin-tips-section">
          <AdminTips />
        </section>
      </section>
    </>
  );
}

export default Admin;
