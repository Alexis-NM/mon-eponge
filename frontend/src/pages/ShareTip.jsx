import NavBar from "../components/NavBar";

function ShareTip() {
  return (
    <>
      <NavBar />
      <h1>Proposer une astuce</h1>
      <form>
        <div>
          <label htmlFor="title">Titre</label> <input type="text" id="title" />
        </div>
        <div>
          <label htmlFor="description">Description</label>{" "}
          <textarea id="description" />
        </div>
        <button type="button">Envoyer</button>
      </form>
    </>
  );
}
export default ShareTip;
