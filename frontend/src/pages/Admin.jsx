import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Title from "../components/Header/Title";
import Profil from "../components/Header/Profil";
import AdminTips from "../components/Admin/AdminTips";

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
    <div>
      <Title />
      <h1>Page Admin</h1>
      <Profil />
      <AdminTips />
      <Link to="/astuces">
        <button type="button">Aller vers Astuces</button>
      </Link>
    </div>
  );
}

export default Admin;
