import Title from "./Title";

import "../styles/components/NavBar.scss";

function NavBar() {
  return (
    <nav>
      <Title />
      <ul className="nav-container">
        <li className="nav-box">Accueil</li>
        <li className="nav-box">Les Astuces</li>
        <li className="nav-box">Proposer une astuce</li>
      </ul>
    </nav>
  );
}
export default NavBar;
