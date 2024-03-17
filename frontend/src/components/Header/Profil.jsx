import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProfilBubble from "../../assets/icons/profil_bubble.svg";
import { AuthContext } from "../../context/AuthContext";

import "../../styles/components/Header/Profil.scss";

function Profil() {
  const { user } = useContext(AuthContext);
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        // Récupération des informations du profil à partir de l'API
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/pictures/${user.pictureId}`
        );

        setProfileInfo(response.data);
      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
    };

    if (user.isLoggedIn && user.pictureId) {
      fetchProfileInfo();
    }
  }, [user.isLoggedIn, user.pictureId]);

  return (
    <section className="profile-component">
      {profileInfo ? (
        <>
          <img
            src={`/assets/tip_icons/${profileInfo.picture_url}`}
            alt="Avatar"
            className="avatar"
          />
          <p className="user_name">{user.userName}</p>
        </>
      ) : (
        <img src={ProfilBubble} alt="Avatar" className="avatar" />
      )}
    </section>
  );
}

export default Profil;