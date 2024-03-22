import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProfileBubble from "../../../public/assets/tip_icons/profile_bubble.svg";
import { AuthContext } from "../../context/AuthContext";
import ConfirmationModal from "./ConfirmationModal";
import "../../styles/components/Header/Profile.scss";

function Profile() {
  const { user, handleLogout } = useContext(AuthContext);
  const [profileInfo, setProfileInfo] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
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

  const handleLogoutConfirmation = () => {
    handleLogout();
    setShowConfirmationModal(false);
  };

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
      {user.isLoggedIn && (
        <button onClick={() => setShowConfirmationModal(true)} type="button">
          Déconnexion
        </button>
      )}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleLogoutConfirmation}
      />
    </section>
  );
}

export default Profile;
