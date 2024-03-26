import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import ConfirmationModal from "../Modals/ConfirmationModal";
import onButton from "../../assets/icons/on_button.svg";
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

  if (!user.isLoggedIn) {
    return null;
  }

  return (
    <section className="profile-component">
      <article className="profile">
        <button onClick={() => setShowConfirmationModal(true)} type="button">
          <p className="user_name">{user.userName}</p>
          {profileInfo && (
            <>
              <img
                src={`/assets/tip_icons/${profileInfo.picture_url}`}
                alt="Avatar"
                className="avatar"
              />
              <img src={onButton} alt="on" className="on_button" />
            </>
          )}
        </button>
      </article>
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleLogoutConfirmation}
      />
    </section>
  );
}

export default Profile;
