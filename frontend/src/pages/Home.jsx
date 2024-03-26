import Title from "../components/Header/Title";
import Naviguate from "../components/Home/Navigate";
import bubbles from "../assets/logos/bubbles.svg";
import "../styles/pages/Home.scss";

function Home() {
  return (
    <>
      <Title />
      <section className="home-banner">
        <h2 className="catch-phrase">
          Nettoyez votre maison de manière efficace et écologique !
        </h2>
        <img className="bubbles-logo" src={bubbles} alt="Bulles" />
      </section>
      <main>
        <Naviguate />
      </main>
    </>
  );
}

export default Home;
