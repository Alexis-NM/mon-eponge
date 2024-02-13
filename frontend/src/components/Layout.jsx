import { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import NavBar from "./NavBar";

function Layout() {
  const [activePage, setActivePage] = useState("accueil");
  const [isUserMode, setIsUserMode] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const handleChangePage = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    if (user.is_administrator === 0) {
      setIsUserMode(true);
      setIsAdminMode(false);
    }
    if (user.is_administrator === 1) {
      setIsUserMode(false);
      setIsAdminMode(true);
    }
  }, [user, setUser]);
  const handleProfile = () => {
    switch (user.is_administrator) {
      case 3:
        return "Inscription";
      case 0:
        return "Profil";
      case 1:
        return "Tableau de bord";
      default:
        return "";
    }
  };
  const handleProfileLink = () => {
    switch (user.is_administrator) {
      case 3:
        return "/inscription";
      case 0:
        return "user/profil";
      case 1:
        return "/user/admin";
      default:
        return "";
    }
  };
  return (
    <>
      <NavBar
        activePage={activePage}
        handleChangePage={handleChangePage}
        isPlayerMode={isUserMode}
        isAdminMode={isAdminMode}
        handleProfile={handleProfile}
        handleProfileLink={handleProfileLink}
      />
      <Outlet isUserMode={isUserMode} isAdminMode={isAdminMode} />
    </>
  );
}

export default Layout;
