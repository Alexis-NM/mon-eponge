import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function EditTip() {
  const { user } = useContext(AuthContext);

  // Vérifiez si l'utilisateur est connecté et est un administrateur
  if (!user.isLoggedIn || !user.isAdmin) {
    // Redirigez l'utilisateur ou affichez un message d'erreur, selon vos besoins
    return <div>Vous n'avez pas la permission d'accéder à cette page.</div>;
  }

  return (
    <div>
      <h1>Edit Tip</h1>
    </div>
  );
}

export default EditTip;
