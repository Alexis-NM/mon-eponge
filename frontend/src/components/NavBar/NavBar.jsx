import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "../../styles/components/NavBar/NavBar.scss";

function NavBar() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [accordionTitle, setAccordionTitle] = useState("Les Astuces");
  const [menuItems, setMenuItems] = useState([
    { label: "Accueil", to: "/" },
    { label: "Proposer une astuce", to: "/proposer-une-astuce" },
  ]);
  const [contentVisible, setContentVisible] = useState(true);

  useEffect(() => {
    if (user.isLoggedIn && user.isAdmin) {
      setMenuItems([
        { label: "Accueil", to: "/" },
        { label: "Les Astuces", to: "/astuces" },
        { label: "Proposer une astuce", to: "/proposer-une-astuce" },
        { label: "Admin", to: "/admin" },
      ]);
    } else if (user.isLoggedIn) {
      setMenuItems([
        { label: "Accueil", to: "/" },
        { label: "Proposer une astuce", to: "/proposer-une-astuce" },
        { label: "Les Astuces", to: "/astuces" },
      ]);
    } else {
      setMenuItems([
        { label: "Accueil", to: "/" },
        { label: "Proposer une astuce", to: "/connexion" },
      ]);
    }
  }, [user]);

  useEffect(() => {
    const currentPage = menuItems.find((item) => item.to === location.pathname);
    if (currentPage) {
      setAccordionTitle(currentPage.label);
    } else {
      setAccordionTitle("Les Astuces");
    }
  }, [location.pathname, menuItems]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleContentVisible = () => {
    setContentVisible(!contentVisible);
  };

  return (
    <nav className="accordion_container">
      <div className="accordion">
        <button
          type="button"
          className="accordion_title"
          onClick={toggleContentVisible}
        >
          {accordionTitle}
        </button>
      </div>
      <div
        className={`accordion_content ${contentVisible ? "show_content" : ""}`}
      >
        {menuItems
          .filter((menuItem) => menuItem.to !== location.pathname)
          .map((menuItem, index) => (
            <Link
              key={index}
              to={menuItem.to}
              className={`list_item_container ${
                isActive(menuItem.to) ? "active" : ""
              }`}
              onClick={toggleContentVisible}
            >
              <p>{menuItem.label}</p>
            </Link>
          ))}
      </div>
    </nav>
  );
}

export default NavBar;
