import Title from "../components/Title";
import Naviguate from "../components/Navigate";

import bubbles from "../assets/logos/bubbles.svg";
import "../styles/pages/Home.scss";

function Home() {
  return (
    <>
      <Title />
      <div className="home-header">
        <h2 className="catch-phrase">
          Nettoyez votre maison de manière efficace et écologique !
        </h2>
        <img className="bubbles-logo" src={bubbles} alt="Bulles" />
      </div>
      <main>
        <Naviguate />
      </main>
    </>
  );
}

export default Home;
