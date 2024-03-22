import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProfileBubble from "../../../public/assets/tip_icons/profile_bubble.svg";
import { AuthContext } from "../../context/AuthContext";

import "../../styles/components/Header/Profile.scss";

function Profile() {
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
          <p className="user_name">{user.userName}</p>
          <img
            src={`/assets/tip_icons/${profileInfo.picture_url}`}
            alt="Avatar"
            className="avatar"
          />
        </>
      ) : (
        <img src={ProfileBubble} alt="Avatar" className="avatar" />
      )}
    </section>
  );
}

export default Profile;
