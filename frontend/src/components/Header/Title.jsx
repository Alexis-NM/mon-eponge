import { useContext } from "react";
import { Link } from "react-router-dom";
import sponge from "../../assets/logos/sponge.svg";
import "../../styles/components/Header/Title.scss";
import Profile from "./Profile";
import { AuthContext } from "../../context/AuthContext";

function Title() {
  const { user } = useContext(AuthContext);
  const { isLoggedIn } = user;

  const handleClick = () => {
    console.info("Redirection vers la page d'accueil");
  };

  return (
    <header
      className={`title-container ${
        isLoggedIn ? "logged-in" : "not-logged-in"
      }`}
    >
      <Link to="/" onClick={handleClick} className="main-title-link">
        <h1 className="main-title">Mon Éponge</h1>
      </Link>
      <img className="sponge-logo" src={sponge} alt="Logo d'éponge" />
      {isLoggedIn && <Profile />}
    </header>
  );
}

export default Title;
