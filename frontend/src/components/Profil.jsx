import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import BubbleProfile from "../assets/logos/profile-bubble.svg";

function Profil() {
  const { user } = useContext(AuthContext);
  return (
    <section className="profile-component">
      <img src={BubbleProfile} alt="Avatar" className="avatar" />
    </section>
  );
}

export default Profil;
