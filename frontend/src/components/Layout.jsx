// import { useState, useEffect } from "react";
// import {useContext} from "react";
// import { Outlet } from "react-router-dom";
// import NavBar from "../MainNavBars/NavBar";
// import { AuthContext } from "../../context/AuthContext";

// import "./Layout.scss";
// import UserLayout from "./UserLayout";

function Layout() {
  //   const [activePage, setActivePage] = useState("accueil");
  //   const [isPlayerMode, setIsPlayerMode] = useState(false);
  //   const [isAdminMode, setIsAdminMode] = useState(false);
  //   const { user, userMode, setUser } = useContext(AuthContext);

  //   const handleChangePage = (page) => {
  //     setActivePage(page);
  //   };

  //   useEffect(() => {
  //     if (user.is_administrator === 0) {
  //       setIsPlayerMode(true);
  //       setIsAdminMode(false);
  //     }
  //     if (user.is_administrator === 1) {
  //       setIsPlayerMode(false);
  //       setIsAdminMode(true);
  //     }
  //   }, [user, setUser]);
  //   const handleProfile = () => {
  //     switch (user.is_administrator) {
  //       case 3:
  //         return "Inscription";
  //       case 0:
  //         return "Profil";
  //       case 1:
  //         return "Tableau de bord";
  //       default:
  //         return "";
  //     }
  //   };
  //   const handleProfileLink = () => {
  //     switch (user.is_administrator) {
  //       case 3:
  //         return "/inscription";
  //       case 0:
  //         return "user/profil";
  //       case 1:
  //         return "/user/admin";
  //       default:
  //         return "";
  //     }
  //   };
  return (
    <div>
      {/* {isAdminMode || isPlayerMode ? ( */}
      <div>
        {/* <NavBar
            activePage={activePage}
            handleChangePage={handleChangePage}
            isPlayerMode={isPlayerMode}
            isAdminMode={isAdminMode}
            handleProfile={handleProfile}
            handleProfileLink={handleProfileLink}
          /> */}
        {/* <Outlet isPlayerMode={isPlayerMode} isAdminMode={isAdminMode} /> */}
      </div>
      {/* ) : ( */}
      <div>
        {/* <NavBar
            activePage={activePage}
            handleChangePage={handleChangePage}
            isPlayerMode={isPlayerMode}
            isAdminMode={isAdminMode}
            handleProfile={handleProfile}
            handleProfileLink={handleProfileLink}
          /> */}
        {/* <UserLayout isPlayerMode={isPlayerMode} isAdminMode={isAdminMode} /> */}
      </div>
      {/* )} */}
    </div>
  );
}

export default Layout;
