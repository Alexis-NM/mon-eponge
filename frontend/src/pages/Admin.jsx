import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Title from "../components/Header/Title";
import Profile from "../components/Header/Profile";
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
    <section className="admin-tips-page">
      <Title />
      <Profile />
      <h1 className="admin-title">Administrateur</h1>
      <h2 className="manage-title">
        <img src={GrearIcon} alt="Réglages" className="gear-icon" />
        Gérer les Astuces
      </h2>
      <section className="admin-tips-section">
        <AdminTips />
      </section>
      <Link to="/astuces">
        <button type="button">Aller vers Astuces</button>
      </Link>
    </section>
  );
}

export default Admin;
