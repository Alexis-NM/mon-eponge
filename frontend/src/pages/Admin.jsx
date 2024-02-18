// Inside Admin.jsx
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Profil from "../components/Profil";

function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn || user.isAdmin !== 1) {
      navigate("/connexion");
    }
  }, [user, navigate]);

  if (!user.isLoggedIn || user.isAdmin !== 1) {
    return null;
  }

  return (
    <div>
      <h1>Page Admin</h1>
      <Profil />
      <Link to="/astuces">
        <button>Aller vers Astuces</button>
      </Link>
      <Link to="/editer-astuce">
        <button>Aller vers Editer Astuce</button>
      </Link>
    </div>
  );
}

export default Admin;
