import { createContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isLoggedIn: false,
    id: null,
    userName: "",
    pictureId: null,
    isAdmin: 0,
  });

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`
      );

      const userInfoData = response.data;

      setUser((prevUser) => ({
        ...prevUser,
        userName: userInfoData.user_name,
        pictureId: userInfoData.picture_id,
      }));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    if (user.isLoggedIn && user.id) {
      fetchUserInfo(user.id);
    }
  }, [user.isLoggedIn, user.id]);

  const handleAuth = async (token) => {
    if (!token) return;

    try {
      const decodedToken = jwtDecode(token);

      const { user_id } = decodedToken;

      // Récupération d'informations supplémentaires via une requête à l'API
      const userAdditionalInfo = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user_id}`
      );

      const { picture_id, is_admin, user_name } = userAdditionalInfo.data;

      setUser({
        isLoggedIn: true,
        id: user_id,
        isAdmin: is_admin,
        userName: user_name,
        pictureId: picture_id,
      });
    } catch (error) {
      console.error("Error handling authentication:", error);
    }
  };

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      id: null,
      userName: "",
      pictureId: null,
      isAdmin: 0,
    });
  };

  const contextValue = useMemo(
    () => ({ user, handleAuth, handleLogout }),
    [user, handleAuth, handleLogout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider, AuthContext };
